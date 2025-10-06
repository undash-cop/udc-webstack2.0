# 🚀 Form Submission Setup Guide

This guide will help you set up the complete form submission system with Netlify and Cloudflare R2.

## 📋 Prerequisites

1. **Cloudflare Account** - For R2 storage
2. **Gmail Account** - For email notifications
3. **Netlify Account** - For deployment

## 🔧 Step 1: Cloudflare R2 Setup

### 1.1 Create R2 Bucket
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage**
3. Click **Create bucket**
4. Name: `resumes` (or your preferred name)
5. Click **Create bucket**

### 1.2 Generate API Token
1. Go to **Manage R2 API tokens**
2. Click **Create API token**
3. Name: `Form Submissions`
4. Permissions: **Object Read & Write**
5. Bucket: Select your bucket
6. Click **Create API token**
7. **Save the credentials** - you'll need them later

### 1.3 Get Account ID
1. In R2 dashboard, find your **Account ID**
2. Copy this value

## 📧 Step 2: SendGrid Setup

### 2.1 Create SendGrid Account
1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up for a free account
3. Verify your email address
4. Complete account setup

### 2.2 Create API Key
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name: `Form Submissions`
4. Permissions: **Full Access** (or **Mail Send** only for security)
5. Click **Create & View**
6. **Copy the API key** - you'll only see it once!

### 2.3 Verify Sender Identity
1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in your details:
   - **From Name**: Your Company Name
   - **From Email**: noreply@yourcompany.com
   - **Reply To**: support@yourcompany.com
4. Click **Create**
5. **Check your email** and click the verification link

## 🌐 Step 3: Environment Variables

Create a `.env.local` file in your project root:

```bash
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your_account_id_here
R2_ACCESS_KEY_ID=your_access_key_here
R2_SECRET_ACCESS_KEY=your_secret_key_here
R2_BUCKET_NAME=resumes

# SendGrid Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=noreply@yourcompany.com
FROM_NAME=Your Company Name
HR_EMAIL=hr@yourcompany.com

# Application Configuration
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## 🚀 Step 4: Netlify Deployment

### 4.1 Deploy to Netlify
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com/)
3. Click **New site from Git**
4. Connect your GitHub repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 4.2 Set Environment Variables in Netlify
1. Go to **Site settings** → **Environment variables**
2. Add all variables from your `.env.local` file
3. Make sure to use the same names

### 4.3 Deploy
1. Click **Deploy site**
2. Wait for deployment to complete
3. Your form will be available at `https://your-site.netlify.app`

## 🧪 Step 5: Testing

### 5.1 Test Form Submission
1. Go to your deployed site
2. Navigate to `/careers`
3. Click **Apply Now** on any job
4. Fill out the form and submit
5. Check your email for confirmation

### 5.2 Verify File Upload
1. Check your Cloudflare R2 bucket
2. You should see uploaded resume files
3. Files are organized by timestamp

## 🔍 Troubleshooting

### Common Issues:

#### 1. **File Upload Fails**
- Check R2 credentials
- Verify bucket name
- Check file size (max 5MB)

#### 2. **Email Not Sending**
- Verify SendGrid API key
- Check sender email is verified
- Test with SendGrid dashboard

#### 3. **Form Validation Errors**
- Check Zod schema
- Verify all required fields
- Check file type restrictions

#### 4. **Netlify Deployment Issues**
- Check build logs
- Verify environment variables
- Check Node.js version

## 📊 Monitoring

### 1. **Application Logs**
- Check Netlify function logs
- Monitor error rates
- Track successful submissions

### 2. **File Storage**
- Monitor R2 storage usage
- Set up alerts for storage limits
- Regular cleanup of old files

### 3. **Email Delivery**
- Monitor email bounce rates
- Check spam folder
- Verify email templates

## 🔒 Security Considerations

### 1. **Environment Variables**
- Never commit `.env.local` to git
- Use strong, unique secrets
- Rotate credentials regularly

### 2. **File Uploads**
- Validate file types
- Limit file sizes
- Scan for malware (optional)

### 3. **Rate Limiting**
- Implement rate limiting
- Monitor for abuse
- Block suspicious IPs

## 📈 Performance Optimization

### 1. **File Uploads**
- Compress images before upload
- Use CDN for file delivery
- Implement progress indicators

### 2. **Email Templates**
- Optimize HTML templates
- Use inline CSS
- Test across email clients

### 3. **Database (Future)**
- Add database for persistence
- Implement search functionality
- Add analytics dashboard

## 🎯 Next Steps

1. **Add Database Integration**
   - Store applications in database
   - Add admin dashboard
   - Implement search and filtering

2. **Enhance Email Templates**
   - Add company branding
   - Create email templates
   - Add unsubscribe options

3. **Add Analytics**
   - Track form submissions
   - Monitor conversion rates
   - Add user behavior tracking

4. **Implement Notifications**
   - Slack notifications
   - SMS alerts
   - Webhook integrations

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review Netlify function logs
3. Check Cloudflare R2 logs
4. Verify environment variables

---

**Happy coding! 🚀**
