# 🔧 Port Configuration Guide

This guide explains how to configure the server port for different environments and deployment scenarios.

## 📋 Port Configuration Options

### **Environment Variables**

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `SERVER_PORT` | Backend server port | `3001` | `3001`, `8080`, `5000` |
| `VITE_SERVER_PORT` | Frontend API port (for Vite) | `3001` | `3001`, `8080`, `5000` |
| `PORT` | Fallback port (Netlify, Heroku) | `3001` | `3001`, `8080`, `5000` |

### **Configuration Files**

#### **Development (.env.local)**
```bash
# Server Configuration
SERVER_PORT=3001
VITE_SERVER_PORT=3001

# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
```

#### **Production (Netlify)**
```bash
# Server Configuration
SERVER_PORT=3001
VITE_SERVER_PORT=3001

# API Configuration
VITE_API_BASE_URL=https://your-site.netlify.app/api
```

## 🚀 Usage Examples

### **Default Development (Port 3001)**
```bash
# Start both frontend and backend
npm run dev:full

# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

### **Custom Port Development**
```bash
# Set custom port
export SERVER_PORT=8080
export VITE_SERVER_PORT=8080

# Start development
npm run dev:full

# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

### **Production Server**
```bash
# Set production port
export NODE_ENV=production
export SERVER_PORT=8080

# Start production server
npm run start

# Server: http://localhost:8080
```

## 🔧 Configuration Methods

### **Method 1: Environment Variables**
```bash
# Set port for current session
export SERVER_PORT=8080
export VITE_SERVER_PORT=8080
npm run dev:full
```

### **Method 2: .env.local File**
```bash
# Create .env.local file
echo "SERVER_PORT=8080" >> .env.local
echo "VITE_SERVER_PORT=8080" >> .env.local

# Start development
npm run dev:full
```

### **Method 3: Inline Environment Variables**
```bash
# Set port inline
SERVER_PORT=8080 VITE_SERVER_PORT=8080 npm run dev:full
```

### **Method 4: Package.json Scripts**
```bash
# Use predefined scripts
npm run server:dev    # Development server
npm run server:prod   # Production server
npm run dev:custom    # Custom development setup
```

## 🌐 Deployment Scenarios

### **Netlify Deployment**
- **Port**: Automatically assigned by Netlify
- **Configuration**: Set in Netlify dashboard
- **Environment Variables**: `PORT` (Netlify standard)

### **Vercel Deployment**
- **Port**: Automatically assigned by Vercel
- **Configuration**: Set in Vercel dashboard
- **Environment Variables**: `PORT` (Vercel standard)

### **Railway/Render Deployment**
- **Port**: Set via `PORT` environment variable
- **Configuration**: Set in deployment dashboard
- **Default**: Usually `3000` or `8080`

### **Docker Deployment**
```dockerfile
# Dockerfile
EXPOSE 3001
ENV SERVER_PORT=3001
CMD ["npm", "run", "start"]
```

### **Local Development**
```bash
# Multiple projects on different ports
SERVER_PORT=3001 npm run dev:full  # Project 1
SERVER_PORT=3002 npm run dev:full  # Project 2
SERVER_PORT=3003 npm run dev:full  # Project 3
```

## 🔍 Troubleshooting

### **Port Already in Use**
```bash
# Check what's using the port
lsof -i :3001

# Kill process using the port
kill -9 $(lsof -t -i:3001)

# Or use a different port
SERVER_PORT=3002 npm run dev:full
```

### **Frontend Can't Connect to Backend**
```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Check environment variables
echo $VITE_SERVER_PORT
echo $SERVER_PORT

# Verify API configuration
cat src/config/api.ts
```

### **CORS Issues**
```bash
# Check CORS configuration in server.cjs
# Ensure frontend URL is allowed
# Check if ports match between frontend and backend
```

## 📊 Port Configuration Examples

### **Development Setup**
```bash
# .env.local
SERVER_PORT=3001
VITE_SERVER_PORT=3001
VITE_API_BASE_URL=http://localhost:3001/api
```

### **Testing Setup**
```bash
# .env.test
SERVER_PORT=3002
VITE_SERVER_PORT=3002
VITE_API_BASE_URL=http://localhost:3002/api
```

### **Production Setup**
```bash
# .env.production
SERVER_PORT=8080
VITE_SERVER_PORT=8080
VITE_API_BASE_URL=https://your-site.netlify.app/api
```

### **Docker Setup**
```bash
# docker-compose.yml
services:
  app:
    ports:
      - "3001:3001"
    environment:
      - SERVER_PORT=3001
      - VITE_SERVER_PORT=3001
```

## 🎯 Best Practices

### **Port Selection**
- **Development**: Use `3001` (default)
- **Testing**: Use `3002`, `3003`, etc.
- **Production**: Use `8080` or `3000`
- **Avoid**: Ports below `1024` (require root)

### **Environment Management**
- **Use .env files** for different environments
- **Never commit** sensitive environment files
- **Document** port requirements
- **Test** port configuration before deployment

### **Security Considerations**
- **Restrict** port access in production
- **Use HTTPS** in production
- **Validate** port numbers
- **Monitor** port usage

## 🚀 Quick Start Commands

```bash
# Default development
npm run dev:full

# Custom port development
SERVER_PORT=8080 npm run dev:full

# Production server
npm run start

# Health check
curl http://localhost:3001/api/health

# Check running processes
lsof -i :3001
```

---

**🎉 Your server port is now fully configurable for any environment!**
