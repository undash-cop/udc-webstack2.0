# 🚀 Cloudflare Workers Setup Guide

This guide will help you set up the complete job application system with Cloudflare Workers and R2 storage.

## 📋 Prerequisites

1. **Cloudflare Account** - For Workers and R2 storage
2. **SendGrid Account** - For email notifications
3. **Node.js 18+** - For development

## 🔧 Step 1: Cloudflare R2 Setup

### 1.1 Create R2 Bucket
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage**
3. Click **Create bucket**
4. Name: `resumes` (or your preferred name)
5. Click **Create bucket**

### 1.2 Generate API Token
1. Go to **Manage R2 API tokens**
2. Click **Create API token**
3. Name: `Job Applications`
4. Permissions: **Object Read & Write**
5. Bucket: Select your bucket
6. Click **Create API token**
7. **Save the credentials** - you'll need them later

### 1.3 Get Account ID
1. In R2 dashboard, find your **Account ID**
2. Copy this value

## 📧 Step 2: SendGrid Setup

### 2.1 Create SendGrid Account
1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up for a free account
3. Verify your email address
4. Complete account setup

### 2.2 Create API Key
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name: `Job Applications`
4. Permissions: **Full Access** (or **Mail Send** only for security)
5. Click **Create & View**
6. **Copy the API key** - you'll only see it once!

### 2.3 Verify Sender Identity
1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in your details:
   - **From Name**: Your Company Name
   - **From Email**: noreply@yourcompany.com
   - **Reply To**: support@yourcompany.com
4. Click **Create**
5. **Check your email** and click the verification link

## 🛠️ Step 3: Local Development Setup

### 3.1 Install Dependencies
```bash
# Install project dependencies
npm install

# Install worker dependencies
npm run install:worker

# Install Wrangler CLI globally
npm install -g wrangler
```

### 3.2 Configure Worker
1. Edit `wrangler.toml`:
   ```toml
   name = "udc-applications-worker"
   main = "workers/applications.js"
   
   [vars]
   FROM_EMAIL = "noreply@yourcompany.com"
   FROM_NAME = "Your Company"
   HR_EMAIL = "hr@yourcompany.com"
   
   [[r2_buckets]]
   binding = "R2_BUCKET"
   bucket_name = "resumes"
   ```

### 3.3 Set Worker Secrets
```bash
# Login to Cloudflare
wrangler login

# Set secrets
cd workers
wrangler secret put R2_ACCOUNT_ID
wrangler secret put R2_ACCESS_KEY_ID
wrangler secret put R2_SECRET_ACCESS_KEY
wrangler secret put R2_PUBLIC_URL
wrangler secret put SENDGRID_API_KEY
```

## 🚀 Step 4: Development & Testing

### 4.1 Start Development
```bash
# Start both frontend and worker
npm run dev:full
```

This will start:
- Frontend on `http://localhost:5173`
- Worker on `http://localhost:8787`

### 4.2 Test Worker
```bash
# Test worker functionality
npm run worker:test
```

### 4.3 Test Full Application
1. Go to `http://localhost:5173/careers`
2. Click **Apply Now** on any job
3. Fill out the form and submit
4. Check your email for confirmation

## 🌐 Step 5: Production Deployment

### 5.1 Deploy Worker
```bash
# Deploy to Cloudflare Workers
npm run worker:deploy
```

### 5.2 Update Frontend Configuration
Edit `src/config/api.ts` and update the production URL:
```typescript
// Replace with your actual worker URL
return 'https://udc-applications-worker.your-subdomain.workers.dev/api';
```

### 5.3 Deploy Frontend
Deploy your frontend to your preferred hosting service (Vercel, Netlify, etc.):
```bash
npm run build
# Deploy the dist/ folder
```

## 🧪 Step 6: Verification

### 6.1 Health Check
```bash
curl https://your-worker.workers.dev/api/health
```

### 6.2 Test Application Submission
1. Go to your deployed frontend
2. Navigate to `/careers`
3. Submit a job application
4. Verify:
   - Email confirmation sent
   - HR notification sent
   - File uploaded to R2

## 🔍 Troubleshooting

### Common Issues:

#### 1. **Worker Won't Start**
```bash
# Check if wrangler is installed
wrangler --version

# Reinstall if needed
npm install -g wrangler

# Check worker logs
npm run worker:tail
```

#### 2. **R2 Upload Fails**
- Verify R2 bucket exists and is named `resumes`
- Check API token has R2 permissions
- Verify secrets are set correctly:
  ```bash
  wrangler secret list
  ```

#### 3. **Emails Not Sending**
- Check SendGrid API key is set
- Verify FROM_EMAIL and HR_EMAIL in wrangler.toml
- Check worker logs: `npm run worker:tail`

#### 4. **Frontend Can't Connect**
- Verify worker is running: `npm run worker:dev`
- Check API URL in `src/config/api.ts`
- Check browser console for CORS errors

#### 5. **CORS Issues**
- Ensure worker includes proper CORS headers
- Check vite.config.ts for allowed origins

## 📊 Monitoring

### 1. **Worker Logs**
```bash
# Real-time logs
npm run worker:tail

# Or use Wrangler directly
wrangler tail
```

### 2. **Cloudflare Analytics**
- Go to Cloudflare Dashboard → Workers & Pages
- Select your worker
- View analytics and logs

### 3. **R2 Storage**
- Monitor storage usage in R2 dashboard
- Set up alerts for storage limits

## 🔒 Security Considerations

### 1. **Environment Variables**
- Never commit secrets to git
- Use `wrangler secret put` for sensitive data
- Rotate credentials regularly

### 2. **File Uploads**
- File type validation (PDF, DOC, DOCX only)
- File size limits (5MB max)
- Virus scanning (optional)

### 3. **Rate Limiting**
- Cloudflare Workers have built-in rate limiting
- Monitor for abuse in Cloudflare dashboard

## 📈 Performance Optimization

### 1. **Worker Optimization**
- Minimize bundle size
- Use efficient algorithms
- Cache frequently accessed data

### 2. **R2 Optimization**
- Use appropriate file compression
- Set proper cache headers
- Implement cleanup for old files

### 3. **Email Templates**
- Optimize HTML templates
- Use inline CSS
- Test across email clients

## 🎯 Next Steps

1. **Add Database Integration**
   - Store applications in Cloudflare D1
   - Add admin dashboard
   - Implement search and filtering

2. **Enhance Security**
   - Add authentication
   - Implement rate limiting
   - Add input sanitization

3. **Add Analytics**
   - Track form submissions
   - Monitor conversion rates
   - Add user behavior tracking

4. **Implement Notifications**
   - Slack notifications
   - SMS alerts
   - Webhook integrations

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review worker logs: `npm run worker:tail`
3. Check Cloudflare dashboard
4. Verify all secrets are set correctly

---

**Happy coding! 🚀**