# Job Application System

A modern job application system built with React frontend and Cloudflare Workers backend.

## 🚀 Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Cloudflare Workers (JavaScript)
- **File Storage**: Cloudflare R2
- **Email**: SendGrid
- **Form Handling**: React Hook Form + Zod validation
- **UI**: Headless UI + Heroicons
- **Deployment**: Cloudflare Workers (serverless)

## 📁 Project Structure

```
├── src/                    # React frontend
│   ├── pages/             # Application pages
│   ├── components/        # Reusable components
│   ├── config/           # Configuration files
│   └── data/             # Mock data
├── workers/               # Cloudflare Workers backend
│   ├── applications.js   # Main worker application
│   ├── email.js         # Email worker (optional)
│   ├── package.json     # Worker dependencies
│   └── test-worker.js   # Test script
├── wrangler.toml         # Cloudflare configuration
└── README.md
```

## 🛠️ Setup

### Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   npm run install:worker
   ```

2. **Start Development**:
   ```bash
   # Start both frontend and worker
   npm run dev:full
   ```

### Cloudflare Workers Setup

1. **Install Wrangler CLI**:
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Set up R2 Storage**:
   - Create R2 bucket named `resumes`
   - Get Account ID and API credentials

4. **Configure Secrets**:
   ```bash
   cd workers
   wrangler secret put R2_ACCOUNT_ID
   wrangler secret put R2_ACCESS_KEY_ID
   wrangler secret put R2_SECRET_ACCESS_KEY
   wrangler secret put R2_PUBLIC_URL
   wrangler secret put SENDGRID_API_KEY
   ```

5. **Deploy Worker**:
   ```bash
   npm run worker:deploy
   ```

## 🌐 API Endpoints

- `GET /api/health` - Health check
- `POST /api/applications` - Submit job application (with file upload)
- `POST /api/applications/json` - Submit application data (JSON only)

## 🔧 Environment Variables

Set these in Cloudflare Workers (via `wrangler secret put`):

```bash
# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_PUBLIC_URL=your_r2_public_url

# SendGrid
SENDGRID_API_KEY=your_sendgrid_key

# Email Configuration (in wrangler.toml)
FROM_EMAIL=noreply@yourcompany.com
FROM_NAME=Your Company
HR_EMAIL=hr@yourcompany.com
```

## 📚 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run dev:full` - Start both frontend and worker
- `npm run worker:dev` - Start worker locally
- `npm run worker:deploy` - Deploy worker to Cloudflare
- `npm run worker:test` - Test worker functionality
- `npm run install:worker` - Install worker dependencies

## 🎯 Key Features

- **Job Listings**: Browse available positions
- **Job Details**: Detailed view of each position
- **Apply Now**: Job-specific application form
- **Send Resume**: General resume submission
- **File Upload**: Resume upload with validation
- **Email Notifications**: Confirmation and HR notifications
- **Responsive Design**: Mobile-friendly interface

## 🚀 Advantages of Cloudflare Workers

- ✅ **Zero Server Management**: No servers to maintain or scale
- ✅ **Global Edge Deployment**: Faster response times worldwide
- ✅ **Pay-per-request**: Only pay for what you use
- ✅ **Automatic Scaling**: Handles traffic spikes automatically
- ✅ **Built-in Security**: DDoS protection, WAF, etc.
- ✅ **Simple Deployment**: `wrangler deploy` and you're live
- ✅ **Cost Effective**: 90% cost reduction vs traditional servers

## 📖 Documentation

- Frontend runs on `http://localhost:5173`
- Worker runs on `http://localhost:8787` (development)
- Production worker: `https://your-worker.workers.dev`
- See `QUICK_START.md` for detailed setup instructions