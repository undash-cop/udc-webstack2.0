# Undash-cop Website

A modern, high-performance website for Undash-cop Private Limited built with React, TypeScript, and Cloudflare Workers.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn
- Git

### Installation
```bash
# Clone and install dependencies
git clone <repository-url>
cd udc-webstack2.0
npm install
npm run install:worker
```

### Development
```bash
# Start frontend only
npm run dev

# Start frontend + backend
npm run dev:full
```

**Access**: http://localhost:5173

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Cloudflare Workers, R2 Storage, SendGrid
- **Performance**: Code splitting, image optimization, service worker
- **Features**: PWA, SEO optimized, mobile-first design

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:optimized` | Build with optimizations |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run clean` | Clean build artifacts |
| `npm run worker:dev` | Start worker locally |
| `npm run worker:deploy` | Deploy worker to Cloudflare |

## 🚀 Deployment

### Netlify (Recommended)
1. **Connect Repository**: Link your GitHub repo to Netlify
2. **Set Environment Variables**:
   ```bash
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   VITE_HUBSPOT_PORTAL_ID=********
   VITE_HUBSPOT_CONTACT_FORM_ID=**************
   VITE_APP_BASE_URL=https://undash-cop.com
   ```
3. **Deploy**: Automatic deployment on push to main branch

### Other Platforms
- **Vercel**: Connect repository or upload `dist/` folder
- **Cloudflare Pages**: Connect repository
- **Manual**: Upload `dist/` folder to any static hosting

### Backend (Optional)
```bash
# Deploy Cloudflare Worker
npm run worker:deploy
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` for local development:

```bash
# Application
VITE_APP_BASE_URL=http://localhost:5173
VITE_APP_ENV=development

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# HubSpot Integration
VITE_HUBSPOT_PORTAL_ID=********
VITE_HUBSPOT_CONTACT_FORM_ID=**************

# API Configuration
VITE_API_BASE_URL=http://localhost:8787/api
```

### Cloudflare Workers Setup
1. **Install Wrangler**: `npm install -g wrangler`
2. **Login**: `wrangler login`
3. **Set Secrets**:
   ```bash
   cd workers
   wrangler secret put R2_ACCOUNT_ID
   wrangler secret put R2_ACCESS_KEY_ID
   wrangler secret put R2_SECRET_ACCESS_KEY
   wrangler secret put R2_PUBLIC_URL
   wrangler secret put SENDGRID_API_KEY
   ```

## 📊 Performance

This website is optimized for high performance:

- **Mobile Performance**: 85-90+ PageSpeed score
- **Bundle Size**: 247KB main bundle (77KB gzipped)
- **Code Splitting**: Automatic chunk splitting
- **Image Optimization**: WebP format with lazy loading
- **Caching**: Service worker for offline support

## 🔒 Security

- **File Upload Validation**: PDF, DOC, DOCX only
- **File Size Limits**: 5MB maximum
- **CORS Protection**: Configured for production domains
- **Environment Variables**: Secure secret management

## 📁 Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Application pages
│   ├── layouts/          # Layout components
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React contexts
│   ├── data/             # Static data files
│   ├── styles/           # CSS and styling
│   └── utils/            # Utility functions
├── workers/              # Cloudflare Workers backend
├── public/               # Static assets
├── dist/                 # Build output
├── netlify.toml          # Netlify configuration
├── wrangler.toml         # Cloudflare Workers config
└── package.json          # Dependencies and scripts
```

## 🌐 API Endpoints

- `GET /api/health` - Health check
- `POST /api/applications` - Submit job application
- `POST /api/applications/json` - Submit application data

## 🔧 Troubleshooting

### Common Issues

**Node.js Version**
```bash
# Check version (should be 20.19+ or 22.12+)
node --version
```

**Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build:optimized
```

**Worker Issues**
```bash
# Check wrangler installation
wrangler --version

# Reinstall if needed
npm install -g wrangler
```

## 📈 Monitoring

- **Performance Tracking**: Core Web Vitals monitoring
- **Error Tracking**: Built-in error reporting
- **Analytics**: Google Analytics integration
- **Worker Logs**: Real-time Cloudflare Workers logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software of Undash-cop Private Limited.

## 📞 Support

For support and questions:
- Email: support@undash-cop.com
- Website: https://undash-cop.com

---

**Built with ❤️ by Undash-cop Private Limited**