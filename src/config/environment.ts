// Environment configuration
export const config = {
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || '',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucketName: process.env.R2_BUCKET_NAME || 'resumes'
  },
  email: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    hrEmail: process.env.HR_EMAIL || process.env.EMAIL_USER || ''
  },
  app: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET || 'fallback-secret',
    nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000'
  }
};

// Validation function
export function validateEnvironment() {
  const required = [
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID', 
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
