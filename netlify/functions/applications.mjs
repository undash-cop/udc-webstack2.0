import express from 'express';
import formidable from 'formidable';
import { z } from 'zod';
import fs from 'fs';
import cors from 'cors';

// Suppress deprecation warnings
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('util._extend')) {
    // Suppress this specific deprecation warning
    return;
  }
  console.warn(warning);
});

// Increase max listeners to prevent memory leak warnings
process.setMaxListeners(100);

// Set default max listeners for all EventEmitters
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 100;

// Import our modules
import { uploadFileToR2, validateFileType, validateFileSize } from '../../src/utils/fileUpload.cjs';
import { sendConfirmationEmail, sendHRNotification } from '../../src/services/emailService.cjs';
import { validateEnvironment } from '../../src/config/environment.cjs';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Validation schema
const applicationSchema = z.object({
  jobId: z.string().transform(Number),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  currentCompany: z.string().max(100).optional(),
  experience: z.string().min(1),
  coverLetter: z.string().max(2000).optional(),
  linkedin: z.string().url().optional(),
  portfolio: z.string().url().optional()
});

// API Routes
app.post('/api/applications', async (req, res) => {
  let files = null;
  
  try {
    // Validate environment variables
    validateEnvironment();

    // Parse form data with file upload
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      maxFields: 20, // Limit number of fields
      maxFieldsSize: 2 * 1024 * 1024, // 2MB for fields
      filter: ({ mimetype }) => validateFileType(mimetype || ''),
      keepExtensions: true,
      uploadDir: '/tmp/uploads', // Use Netlify's temp directory
      createDirsFromUploads: true,
      allowEmptyFiles: false,
      minFileSize: 1
    });

    // Increase max listeners for this specific form instance
    form.setMaxListeners(100);

    // Increase max listeners for the request object
    req.setMaxListeners(100);

    const [fields, parsedFiles] = await form.parse(req);
    files = parsedFiles;
    
    // Validate form data
    const validatedData = applicationSchema.parse({
      jobId: fields.jobId?.[0],
      firstName: fields.firstName?.[0],
      lastName: fields.lastName?.[0],
      email: fields.email?.[0],
      phone: fields.phone?.[0],
      currentCompany: fields.currentCompany?.[0],
      experience: fields.experience?.[0],
      coverLetter: fields.coverLetter?.[0],
      linkedin: fields.linkedin?.[0],
      portfolio: fields.portfolio?.[0]
    });

    // Handle file upload
    const resumeFile = parsedFiles.resume?.[0];
    if (!resumeFile) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // Validate file
    if (!validateFileType(resumeFile.mimetype || '')) {
      return res.status(400).json({ error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' });
    }

    if (!validateFileSize(resumeFile.size || 0)) {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }

    // Read file buffer
    const fileBuffer = await fs.promises.readFile(resumeFile.filepath);

    // Upload file to R2
    const uploadResult = await uploadFileToR2(
      fileBuffer,
      resumeFile.originalFilename || 'resume',
      resumeFile.mimetype || 'application/octet-stream',
      {
        originalName: resumeFile.originalFilename || 'resume',
        uploadedBy: validatedData.email,
        jobId: validatedData.jobId.toString()
      }
    );

    // Create application record
    const application = {
      id: Date.now().toString(),
      jobId: validatedData.jobId,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      currentCompany: validatedData.currentCompany,
      experience: validatedData.experience,
      coverLetter: validatedData.coverLetter,
      linkedin: validatedData.linkedin,
      portfolio: validatedData.portfolio,
      resumePath: uploadResult.key,
      resumeName: resumeFile.originalFilename || 'resume',
      resumeSize: resumeFile.size,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Send emails in parallel
    await Promise.all([
      sendConfirmationEmail(application),
      sendHRNotification(application)
    ]);

    // Clean up temporary file
    try {
      await fs.promises.unlink(resumeFile.filepath);
    } catch (cleanupError) {
      console.warn('Failed to clean up temporary file:', cleanupError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id
    });

  } catch (error) {
    console.error('Application submission error:', error);
    
    // Clean up any temporary files on error
    if (files && files.resume && files.resume[0]) {
      try {
        await fs.promises.unlink(files.resume[0].filepath);
      } catch (cleanupError) {
        console.warn('Failed to clean up file on error:', cleanupError.message);
      }
    }
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.issues 
      });
    }
    
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Netlify function handler
export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: ''
    };
  }

  // Convert Netlify event to Express request
  const req = {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers,
    body: event.body,
    query: event.queryStringParameters || {}
  };

  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    status: (code) => {
      res.statusCode = code;
      return res;
    },
    json: (data) => {
      res.body = JSON.stringify(data);
      res.headers['Content-Type'] = 'application/json';
      return res;
    }
  };

  // Route the request
  if (req.url === '/api/applications' && req.method === 'POST') {
    // Handle form submission
    try {
      // Parse multipart form data
      const form = formidable({
        maxFileSize: 5 * 1024 * 1024, // 5MB
        filter: ({ mimetype }) => validateFileType(mimetype || '')
      });

      const [fields, files] = await form.parse({
        ...req,
        body: event.body
      });
      
      // Validate form data
      const validatedData = applicationSchema.parse({
        jobId: fields.jobId?.[0],
        firstName: fields.firstName?.[0],
        lastName: fields.lastName?.[0],
        email: fields.email?.[0],
        phone: fields.phone?.[0],
        currentCompany: fields.currentCompany?.[0],
        experience: fields.experience?.[0],
        coverLetter: fields.coverLetter?.[0],
        linkedin: fields.linkedin?.[0],
        portfolio: fields.portfolio?.[0]
      });

      // Handle file upload
      const resumeFile = files.resume?.[0];
      if (!resumeFile) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error: 'Resume file is required' })
        };
      }

      // Validate file
      if (!validateFileType(resumeFile.mimetype || '')) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' })
        };
      }

      if (!validateFileSize(resumeFile.size || 0)) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error: 'File too large. Maximum size is 5MB.' })
        };
      }

      // Read file buffer
      const fileBuffer = await fs.promises.readFile(resumeFile.filepath);

      // Upload file to R2
      const uploadResult = await uploadFileToR2(
        fileBuffer,
        resumeFile.originalFilename || 'resume',
        resumeFile.mimetype || 'application/octet-stream',
        {
          originalName: resumeFile.originalFilename || 'resume',
          uploadedBy: validatedData.email,
          jobId: validatedData.jobId.toString()
        }
      );

      // Create application record
      const application = {
        id: Date.now().toString(),
        jobId: validatedData.jobId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        currentCompany: validatedData.currentCompany,
        experience: validatedData.experience,
        coverLetter: validatedData.coverLetter,
        linkedin: validatedData.linkedin,
        portfolio: validatedData.portfolio,
        resumePath: uploadResult.key,
        resumeName: resumeFile.originalFilename || 'resume',
        resumeSize: resumeFile.size,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Send emails in parallel
      await Promise.all([
        sendConfirmationEmail(application),
        sendHRNotification(application)
      ]);

      // Clean up temporary file
      await fs.promises.unlink(resumeFile.filepath);

      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          message: 'Application submitted successfully',
          applicationId: application.id
        })
      };

    } catch (error) {
      console.error('Application submission error:', error);
      
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            error: 'Validation failed',
            details: error.issues 
          })
        };
      }
      
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Failed to submit application' })
      };
    }
  }

  // Health check
  if (req.url === '/api/health' && req.method === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        status: 'OK', 
        timestamp: new Date().toISOString() 
      })
    };
  }

  // 404 for other routes
  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ error: 'Not found' })
  };
};
