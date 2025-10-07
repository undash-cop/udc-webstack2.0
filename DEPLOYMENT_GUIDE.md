# 🚀 Deployment Guide: Netlify Frontend + Cloudflare Workers Backend

This guide will help you deploy your job application system with:
- **Frontend**: Deployed on Netlify
- **Backend**: Cloudflare Workers
- **Storage**: Cloudflare R2

## 📋 Prerequisites

1. **Netlify Account** - For frontend hosting
2. **Cloudflare Account** - For Workers and R2
3. **SendGrid Account** - For email notifications
4. **GitHub Repository** - For code hosting

## 🔧 Step 1: Deploy Cloudflare Worker (Backend)

### 1.1 Install Wrangler CLI
```bash
npm install -g wrangler
```

### 1.2 Login to Cloudflare
```bash
wrangler login
```

### 1.3 Set up R2 Storage
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage**
3. Create bucket named `resumes`
4. Create API token with R2 permissions
5. Note your Account ID

### 1.4 Configure Worker Secrets
```bash
cd workers
wrangler secret put R2_ACCOUNT_ID
wrangler secret put R2_ACCESS_KEY_ID
wrangler secret put R2_SECRET_ACCESS_KEY
wrangler secret put R2_PUBLIC_URL
wrangler secret put SENDGRID_API_KEY
```

### 1.5 Deploy Worker
```bash
# Deploy the worker
npm run worker:deploy
```

### 1.6 Note Your Worker URL
After deployment, you'll get a URL like:
```
https://udc-applications-worker.your-subdomain.workers.dev
```

**Save this URL** - you'll need it for the frontend configuration.

## 🌐 Step 2: Deploy Frontend to Netlify

### 2.1 Push Code to GitHub
```bash
git add .
git commit -m "Add Cloudflare Workers backend and Netlify configuration"
git push origin main
```

### 2.2 Connect to Netlify
1. Go to [Netlify](https://netlify.com/)
2. Click **New site from Git**
3. Connect your GitHub repository
4. Build settings will be auto-detected from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 2.3 Update Frontend Configuration
1. After deploying the Cloudflare Worker, update `src/config/api.ts`:
   ```typescript
   // Replace with your actual worker URL
   return 'https://udc-applications-worker.your-subdomain.workers.dev/api';
   ```

2. Commit and push the changes:
   ```bash
   git add src/config/api.ts
   git commit -m "Update API URL to production worker"
   git push origin main
   ```

3. Netlify will automatically rebuild and redeploy

## 🔗 Step 3: Configure CORS (Important!)

### 3.1 Update Worker CORS
Edit `workers/applications.js` and update the CORS origins:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-netlify-site.netlify.app',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

### 3.2 Redeploy Worker
```bash
cd workers
wrangler deploy
```

## 🧪 Step 4: Testing

### 4.1 Test Worker Directly
```bash
# Test health endpoint
curl https://your-worker.workers.dev/api/health

# Test from your local machine
curl -X POST https://your-worker.workers.dev/api/applications/json \
  -H "Content-Type: application/json" \
  -d '{"job_id":1,"first_name":"Test","last_name":"User","email":"test@example.com","phone":"1234567890","experience":"5 years"}'
```

### 4.2 Test Full Application
1. Go to your Netlify site
2. Navigate to `/careers`
3. Click **Apply Now** on any job
4. Fill out the form and submit
5. Check:
   - Email confirmation sent
   - HR notification sent
   - File uploaded to R2

## 🔧 Step 5: Environment Variables

### 5.1 Netlify Environment Variables
In Netlify dashboard, go to **Site settings** → **Environment variables** and add:

```bash
# Optional: If you want to use environment variables in frontend
VITE_API_URL=https://your-worker.workers.dev/api
```

### 5.2 Cloudflare Worker Secrets
Already configured in Step 1.4

## 📊 Step 6: Monitoring

### 6.1 Netlify Analytics
- Go to Netlify dashboard
- View site analytics
- Monitor build logs

### 6.2 Cloudflare Worker Analytics
- Go to Cloudflare dashboard
- Navigate to Workers & Pages
- Select your worker
- View analytics and logs

### 6.3 Worker Logs
```bash
# Real-time logs
npm run worker:tail

# Or use Wrangler directly
wrangler tail
```

## 🔒 Step 7: Security Configuration

### 7.1 Netlify Security Headers
Already configured in `netlify.toml`:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy

### 7.2 Cloudflare Security
- DDoS protection (automatic)
- WAF (Web Application Firewall)
- SSL/TLS (automatic)

## 🚀 Step 8: Custom Domain (Optional)

### 8.1 Netlify Custom Domain
1. Go to Netlify dashboard
2. **Domain settings** → **Add custom domain**
3. Configure DNS records
4. Enable SSL

### 8.2 Cloudflare Worker Custom Domain
1. Go to Cloudflare dashboard
2. **Workers & Pages** → Your worker
3. **Custom domains** → **Add custom domain**
4. Configure DNS

## 📈 Step 9: Performance Optimization

### 9.1 Frontend Optimization
- Netlify automatically handles:
  - CDN distribution
  - Image optimization
  - Gzip compression
  - Browser caching

### 9.2 Backend Optimization
- Cloudflare Workers automatically handle:
  - Global edge deployment
  - Automatic scaling
  - Zero cold starts (after warmup)

## 🔍 Troubleshooting

### Common Issues:

#### 1. **CORS Errors**
- Check worker CORS configuration
- Verify Netlify domain is in allowed origins
- Check browser console for specific errors

#### 2. **Worker Not Responding**
- Check worker logs: `wrangler tail`
- Verify secrets are set correctly
- Check Cloudflare dashboard for errors

#### 3. **File Upload Fails**
- Verify R2 bucket exists and is named `resumes`
- Check R2 API credentials
- Verify file size limits (5MB max)

#### 4. **Emails Not Sending**
- Check SendGrid API key
- Verify sender email is verified
- Check worker logs for email errors

#### 5. **Netlify Build Fails**
- Check build logs in Netlify dashboard
- Verify Node.js version (18)
- Check for TypeScript errors

## 📋 Deployment Checklist

- [ ] Cloudflare Worker deployed and accessible
- [ ] R2 bucket created and configured
- [ ] Worker secrets set correctly
- [ ] Frontend API URL updated to production worker
- [ ] Netlify site deployed successfully
- [ ] CORS configured for Netlify domain
- [ ] Health check endpoint working
- [ ] Job application form working
- [ ] File upload working
- [ ] Email notifications working
- [ ] Custom domain configured (optional)

## 🎯 Final Architecture

```
User → Netlify (Frontend) → Cloudflare Worker (Backend) → R2 Storage
                                    ↓
                            SendGrid Email API
```

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Check Cloudflare Worker logs: `wrangler tail`
3. Verify all environment variables/secrets
4. Test worker endpoints directly
5. Check browser console for CORS errors

---

**Deployment complete! 🎉**

Your job application system is now running on:
- **Frontend**: Netlify (global CDN)
- **Backend**: Cloudflare Workers (serverless)
- **Storage**: Cloudflare R2 (object storage)
- **Email**: SendGrid (email service)
