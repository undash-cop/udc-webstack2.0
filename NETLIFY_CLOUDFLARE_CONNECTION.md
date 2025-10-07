# 🔗 How to Connect Netlify UI to Cloudflare Worker

This guide shows you exactly how to connect your Netlify frontend to your Cloudflare Worker backend.

## 📋 Prerequisites

- ✅ Netlify account
- ✅ Cloudflare account
- ✅ GitHub repository with your code
- ✅ SendGrid account (for emails)

## 🚀 Step 1: Deploy Cloudflare Worker (Backend)

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
3. Click **Create bucket**
4. Name: `resumes`
5. Click **Create bucket**

### 1.4 Create R2 API Token
1. Go to **Manage R2 API tokens**
2. Click **Create API token**
3. Name: `Job Applications`
4. Permissions: **Object Read & Write**
5. Bucket: Select your `resumes` bucket
6. Click **Create API token**
7. **Save the credentials** - you'll need them!

### 1.5 Get R2 Account ID
1. In R2 dashboard, find your **Account ID**
2. Copy this value

### 1.6 Configure Worker Secrets
```bash
cd workers

# Set each secret (you'll be prompted for values)
wrangler secret put R2_ACCOUNT_ID
# Enter your R2 Account ID

wrangler secret put R2_ACCESS_KEY_ID
# Enter your R2 Access Key ID

wrangler secret put R2_SECRET_ACCESS_KEY
# Enter your R2 Secret Access Key

wrangler secret put R2_PUBLIC_URL
# Enter: https://pub-<your-account-id>.r2.dev

wrangler secret put SENDGRID_API_KEY
# Enter your SendGrid API key

cd ..
```

### 1.7 Deploy Worker
```bash
cd workers
wrangler deploy
cd ..
```

**Save the worker URL!** It will look like:
```
https://udc-applications-worker.your-subdomain.workers.dev
```

## 🌐 Step 2: Deploy to Netlify (Frontend)

### 2.1 Push Code to GitHub
```bash
git add .
git commit -m "Add Cloudflare Workers backend"
git push origin main
```

### 2.2 Connect to Netlify
1. Go to [Netlify](https://netlify.com/)
2. Click **New site from Git**
3. Choose **GitHub**
4. Select your repository
5. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 2.3 Deploy
1. Click **Deploy site**
2. Wait for deployment to complete
3. **Note your Netlify URL** - it will look like:
   ```
   https://amazing-name-123456.netlify.app
   ```

## 🔗 Step 3: Connect Frontend to Backend

### 3.1 Update Frontend API Configuration
Edit `src/config/api.ts` and replace the placeholder URL:

```typescript
// Replace this line:
return 'https://udc-applications-worker.your-subdomain.workers.dev/api';

// With your actual worker URL:
return 'https://udc-applications-worker.abc123.workers.dev/api';
```

### 3.2 Update Worker CORS for Your Netlify Domain
Edit `workers/applications.js` and update the CORS configuration:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://your-netlify-site.netlify.app',  // Add your actual Netlify URL
  'https://*.netlify.app',
  'https://*.netlify.com'
];
```

### 3.3 Redeploy Both
```bash
# Redeploy worker with updated CORS
cd workers
wrangler deploy
cd ..

# Commit and push frontend changes
git add .
git commit -m "Update API URL to production worker"
git push origin main
```

## 🧪 Step 4: Test the Connection

### 4.1 Test Worker Directly
```bash
# Test health endpoint
curl https://your-worker.workers.dev/api/health

# Should return: {"status":"OK","timestamp":"..."}
```

### 4.2 Test from Netlify
1. Go to your Netlify site
2. Open browser developer tools (F12)
3. Go to **Console** tab
4. Run this JavaScript:
```javascript
fetch('https://your-worker.workers.dev/api/health')
  .then(response => response.json())
  .then(data => console.log('Worker response:', data))
  .catch(error => console.error('Error:', error));
```

### 4.3 Test Full Application
1. Go to your Netlify site
2. Navigate to `/careers`
3. Click **Apply Now** on any job
4. Fill out the form and submit
5. Check:
   - ✅ Form submits successfully
   - ✅ Email confirmation sent
   - ✅ HR notification sent
   - ✅ File uploaded to R2

## 🔧 Step 5: Environment Variables (Optional)

### 5.1 Netlify Environment Variables
If you want to use environment variables in your frontend:

1. Go to Netlify dashboard
2. **Site settings** → **Environment variables**
3. Add:
   ```
   VITE_API_URL = https://your-worker.workers.dev/api
   ```

4. Update `src/config/api.ts`:
```typescript
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:8787/api';
  } else {
    return import.meta.env.VITE_API_URL || 'https://your-worker.workers.dev/api';
  }
};
```

## 🔍 Troubleshooting

### Common Issues:

#### 1. **CORS Error**
```
Access to fetch at 'https://your-worker.workers.dev/api/health' 
from origin 'https://your-site.netlify.app' has been blocked by CORS policy
```

**Solution**: Update worker CORS configuration:
```javascript
const allowedOrigins = [
  'https://your-actual-site.netlify.app',  // Add your exact Netlify URL
  'https://*.netlify.app'
];
```

#### 2. **Worker Not Responding**
```
Failed to fetch
```

**Solution**: 
- Check worker URL is correct
- Verify worker is deployed: `wrangler list`
- Check worker logs: `wrangler tail`

#### 3. **File Upload Fails**
```
File upload failed
```

**Solution**:
- Check R2 bucket exists and is named `resumes`
- Verify R2 credentials are set correctly
- Check file size (max 5MB)

#### 4. **Emails Not Sending**
```
Email sending failed
```

**Solution**:
- Check SendGrid API key is set
- Verify sender email is verified in SendGrid
- Check worker logs for email errors

## 📊 Monitoring the Connection

### 1. **Netlify Analytics**
- Go to Netlify dashboard
- View site analytics
- Check build logs

### 2. **Cloudflare Worker Analytics**
- Go to Cloudflare dashboard
- **Workers & Pages** → Your worker
- View analytics and logs

### 3. **Real-time Logs**
```bash
# Watch worker logs in real-time
wrangler tail

# Or from project root
npm run worker:tail
```

## 🎯 Final Architecture

```
User visits Netlify site
        ↓
Netlify serves React app
        ↓
User submits job application
        ↓
Frontend calls Cloudflare Worker API
        ↓
Worker processes application
        ↓
Worker uploads file to R2
        ↓
Worker sends emails via SendGrid
        ↓
User receives confirmation email
```

## ✅ Success Checklist

- [ ] Cloudflare Worker deployed and accessible
- [ ] Netlify site deployed and accessible
- [ ] Frontend API URL updated to worker URL
- [ ] Worker CORS configured for Netlify domain
- [ ] Health check endpoint working
- [ ] Job application form working
- [ ] File upload working
- [ ] Email notifications working
- [ ] No CORS errors in browser console

## 🚀 Quick Commands

```bash
# Deploy everything
./deploy.sh

# Or step by step:
npm run worker:deploy  # Deploy backend
git push origin main   # Deploy frontend (Netlify auto-deploys)

# Test locally
npm run dev:full

# Check logs
npm run worker:tail
```

---

**Your Netlify frontend is now connected to your Cloudflare Worker backend! 🎉**
