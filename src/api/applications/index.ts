// Note: This is a Vite/React project, not Next.js
// We'll create a simple Express-like handler instead
import formidable from 'formidable';
import { z } from 'zod';
import fs from 'fs';
import { uploadFileToR2, validateFileType, validateFileSize } from '../../utils/fileUpload';
import { sendConfirmationEmail, sendHRNotification } from '../../services/emailService';
import { validateEnvironment } from '../../config/environment';

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

// Simple API handler for Vite/React project
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate environment variables
    validateEnvironment();

    // Parse form data with file upload
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: ({ mimetype }) => validateFileType(mimetype || '')
    });

    const [fields, files] = await form.parse(req);
    
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
    await fs.promises.unlink(resumeFile.filepath);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id
    });

  } catch (error) {
    console.error('Application submission error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.issues 
      });
    }
    
    res.status(500).json({ error: 'Failed to submit application' });
  }
}

