import nodemailer from 'nodemailer';
import { config } from '../config/environment';

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

export interface ApplicationData {
  id: string;
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentCompany?: string;
  experience: string;
  coverLetter?: string;
  linkedin?: string;
  portfolio?: string;
  resumeName: string;
  resumeSize: number;
  createdAt: string;
}

export async function sendConfirmationEmail(application: ApplicationData): Promise<void> {
  try {
    await transporter.sendMail({
      from: config.email.user,
      to: application.email,
      subject: 'Application Received - Thank You!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Application Received!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your interest in joining our team</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Dear <strong>${application.firstName}</strong>,
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              We have successfully received your application and are excited to learn more about your background and experience. Our HR team will review your application carefully and get back to you within <strong>5-7 business days</strong>.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #2563eb; margin-top: 0;">Application Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${application.firstName} ${application.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${application.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${application.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Experience:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${application.experience}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Resume:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${application.resumeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;"><strong>Application ID:</strong></td>
                  <td style="padding: 8px 0; color: #333; font-family: monospace;">${application.id}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              If you have any questions or need to update your application, please don't hesitate to contact us.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; margin-bottom: 10px;">Best regards,</p>
              <p style="color: #2563eb; font-weight: bold; margin: 0;">HR Team</p>
            </div>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('Confirmation email sending failed:', error);
    throw new Error('Failed to send confirmation email');
  }
}

export async function sendHRNotification(application: ApplicationData): Promise<void> {
  try {
    await transporter.sendMail({
      from: config.email.user,
      to: config.email.hrEmail,
      subject: `New Application: ${application.firstName} ${application.lastName} - Job #${application.jobId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #dc2626; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Job Application</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Action Required</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; margin-top: 0;">Candidate Information</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
              <div>
                <h3 style="color: #2563eb; margin-bottom: 10px;">Personal Details</h3>
                <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${application.firstName} ${application.lastName}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${application.email}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Phone:</strong> ${application.phone}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Current Company:</strong> ${application.currentCompany || 'Not provided'}</p>
              </div>
              
              <div>
                <h3 style="color: #2563eb; margin-bottom: 10px;">Application Details</h3>
                <p style="margin: 5px 0; color: #666;"><strong>Job ID:</strong> ${application.jobId}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Experience:</strong> ${application.experience}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Resume:</strong> ${application.resumeName}</p>
                <p style="margin: 5px 0; color: #666;"><strong>File Size:</strong> ${(application.resumeSize / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            
            ${application.coverLetter ? `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #2563eb; margin-top: 0;">Cover Letter</h3>
              <p style="color: #333; line-height: 1.6; white-space: pre-wrap; margin: 0;">${application.coverLetter}</p>
            </div>
            ` : ''}
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #2563eb; margin-top: 0;">Links & Portfolio</h3>
              <p style="margin: 5px 0; color: #666;"><strong>LinkedIn:</strong> ${application.linkedin ? `<a href="${application.linkedin}" style="color: #2563eb;">${application.linkedin}</a>` : 'Not provided'}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Portfolio:</strong> ${application.portfolio ? `<a href="${application.portfolio}" style="color: #2563eb;">${application.portfolio}</a>` : 'Not provided'}</p>
            </div>
            
            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; border-left: 4px solid #0288d1; margin: 25px 0;">
              <p style="margin: 0; color: #01579b; font-weight: bold;">Next Steps:</p>
              <ul style="margin: 10px 0 0 0; color: #01579b;">
                <li>Review the candidate's resume and cover letter</li>
                <li>Check their LinkedIn profile and portfolio</li>
                <li>Schedule an interview if qualified</li>
                <li>Update application status in the system</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #666; margin: 0;">Application received on ${new Date(application.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error('HR notification email sending failed:', error);
    throw new Error('Failed to send HR notification email');
  }
}
