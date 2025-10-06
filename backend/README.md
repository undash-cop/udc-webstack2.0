# FastAPI Backend

Simple, clean backend for job applications using FastAPI.

## Features

- ✅ **FastAPI**: Modern, fast web framework
- ✅ **File Upload**: Handle resume uploads with validation
- ✅ **Cloudflare R2**: Store files in R2 storage
- ✅ **SendGrid**: Send confirmation and notification emails
- ✅ **Validation**: Pydantic models with automatic validation
- ✅ **CORS**: Cross-origin resource sharing enabled
- ✅ **Async**: Fully asynchronous operations
- ✅ **Auto Docs**: Interactive API documentation

## Setup

1. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set Environment Variables**:
   ```bash
   cp env.example .env
   # Edit .env with your actual values
   ```

3. **Run the Server**:
   ```bash
   python run.py
   ```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/applications` - Submit job application
- `GET /docs` - Interactive API documentation
- `GET /redoc` - Alternative API documentation

## Environment Variables

```env
# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=resumes

# SendGrid
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=noreply@yourcompany.com
FROM_NAME=Your Company
HR_EMAIL=hr@yourcompany.com

# Server
PORT=8000
HOST=0.0.0.0
```

## Advantages over Node.js

- 🚀 **No Memory Leaks**: Python handles memory management automatically
- 🧹 **Clean Code**: Pydantic models provide automatic validation
- 📚 **Auto Documentation**: FastAPI generates interactive docs
- 🔧 **Type Safety**: Full type hints and validation
- ⚡ **Performance**: FastAPI is one of the fastest Python frameworks
- 🛠️ **Simple**: No complex middleware or configuration needed
