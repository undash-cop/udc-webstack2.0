const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Environment configuration
const config = {
  r2: {
    accountId: process.env.R2_ACCOUNT_ID || '',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucketName: process.env.R2_BUCKET_NAME || 'resumes'
  }
};

// Configure S3 client for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
});

async function uploadFileToR2(file, fileName, contentType, metadata = {}) {
  const key = `resumes/${Date.now()}-${fileName}`;
  
  const command = new PutObjectCommand({
    Bucket: config.r2.bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: metadata
  });

  await s3Client.send(command);

  return {
    key,
    url: `https://${config.r2.bucketName}.${config.r2.accountId}.r2.cloudflarestorage.com/${key}`,
    size: file.length,
    contentType
  };
}

async function getSignedDownloadUrl(key, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: config.r2.bucketName,
    Key: key
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

function validateFileType(mimetype) {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  return allowedTypes.includes(mimetype);
}

function validateFileSize(size, maxSizeMB = 5) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return size <= maxSizeBytes;
}

module.exports = {
  uploadFileToR2,
  getSignedDownloadUrl,
  validateFileType,
  validateFileSize
};
