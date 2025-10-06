const express = require('express');
const formidable = require('formidable');
const { z } = require('zod');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Increase max listeners to prevent memory leak warnings
process.setMaxListeners(100);

// Set default max listeners for all EventEmitters
require('events').EventEmitter.defaultMaxListeners = 100;

// Import our modules (we'll need to convert them to CommonJS)
const { uploadFileToR2, validateFileType, validateFileSize } = require('./src/utils/fileUpload.cjs');
const { sendConfirmationEmail, sendHRNotification } = require('./src/services/emailService.cjs');
const { validateEnvironment } = require('./src/config/environment.cjs');

const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Set request timeout
app.use((req, res, next) => {
  req.setTimeout(30000); // 30 seconds
  res.setTimeout(30000); // 30 seconds
  next();
});

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
      uploadDir: './uploads', // Use specific upload directory
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

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;
