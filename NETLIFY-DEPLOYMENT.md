# 🚀 Netlify Deployment Guide

Complete guide to deploy your form submission system to Netlify with Cloudflare R2 and SendGrid.

## 📋 Prerequisites

Before deploying, make sure you have:

1. **✅ Cloudflare R2** account and credentials
2. **✅ SendGrid** account and API key
3. **✅ GitHub** repository with your code
4. **✅ Netlify** account (free)

## 🚀 Step-by-Step Deployment

### **Step 1: Prepare Your Repository**

#### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Add form submission system with SendGrid and R2"

# Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

#### 1.2 Verify Build
```bash
# Test build locally
npm run build

# Should create 'dist' folder with built files
ls -la dist/
```

### **Step 2: Deploy to Netlify**

#### 2.1 Connect Repository
1. **Go to [Netlify](https://netlify.com/)**
2. **Click "New site from Git"**
3. **Choose "GitHub"** (or your Git provider)
4. **Select your repository**
5. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `22`

#### 2.2 Set Environment Variables
In Netlify dashboard, go to **Site settings** → **Environment variables**:

```bash
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your_actual_r2_account_id
R2_ACCESS_KEY_ID=your_actual_r2_access_key
R2_SECRET_ACCESS_KEY=your_actual_r2_secret_key
R2_BUCKET_NAME=your_actual_bucket_name

# SendGrid Configuration
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key
FROM_EMAIL=noreply@yourcompany.com
FROM_NAME=Your Company Name
HR_EMAIL=hr@yourcompany.com

# Application Configuration
NEXTAUTH_SECRET=your_production_secret_key
NEXTAUTH_URL=https://your-site-name.netlify.app
```

#### 2.3 Deploy
1. **Click "Deploy site"**
2. **Wait for build** to complete (2-3 minutes)
3. **Check build logs** for any errors
4. **Your site will be live** at `https://your-site-name.netlify.app`

### **Step 3: Configure Custom Domain (Optional)**

#### 3.1 Add Custom Domain
1. **Go to Site settings** → **Domain management**
2. **Click "Add custom domain"**
3. **Enter your domain** (e.g., `careers.yourcompany.com`)
4. **Follow DNS setup** instructions

#### 3.2 SSL Certificate
- **Automatic HTTPS** is enabled by default
- **Let's Encrypt** certificate will be issued
- **Force HTTPS** redirect is recommended

### **Step 4: Test Your Deployment**

#### 4.1 Test Frontend
1. **Visit your site**: `https://your-site-name.netlify.app`
2. **Navigate to Careers** page
3. **Click "Apply Now"** on any job
4. **Verify form loads** correctly

#### 4.2 Test API Endpoints
```bash
# Test health endpoint
curl https://your-site-name.netlify.app/api/health

# Should return: {"status":"OK","timestamp":"..."}
```

#### 4.3 Test Form Submission
1. **Fill out the form** with test data
2. **Upload a test resume** (PDF, DOC, or DOCX)
3. **Submit the form**
4. **Check for success message**
5. **Verify emails** are sent (check SendGrid dashboard)

## 🔧 Troubleshooting

### **Common Deployment Issues:**

#### 1. **Build Fails**
```bash
# Check build logs in Netlify dashboard
# Common issues:
- Missing dependencies
- TypeScript errors
- Environment variables not set
```

#### 2. **Function Errors**
```bash
# Check function logs in Netlify dashboard
# Common issues:
- Missing environment variables
- Invalid API keys
- CORS issues
```

#### 3. **File Upload Fails**
```bash
# Check R2 credentials
# Verify bucket exists
# Check file size limits
```

#### 4. **Email Not Sending**
```bash
# Check SendGrid API key
# Verify sender email is verified
# Check SendGrid dashboard for errors
```

### **Debug Steps:**

#### 1. **Check Build Logs**
- Go to **Deploys** tab in Netlify
- Click on latest deploy
- Check **Build log** for errors

#### 2. **Check Function Logs**
- Go to **Functions** tab in Netlify
- Click on function name
- Check **Function log** for errors

#### 3. **Test Locally**
```bash
# Test with production environment variables
SENDGRID_API_KEY=your_key FROM_EMAIL=your_email npm run dev:full
```

## 📊 Monitoring & Analytics

### **Netlify Dashboard Features:**
- **Deploy status** and history
- **Function logs** and performance
- **Form submissions** (if using Netlify Forms)
- **Site analytics** and performance

### **SendGrid Dashboard:**
- **Email delivery** statistics
- **Open and click** rates
- **Bounce and block** management
- **API usage** monitoring

### **Cloudflare R2 Dashboard:**
- **File storage** usage
- **Upload/download** statistics
- **Access logs** and analytics

## 🔒 Security Best Practices

### **Environment Variables:**
- **Never commit** `.env.local` to git
- **Use strong secrets** for production
- **Rotate API keys** regularly
- **Limit permissions** where possible

### **API Security:**
- **Validate all inputs** with Zod
- **Rate limiting** (consider Netlify Pro)
- **CORS configuration** is set
- **File type validation** implemented

### **Email Security:**
- **Verify sender domains** in SendGrid
- **Use SPF/DKIM** records
- **Monitor bounce rates**
- **Handle unsubscribes** properly

## 📈 Performance Optimization

### **Frontend Optimization:**
- **Vite build** optimizes automatically
- **Code splitting** is enabled
- **Asset compression** with gzip
- **CDN delivery** via Netlify

### **Backend Optimization:**
- **Serverless functions** scale automatically
- **Cold start** optimization
- **Connection pooling** for databases
- **Caching** for static assets

## 🎯 Production Checklist

### **Before Going Live:**
- [ ] **All environment variables** set correctly
- [ ] **SendGrid sender** verified
- [ ] **R2 bucket** configured and accessible
- [ ] **Custom domain** configured (if needed)
- [ ] **SSL certificate** active
- [ ] **Form submission** tested end-to-end
- [ ] **Email delivery** tested
- [ ] **Error handling** working
- [ ] **Monitoring** set up

### **Post-Deployment:**
- [ ] **Monitor error logs** for 24 hours
- [ ] **Test form submissions** regularly
- [ ] **Check email delivery** rates
- [ ] **Monitor performance** metrics
- [ ] **Update documentation** if needed

## 🚀 Advanced Features

### **Netlify Pro Features:**
- **Form handling** without backend
- **A/B testing** capabilities
- **Edge functions** for better performance
- **Advanced analytics** and monitoring

### **Future Enhancements:**
- **Database integration** (Supabase, PlanetScale)
- **User authentication** (Auth0, Clerk)
- **Admin dashboard** for applications
- **Advanced analytics** and reporting

## 📞 Support

### **Netlify Support:**
- **Documentation**: https://docs.netlify.com/
- **Community**: https://community.netlify.com/
- **Support**: Available with paid plans

### **SendGrid Support:**
- **Documentation**: https://docs.sendgrid.com/
- **Support Center**: https://support.sendgrid.com/

### **Cloudflare Support:**
- **Documentation**: https://developers.cloudflare.com/r2/
- **Community**: https://community.cloudflare.com/

---

**🎉 Congratulations! Your form submission system is now live on Netlify!**

**Your site URL**: `https://your-site-name.netlify.app`
**API Health**: `https://your-site-name.netlify.app/api/health`
