#!/usr/bin/env python3
"""
FastAPI Backend Server
Simple, clean backend for job applications
"""

import os
import uvicorn
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"🚀 Starting FastAPI server on {host}:{port}")
    print(f"📡 API available at http://{host}:{port}/api")
    print(f"📊 Health check: http://{host}:{port}/api/health")
    print(f"📚 API docs: http://{host}:{port}/docs")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
