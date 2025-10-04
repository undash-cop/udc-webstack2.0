# 🚀 Deployment Guide for Undash Cop Website

This guide covers deploying the Undash Cop website to Netlify with all necessary configurations for SEO, performance, and functionality.

## 📋 Prerequisites

- Netlify account
- GitHub repository with your code
- Domain name (optional, Netlify provides free subdomain)

## 🔧 Environment Variables Setup

### Required Environment Variables

Set these in your Netlify dashboard under **Site Settings > Environment Variables**:

```bash
# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# HubSpot Integration
VITE_HUBSPOT_PORTAL_ID=********
VITE_HUBSPOT_CONTACT_FORM_ID=**************
VITE_HUBSPOT_JOB_FORM_ID=***************

# Application
VITE_APP_BASE_URL=https://undash-cop.com
VITE_APP_ENV=production
```

### Optional Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=https://api.your-domain.com

# Email Services
VITE_EMAIL_API_KEY=your_email_api_key
VITE_EMAIL_PROVIDER=sendgrid

# Database
VITE_DATABASE_URL=your_database_url
VITE_DATABASE_TYPE=postgresql

# Security
VITE_JWT_SECRET=your_jwt_secret
VITE_ENCRYPTION_KEY=your_encryption_key

# Social Media
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id

# Cloud Services
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## 🌐 Netlify Configuration

The `netlify.toml` file includes:

### ✅ Build Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 20

### ✅ Redirects & Routing
- SPA routing support for React Router
- SEO-friendly redirects
- HTTPS enforcement
- www redirects
- Trailing slash handling

### ✅ Security Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

### ✅ Caching Strategy
- Static assets: 1 year cache
- HTML files: No cache (for updates)
- Images: 1 year cache
- Fonts: 1 year cache
- CSS/JS: 1 year cache

### ✅ SEO Optimization
- Page-specific meta tags
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data support

## 🚀 Deployment Steps

### 1. Connect Repository
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Select the repository

### 2. Configure Build Settings
- **Build Command**: `npm install --force && npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 20

**Note**: The `--force` flag is used to resolve React 19 compatibility issues with `react-helmet-async`.

### 3. Set Environment Variables
1. Go to **Site Settings > Environment Variables**
2. Add all required variables from the list above
3. Make sure to replace placeholder values with actual ones

### 4. Deploy
1. Click "Deploy site"
2. Wait for build to complete
3. Test the deployed site

### 5. Custom Domain (Optional)
1. Go to **Domain Settings**
2. Add your custom domain
3. Configure DNS records as instructed
4. Enable HTTPS (automatic with Netlify)

## 🔍 Post-Deployment Checklist

### ✅ Functionality Tests
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Contact forms submit successfully
- [ ] Download buttons work
- [ ] Search functionality works
- [ ] Mobile responsiveness

### ✅ SEO Tests
- [ ] Meta tags are present
- [ ] Open Graph tags work
- [ ] Sitemap is accessible (`/sitemap.xml`)
- [ ] Robots.txt is accessible (`/robots.txt`)
- [ ] Canonical URLs are correct
- [ ] No broken links

### ✅ Performance Tests
- [ ] Lighthouse score > 90
- [ ] Images are optimized
- [ ] CSS/JS are minified
- [ ] Caching headers are set
- [ ] Gzip compression is enabled

### ✅ Security Tests
- [ ] HTTPS is enforced
- [ ] Security headers are present
- [ ] CSP is working
- [ ] No mixed content warnings

## 🛠️ Troubleshooting

### Common Issues

#### Build Fails
- Check Node.js version (should be 20)
- Verify all dependencies are in package.json
- Check for TypeScript errors
- Ensure environment variables are set

#### React 19 Dependency Conflicts
If you encounter `ERESOLVE` errors with React 19 and `react-helmet-async`:
- The `--force` flag is already configured in the build command
- This resolves peer dependency conflicts between React 19 and older packages
- The application will work correctly despite the warnings

#### Build Command Override Issues
If the build command in `netlify.toml` is being overridden:
1. Check Netlify Dashboard > Site Settings > Build & Deploy > Build Settings
2. Ensure "Build command" is set to: `npm install --force && npm run build`
3. Or leave it empty to use the command from `netlify.toml`
4. Make sure "Publish directory" is set to: `dist`

#### TypeScript Not Found Error
If you see `tsc: not found` error:
- TypeScript is now moved to dependencies (not devDependencies)
- This ensures it's available during the build process
- The build command includes `npm install --force` to install all dependencies

#### TypeScript Declaration Errors
If you see errors like "Could not find a declaration file for module 'react-dom/client'":
- `@types/react` and `@types/react-dom` are now in dependencies
- `@vitejs/plugin-react` is now in dependencies
- These packages are needed for TypeScript compilation during build
- All TypeScript-related packages are available during the build process

#### Forms Not Working
- Verify HubSpot credentials
- Check form IDs are correct
- Ensure CSP allows HubSpot scripts

#### SEO Issues
- Verify meta tags in page source
- Check canonical URLs
- Ensure sitemap is accessible
- Test with Google Search Console

#### Performance Issues
- Check image optimization
- Verify caching headers
- Use Netlify's built-in optimization
- Consider CDN for static assets

### Debug Mode
To enable debug mode, set:
```bash
VITE_DEBUG=true
VITE_APP_ENV=development
```

## 📊 Monitoring & Analytics

### Google Analytics
- Set up GA4 property
- Add tracking ID to environment variables
- Verify events are firing correctly

### Netlify Analytics
- Enable in Netlify dashboard
- Monitor site performance
- Track form submissions

### Error Monitoring
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor 404 errors
- Track JavaScript errors

## 🔄 Continuous Deployment

### Automatic Deploys
- Push to main branch triggers deploy
- Preview deploys for pull requests
- Branch-specific environment variables

### Manual Deploys
- Trigger from Netlify dashboard
- Deploy specific commits
- Rollback to previous versions

## 📈 Performance Optimization

### Netlify Features
- **Image Optimization**: Automatic image compression
- **Edge Functions**: Serverless functions at the edge
- **Split Testing**: A/B testing capabilities
- **Form Handling**: Built-in form processing

### Additional Optimizations
- **CDN**: Global content delivery
- **Compression**: Gzip/Brotli compression
- **Minification**: CSS/JS minification
- **Tree Shaking**: Remove unused code

## 🆘 Support

For deployment issues:
1. Check Netlify build logs
2. Verify environment variables
3. Test locally with production settings
4. Contact Netlify support if needed

For application issues:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Test with different browsers
4. Check network requests in DevTools

---

**Note**: Remember to replace `your-domain.com` with your actual domain name in all configuration files before deploying.
