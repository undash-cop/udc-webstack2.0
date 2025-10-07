# Cloudflare Workers Deployment Guide

This guide will help you migrate from the Python backend to Cloudflare Workers for a lighter, more scalable deployment.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install the Cloudflare Workers CLI
   ```bash
   npm install -g wrangler
   ```
3. **R2 Storage**: Set up Cloudflare R2 for file storage

## Setup Steps

### 1. Install Dependencies

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Install worker dependencies
cd workers
npm install
```

### 2. Configure Cloudflare R2

1. Go to Cloudflare Dashboard → R2 Object Storage
2. Create a new bucket called `resumes`
3. Note your Account ID from the R2 dashboard
4. Create an API token with R2 permissions

### 3. Set Environment Variables

```bash
# Login to Cloudflare
wrangler login

# Set secrets (you'll be prompted for values)
wrangler secret put R2_ACCOUNT_ID
wrangler secret put R2_ACCESS_KEY_ID
wrangler secret put R2_SECRET_ACCESS_KEY
wrangler secret put R2_PUBLIC_URL

# Optional: Set SendGrid API key if using SendGrid
wrangler secret put SENDGRID_API_KEY

# Optional: Set custom email worker URL
wrangler secret put EMAIL_WORKER_URL
```

### 4. Update Configuration

Edit `wrangler.toml` and update:
- `bucket_name` to match your R2 bucket
- `FROM_EMAIL` and `HR_EMAIL` to your actual email addresses
- Routes if you want to use a custom domain

### 5. Deploy the Worker

```bash
# Deploy to production
wrangler deploy

# Or run locally for development
wrangler dev
```

### 6. Update Frontend Configuration

Update `src/config/api.ts` with your actual worker URL:
```typescript
// Replace with your actual worker URL
return 'https://udc-applications-worker.your-subdomain.workers.dev/api';
```

## Benefits of Cloudflare Workers

✅ **Zero Server Management**: No servers to maintain or scale  
✅ **Global Edge Deployment**: Faster response times worldwide  
✅ **Pay-per-request**: Only pay for what you use  
✅ **Automatic Scaling**: Handles traffic spikes automatically  
✅ **Built-in Security**: DDoS protection, WAF, etc.  
✅ **Simple Deployment**: `wrangler deploy` and you're live  

## Migration Checklist

- [ ] Set up Cloudflare R2 bucket
- [ ] Configure environment variables
- [ ] Deploy the worker
- [ ] Update frontend API configuration
- [ ] Test file uploads and email notifications
- [ ] Update production URLs
- [ ] Remove Python backend files

## Testing

1. **Health Check**: `GET /api/health`
2. **JSON Application**: `POST /api/applications/json`
3. **Full Application**: `POST /api/applications` (with file upload)

## Troubleshooting

- Check worker logs: `wrangler tail`
- Verify R2 bucket permissions
- Ensure all secrets are set correctly
- Check CORS configuration if needed

## Cost Comparison

| Service | Python Backend | Cloudflare Workers |
|---------|---------------|-------------------|
| Server | $5-20/month | $0 (free tier) |
| Storage | R2: $0.015/GB | R2: $0.015/GB |
| Requests | N/A | $0.50/million |
| Bandwidth | Included | $0.09/GB |

**Estimated monthly cost for typical usage: $0-5 vs $20-50**
