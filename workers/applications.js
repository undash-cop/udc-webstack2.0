// Cloudflare Worker for job applications
// Handles file uploads, validation, R2 storage, and email notifications

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers - Allow Netlify domains and localhost for development
    const origin = request.headers.get('Origin');
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://*.netlify.app',
      'https://*.netlify.com'
    ];
    
    const isAllowedOrigin = allowedOrigins.some(allowed => 
      origin && (origin === allowed || origin.match(allowed.replace('*', '.*')))
    );
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'https://*.netlify.app',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
      // Health check endpoint
      if (url.pathname === '/api/health') {
        return new Response(JSON.stringify({
          status: 'OK',
          timestamp: new Date().toISOString()
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Job application endpoint
      if (url.pathname === '/api/applications' && request.method === 'POST') {
        return await handleApplicationSubmission(request, env, corsHeaders);
      }

      // JSON-only endpoint for testing
      if (url.pathname === '/api/applications/json' && request.method === 'POST') {
        return await handleJsonApplication(request, env, corsHeaders);
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Internal server error'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

// Handle JSON-only application (for testing)
async function handleJsonApplication(request, env, corsHeaders) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.first_name || !data.last_name || !data.email || !data.phone) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Application data validated successfully (JSON endpoint - no file upload)',
      application_id: Date.now(),
      data: data
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid JSON data'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Handle full application with file upload
async function handleApplicationSubmission(request, env, corsHeaders) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const jobId = formData.get('job_id');
    const firstName = formData.get('first_name');
    const lastName = formData.get('last_name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const currentCompany = formData.get('current_company');
    const experience = formData.get('experience');
    const coverLetter = formData.get('cover_letter');
    const linkedin = formData.get('linkedin');
    const portfolio = formData.get('portfolio');
    const resume = formData.get('resume');

    // Validate required fields
    if (!jobId || !firstName || !lastName || !email || !phone || !experience || !resume) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate file
    const fileValidation = validateFile(resume);
    if (!fileValidation.valid) {
      return new Response(JSON.stringify({
        success: false,
        error: fileValidation.error
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Upload file to R2
    const uploadResult = await uploadToR2(resume, {
      original_name: resume.name,
      uploaded_by: email,
      job_id: jobId
    }, env);

    // Create application record
    const applicationRecord = {
      id: Date.now(),
      job_id: parseInt(jobId),
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      current_company: currentCompany,
      experience: experience,
      cover_letter: coverLetter,
      linkedin: linkedin,
      portfolio: portfolio,
      resume_path: uploadResult.key,
      resume_url: uploadResult.url,
      resume_name: resume.name,
      resume_size: resume.size,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Send emails (fire and forget)
    ctx.waitUntil(sendEmails(applicationRecord, env));

    return new Response(JSON.stringify({
      success: true,
      message: 'Application submitted successfully',
      application_id: applicationRecord.id
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Application submission error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to submit application'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// File validation
function validateFile(file) {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file || !file.name) {
    return { valid: false, error: 'No file provided' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 5MB.' };
  }

  return { valid: true };
}

// Upload file to R2
async function uploadToR2(file, metadata, env) {
  try {
    const timestamp = Date.now();
    const key = `resumes/${timestamp}-${file.name}`;
    
    // Upload to R2
    await env.R2_BUCKET.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type
      },
      customMetadata: metadata
    });

    // Generate public URL
    const url = `https://${env.R2_PUBLIC_URL}/${key}`;
    
    return { key, url };
  } catch (error) {
    console.error('R2 upload error:', error);
    throw new Error('Failed to upload file');
  }
}

// Send confirmation and HR notification emails
async function sendEmails(applicationData, env) {
  try {
    // Send confirmation email to applicant
    await sendConfirmationEmail(applicationData, env);
    
    // Send notification to HR
    await sendHRNotification(applicationData, env);
  } catch (error) {
    console.error('Email sending error:', error);
  }
}

// Send confirmation email to applicant
async function sendConfirmationEmail(applicationData, env) {
  const emailData = {
    to: applicationData.email,
    from: env.FROM_EMAIL,
    subject: 'Application Received - Thank You!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Application Received!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your interest in joining our team</p>
        </div>
        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="color: #333; line-height: 1.6;">Dear ${applicationData.first_name},</p>
          <p style="color: #333; line-height: 1.6;">We have successfully received your application for the position. We appreciate your interest in our company and the time you took to apply.</p>
          <p style="color: #333; line-height: 1.6;">Our HR team will review your application carefully. If your qualifications and experience align with our requirements, we will contact you for the next steps in the hiring process.</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://undash-cop.com/careers" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">View Careers Page</a>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; margin-bottom: 10px;">Best regards,</p>
            <p style="color: #2563eb; font-weight: bold; margin: 0;">HR Team</p>
          </div>
        </div>
      </div>
    `
  };

  await sendEmail(emailData, env);
}

// Send HR notification email
async function sendHRNotification(applicationData, env) {
  const emailData = {
    to: env.HR_EMAIL,
    from: env.FROM_EMAIL,
    subject: `New Application: ${applicationData.first_name} ${applicationData.last_name} - Job #${applicationData.job_id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #dc2626; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">New Job Application</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Action Required</p>
        </div>
        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
          <h2 style="color: #333; font-size: 20px; margin-top: 0;">Applicant Details:</h2>
          <ul style="list-style: none; padding: 0; color: #333;">
            <li style="margin-bottom: 10px;"><strong>Name:</strong> ${applicationData.first_name} ${applicationData.last_name}</li>
            <li style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${applicationData.email}" style="color: #2563eb;">${applicationData.email}</a></li>
            <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${applicationData.phone}</li>
            <li style="margin-bottom: 10px;"><strong>Job ID:</strong> ${applicationData.job_id}</li>
            <li style="margin-bottom: 10px;"><strong>Current Company:</strong> ${applicationData.current_company || 'N/A'}</li>
            <li style="margin-bottom: 10px;"><strong>Experience:</strong> ${applicationData.experience}</li>
            <li style="margin-bottom: 10px;"><strong>LinkedIn:</strong> ${applicationData.linkedin ? `<a href="${applicationData.linkedin}" style="color: #2563eb;">${applicationData.linkedin}</a>` : 'N/A'}</li>
            <li style="margin-bottom: 10px;"><strong>Portfolio:</strong> ${applicationData.portfolio ? `<a href="${applicationData.portfolio}" style="color: #2563eb;">${applicationData.portfolio}</a>` : 'N/A'}</li>
            <li style="margin-bottom: 10px;"><strong>Resume:</strong> <a href="${applicationData.resume_url}" style="color: #2563eb;">Download Resume</a></li>
          </ul>
          <h2 style="color: #333; font-size: 20px; margin-top: 20px;">Cover Letter:</h2>
          <p style="color: #333; line-height: 1.6; border: 1px solid #e5e7eb; padding: 15px; border-radius: 5px; background-color: #f9fafb;">
            ${applicationData.cover_letter || 'No cover letter provided.'}
          </p>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #666; margin: 0;">Application received on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    `
  };

  await sendEmail(emailData, env);
}

// Generic email sending function using Cloudflare Email Workers or SendGrid
async function sendEmail(emailData, env) {
  // Option 1: Using SendGrid (if you want to keep using SendGrid)
  if (env.SENDGRID_API_KEY) {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: emailData.to }],
        }],
        from: { email: emailData.from },
        subject: emailData.subject,
        content: [{
          type: 'text/html',
          value: emailData.html
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`SendGrid error: ${response.status}`);
    }
  } 
  // Option 2: Using Cloudflare Email Workers (recommended for simplicity)
  else if (env.EMAIL_WORKER_URL) {
    const response = await fetch(env.EMAIL_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`Email Worker error: ${response.status}`);
    }
  }
  // Option 3: Using Cloudflare Email Routing (if configured)
  else {
    console.log('Email would be sent:', emailData);
    // In a real implementation, you might use Cloudflare Email Routing
    // or another email service here
  }
}
