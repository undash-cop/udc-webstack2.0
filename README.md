# Job Application System

A modern job application system built with React frontend and FastAPI backend.

## 🚀 Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: FastAPI + Python
- **File Storage**: Cloudflare R2
- **Email**: SendGrid
- **Form Handling**: React Hook Form + Zod validation
- **UI**: Headless UI + Heroicons

## 📁 Project Structure

```
├── src/                    # React frontend
│   ├── pages/             # Application pages
│   ├── components/        # Reusable components
│   ├── config/           # Configuration files
│   └── data/             # Mock data
├── backend/              # FastAPI backend
│   ├── main.py          # Main FastAPI application
│   ├── requirements.txt # Python dependencies
│   ├── run.py          # Server startup script
│   └── env.example     # Environment variables template
└── README.md
```

## 🛠️ Setup

### Frontend Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Install Python Dependencies**:
   ```bash
   npm run install:backend
   ```

2. **Set Environment Variables**:
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your actual values
   ```

3. **Start Backend Server**:
   ```bash
   npm run server
   ```

### Full Stack Development

```bash
# Start both frontend and backend
npm run dev:full
```

## 🌐 API Endpoints

- `GET /api/health` - Health check
- `POST /api/applications` - Submit job application
- `GET /docs` - Interactive API documentation
- `GET /redoc` - Alternative API documentation

## 🔧 Environment Variables

Create `backend/.env` with:

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

## 📚 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run server` - Start FastAPI backend
- `npm run dev:full` - Start both frontend and backend
- `npm run install:backend` - Install Python dependencies

## 🎯 Key Features

- **Job Listings**: Browse available positions
- **Job Details**: Detailed view of each position
- **Apply Now**: Job-specific application form
- **Send Resume**: General resume submission
- **File Upload**: Resume upload with validation
- **Email Notifications**: Confirmation and HR notifications
- **Responsive Design**: Mobile-friendly interface

## 🚀 Advantages of FastAPI Backend

- ✅ **No Memory Leaks**: Python handles memory automatically
- ✅ **Clean Code**: Pydantic models provide automatic validation
- ✅ **Auto Documentation**: FastAPI generates interactive docs
- ✅ **Type Safety**: Full type hints and validation
- ✅ **Performance**: FastAPI is one of the fastest Python frameworks
- ✅ **Simple**: No complex middleware or configuration needed

## 📖 Documentation

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:8000`
- API docs available at `http://localhost:8000/docs`