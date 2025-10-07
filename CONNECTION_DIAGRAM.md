# 🔗 Netlify ↔ Cloudflare Worker Connection Diagram

## Architecture Flow

```
┌─────────────────┐    HTTP Request    ┌──────────────────┐
│                 │ ──────────────────▶ │                  │
│   Netlify UI    │                    │ Cloudflare Worker│
│   (Frontend)    │ ◀────────────────── │    (Backend)     │
│                 │    JSON Response   │                  │
└─────────────────┘                    └──────────────────┘
         │                                       │
         │                                       │
         │                                       ▼
         │                              ┌──────────────────┐
         │                              │   Cloudflare R2  │
         │                              │   (File Storage) │
         │                              └──────────────────┘
         │                                       │
         │                                       ▼
         │                              ┌──────────────────┐
         │                              │    SendGrid      │
         │                              │   (Email API)    │
         │                              └──────────────────┘
         │
         ▼
┌─────────────────┐
│   User Browser  │
│   (Receives     │
│   Confirmation) │
└─────────────────┘
```

## Connection Steps

### 1. Deploy Cloudflare Worker
```bash
cd workers
wrangler deploy
# Get URL: https://your-worker.workers.dev
```

### 2. Deploy to Netlify
```bash
git push origin main
# Netlify auto-deploys from GitHub
# Get URL: https://your-site.netlify.app
```

### 3. Connect Them
```typescript
// In src/config/api.ts
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:8787/api';  // Local worker
  } else {
    return 'https://your-worker.workers.dev/api';  // Production worker
  }
};
```

### 4. Configure CORS
```javascript
// In workers/applications.js
const allowedOrigins = [
  'https://your-site.netlify.app',  // Your Netlify domain
  'https://*.netlify.app',
  'http://localhost:5173'  // Development
];
```

## Data Flow

1. **User visits Netlify site** → React app loads
2. **User fills job application** → Form data collected
3. **User submits form** → Frontend sends POST to Cloudflare Worker
4. **Worker processes request** → Validates data, uploads file to R2
5. **Worker sends emails** → SendGrid sends confirmation + HR notification
6. **Worker responds** → Success message sent back to frontend
7. **User sees confirmation** → Success message displayed

## API Endpoints

```
Netlify Frontend calls:
├── GET  /api/health           → Health check
├── POST /api/applications     → Submit job application (with file)
└── POST /api/applications/json → Submit application data (JSON only)

Cloudflare Worker handles:
├── File upload to R2
├── Email notifications via SendGrid
├── Form validation
└── CORS handling
```

## Environment Variables

### Cloudflare Worker (via wrangler secret put)
```bash
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_PUBLIC_URL=https://pub-xxx.r2.dev
SENDGRID_API_KEY=your_sendgrid_key
```

### Netlify (optional, via dashboard)
```bash
VITE_API_URL=https://your-worker.workers.dev/api
```

## Testing the Connection

### 1. Test Worker Directly
```bash
curl https://your-worker.workers.dev/api/health
# Should return: {"status":"OK","timestamp":"..."}
```

### 2. Test from Netlify
```javascript
// In browser console on your Netlify site
fetch('https://your-worker.workers.dev/api/health')
  .then(response => response.json())
  .then(data => console.log('Worker response:', data));
```

### 3. Test Full Flow
1. Go to your Netlify site
2. Navigate to `/careers`
3. Click "Apply Now"
4. Fill out and submit the form
5. Check for success message and emails

## Troubleshooting

### CORS Error
```
Access to fetch at 'https://your-worker.workers.dev/api/health' 
from origin 'https://your-site.netlify.app' has been blocked by CORS policy
```
**Fix**: Update worker CORS to include your Netlify domain

### Worker Not Responding
```
Failed to fetch
```
**Fix**: Check worker URL and deployment status

### File Upload Fails
```
File upload failed
```
**Fix**: Check R2 bucket configuration and credentials

---

**Your Netlify frontend and Cloudflare Worker backend are now connected! 🎉**