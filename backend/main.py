import traceback
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, validator
from typing import Optional
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
import os
import tempfile
import asyncio
from datetime import datetime
import logging
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Job Application API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ApplicationData(BaseModel):
    job_id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    current_company: Optional[str] = None
    experience: str
    cover_letter: Optional[str] = None
    linkedin: Optional[str] = None
    portfolio: Optional[str] = None

    @validator('first_name', 'last_name')
    def validate_names(cls, v):
        if len(v) < 2 or len(v) > 50:
            raise ValueError('Name must be between 2 and 50 characters')
        return v

    @validator('phone')
    def validate_phone(cls, v):
        if not v.replace('+', '').replace('-', '').replace(' ', '').replace('(', '').replace(')', '').isdigit():
            raise ValueError('Invalid phone number format')
        return v

    @validator('linkedin', 'portfolio')
    def validate_urls(cls, v):
        if v and not v.startswith(('http://', 'https://')):
            raise ValueError('URL must start with http:// or https://')
        return v

# Environment configuration
class Config:
    R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID")
    R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID")
    R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY")
    R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME", "resumes")
    SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
    FROM_EMAIL = os.getenv("FROM_EMAIL")
    FROM_NAME = os.getenv("FROM_NAME", "Your Company")
    HR_EMAIL = os.getenv("HR_EMAIL", "hr@yourcompany.com")

# Initialize services
def get_r2_client():
    return boto3.client(
        's3',
        region_name='auto',
        endpoint_url=f'https://{Config.R2_ACCOUNT_ID}.r2.cloudflarestorage.com',
        aws_access_key_id=Config.R2_ACCESS_KEY_ID,
        aws_secret_access_key=Config.R2_SECRET_ACCESS_KEY
    )

def get_sendgrid_client():
    return SendGridAPIClient(api_key=Config.SENDGRID_API_KEY)

# File validation
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def validate_file(file: UploadFile):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Check file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Only PDF, DOC, and DOCX files are allowed."
        )
    
    # Check file size
    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size is 5MB."
        )

# File upload to R2
async def upload_to_r2(file: UploadFile, metadata: dict) -> dict:
    try:
        s3_client = get_r2_client()
        
        # Generate unique key
        timestamp = int(datetime.now().timestamp() * 1000)
        key = f"resumes/{timestamp}-{file.filename}"
        
        # Read file content
        content = await file.read()
        
        # Upload to R2
        s3_client.put_object(
            Bucket=Config.R2_BUCKET_NAME,
            Key=key,
            Body=content,
            ContentType=file.content_type,
            Metadata=metadata
        )
        
        # Generate public URL
        url = f"https://{Config.R2_BUCKET_NAME}.{Config.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/{key}"
        
        return {"key": key, "url": url}
        
    except ClientError as e:
        logger.error(f"R2 upload error: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload file")

# Email services
async def send_confirmation_email(application_data: dict):
    try:
        sg = get_sendgrid_client()
        
        message = Mail(
            from_email=(Config.FROM_EMAIL, Config.FROM_NAME),
            to_emails=application_data['email'],
            subject='Application Received - Thank You!',
            html_content=f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">Application Received!</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your interest in joining our team</p>
                </div>
                <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
                    <p style="color: #333; line-height: 1.6;">Dear {application_data['first_name']},</p>
                    <p style="color: #333; line-height: 1.6;">We have successfully received your application for the position. We appreciate your interest in our company and the time you took to apply.</p>
                    <p style="color: #333; line-height: 1.6;">Our HR team will review your application carefully. If your qualifications and experience align with our requirements, we will contact you for the next steps in the hiring process.</p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="https://undash-cop.com/careers" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">View Careers Page</a>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #666; margin-bottom: 10px;">Best regards,</p>
                        <p style="color: #2563eb; font-weight: bold; margin: 0;">HR Team</p>
                    </div>
                </div>
            </div>
            """
        )
        
        await asyncio.get_event_loop().run_in_executor(None, sg.send, message)
        logger.info(f"Confirmation email sent to {application_data['email']}")
        
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send confirmation email")

async def send_hr_notification(application_data: dict):
    try:
        sg = get_sendgrid_client()
        
        message = Mail(
            from_email=(Config.FROM_EMAIL, Config.FROM_NAME),
            to_emails=Config.HR_EMAIL,
            subject=f"New Application: {application_data['first_name']} {application_data['last_name']} - Job #{application_data['job_id']}",
            html_content=f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: #dc2626; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">New Job Application</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Action Required</p>
                </div>
                <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
                    <h2 style="color: #333; font-size: 20px; margin-top: 0;">Applicant Details:</h2>
                    <ul style="list-style: none; padding: 0; color: #333;">
                        <li style="margin-bottom: 10px;"><strong>Name:</strong> {application_data['first_name']} {application_data['last_name']}</li>
                        <li style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:{application_data['email']}" style="color: #2563eb;">{application_data['email']}</a></li>
                        <li style="margin-bottom: 10px;"><strong>Phone:</strong> {application_data['phone']}</li>
                        <li style="margin-bottom: 10px;"><strong>Job ID:</strong> {application_data['job_id']}</li>
                        <li style="margin-bottom: 10px;"><strong>Current Company:</strong> {application_data.get('current_company', 'N/A')}</li>
                        <li style="margin-bottom: 10px;"><strong>Experience:</strong> {application_data['experience']}</li>
                        <li style="margin-bottom: 10px;"><strong>LinkedIn:</strong> {f'<a href="{application_data["linkedin"]}" style="color: #2563eb;">{application_data["linkedin"]}</a>' if application_data.get('linkedin') else 'N/A'}</li>
                        <li style="margin-bottom: 10px;"><strong>Portfolio:</strong> {f'<a href="{application_data["portfolio"]}" style="color: #2563eb;">{application_data["portfolio"]}</a>' if application_data.get('portfolio') else 'N/A'}</li>
                        <li style="margin-bottom: 10px;"><strong>Resume:</strong> <a href="{application_data.get('resume_url', '#')}" style="color: #2563eb;">Download Resume</a></li>
                    </ul>
                    <h2 style="color: #333; font-size: 20px; margin-top: 20px;">Cover Letter:</h2>
                    <p style="color: #333; line-height: 1.6; border: 1px solid #e5e7eb; padding: 15px; border-radius: 5px; background-color: #f9fafb;">
                        {application_data.get('cover_letter', 'No cover letter provided.')}
                    </p>
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #666; margin: 0;">Application received on {datetime.now().strftime('%B %d, %Y')}</p>
                    </div>
                </div>
            </div>
            """
        )
        
        await asyncio.get_event_loop().run_in_executor(None, sg.send, message)
        logger.info(f"HR notification sent for application from {application_data['email']}")
        
    except Exception as e:
        logger.error(f"Failed to send HR notification: {e}")
        raise HTTPException(status_code=500, detail="Failed to send HR notification")

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "OK", "timestamp": datetime.now().isoformat()}

# JSON endpoint for testing (without file upload)
@app.post("/api/applications/json")
async def submit_application_json(application_data: ApplicationData):
    try:
        # For JSON endpoint, we'll just return success without file upload
        # This is useful for testing the form validation
        return JSONResponse(
            status_code=201,
            content={
                "success": True,
                "message": "Application data validated successfully (JSON endpoint - no file upload)",
                "application_id": int(datetime.now().timestamp() * 1000),
                "data": application_data.dict()
            }
        )
    except Exception as e:
        logger.error(f"JSON application submission error: {e}")
        raise HTTPException(status_code=500, detail="Failed to process application data")

@app.post("/api/applications")
async def submit_application(
    job_id: int = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    current_company: Optional[str] = Form(None),
    experience: str = Form(...),
    cover_letter: Optional[str] = Form(None),
    linkedin: Optional[str] = Form(None),
    portfolio: Optional[str] = Form(None),
    resume: UploadFile = File(...)
):
    try:
        # Validate file
        validate_file(resume)
        
        # Create application data
        application_data = ApplicationData(
            job_id=job_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            current_company=current_company,
            experience=experience,
            cover_letter=cover_letter,
            linkedin=linkedin,
            portfolio=portfolio
        )
        
        # Upload file to R2
        metadata = {
            "original_name": resume.filename,
            "uploaded_by": email,
            "job_id": str(job_id)
        }
        try:
            upload_result = await upload_to_r2(resume, metadata)
        except NoCredentialsError:
            logger.warning("No credentials found for R2")
            upload_result = {"key": "test.pdf", "url": "https://test.pdf"}
        # Prepare application record
        application_record = {
            "id": int(datetime.now().timestamp() * 1000),
            "job_id": job_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "phone": phone,
            "current_company": current_company,
            "experience": experience,
            "cover_letter": cover_letter,
            "linkedin": linkedin,
            "portfolio": portfolio,
            "resume_path": upload_result["key"],
            "resume_url": upload_result["url"],
            "resume_name": resume.filename,
            "resume_size": resume.size,
            "status": "pending",
            "created_at": datetime.now().isoformat()
        }
        
        # Send emails concurrently
        await asyncio.gather(
            send_confirmation_email(application_record),
            send_hr_notification(application_record),
            return_exceptions=True
        )
        
        return JSONResponse(
            status_code=201,
            content={
                "success": True,
                "message": "Application submitted successfully",
                "application_id": application_record["id"]
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(traceback.format_exc())
        logger.error(f"Application submission error: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit application")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
