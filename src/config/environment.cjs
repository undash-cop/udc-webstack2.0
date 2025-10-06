// Environment configuration
const config = {
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || '',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucketName: process.env.R2_BUCKET_NAME || 'resumes'
  },
  email: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.FROM_EMAIL || 'noreply@yourcompany.com',
    fromName: process.env.FROM_NAME || 'Your Company',
    hrEmail: process.env.HR_EMAIL || 'hr@yourcompany.com'
  },
  app: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET || 'fallback-secret',
    nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000'
  }
};

// Validation function
function validateEnvironment() {
  const required = [
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID', 
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'SENDGRID_API_KEY',
    'FROM_EMAIL'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = {
  config,
  validateEnvironment
};
