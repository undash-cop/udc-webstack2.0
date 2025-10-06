import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from '../config/environment';

// Configure S3 client for Cloudflare R2
export const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
});

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  contentType: string;
}

export async function uploadFileToR2(
  file: Buffer,
  fileName: string,
  contentType: string,
  metadata?: Record<string, string>
): Promise<UploadResult> {
  const key = `resumes/${Date.now()}-${fileName}`;
  
  const command = new PutObjectCommand({
    Bucket: config.r2.bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: metadata || {}
  });

  await s3Client.send(command);

  return {
    key,
    url: `https://${config.r2.bucketName}.${config.r2.accountId}.r2.cloudflarestorage.com/${key}`,
    size: file.length,
    contentType
  };
}

export async function getSignedDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: config.r2.bucketName,
    Key: key
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

export function validateFileType(mimetype: string): boolean {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  return allowedTypes.includes(mimetype);
}

export function validateFileSize(size: number, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return size <= maxSizeBytes;
}
