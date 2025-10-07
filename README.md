# Undash-cop Website

A modern, high-performance website for Undash-cop Private Limited built with React, TypeScript, and Cloudflare Workers.

## 🚀 Quick Start

### Prerequisites
- **Node.js 22+** (see [NODE_UPGRADE.md](./NODE_UPGRADE.md) for upgrade guide)
- npm 10+ or yarn
- Git

### Installation
```bash
# Clone and install dependencies
git clone <repository-url>
cd udc-webstack2.0

# Upgrade to Node.js 22 (if needed)
npm run upgrade:node22

# Install dependencies
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

### Development
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run dev:full` | Start both frontend and backend |
| `npm run preview` | Preview production build |
| `npm run start` | Build and preview |

### Building
| Command | Description |
|---------|-------------|
| `npm run build` | Build for development |
| `npm run build:production` | Build with all optimizations (images, sitemap, etc.) |
| `npm run build:analyze` | Build and analyze bundle size |
| `npm run build:analyze-size` | Build and check bundle sizes (< 100KB) |
| `npm run analyze:bundle` | Analyze current bundle sizes |

### Code Quality
| Command | Description |
|---------|-------------|
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run tests |

### Deployment
| Command | Description |
|---------|-------------|
| `npm run deploy` | Deploy everything (frontend + backend) |
| `npm run deploy:frontend` | Deploy frontend only |
| `npm run deploy:backend` | Deploy backend only |

### Worker (Cloudflare)
| Command | Description |
|---------|-------------|
| `npm run worker:dev` | Start worker locally |
| `npm run worker:deploy` | Deploy worker to Cloudflare |
| `npm run worker:tail` | Tail worker logs |
| `npm run worker:test` | Test worker |
| `npm run worker:install` | Install worker dependencies |

### Utilities
| Command | Description |
|---------|-------------|
| `npm run clean` | Clean build artifacts |
| `npm run check:node` | Check Node.js version |
| `npm run upgrade:node22` | Upgrade to Node.js 22 |
| `npm run optimize:images` | Optimize images |
| `npm run generate:sitemap` | Generate sitemap |

## 🚀 Performance

### Bundle Size Optimization
- **Target**: < 100KB per JavaScript file
- **Total Bundle**: < 200KB initial load
- **Code Splitting**: Intelligent chunking by vendor and page
- **Tree Shaking**: Dead code elimination
- **Lazy Loading**: Heavy components loaded on demand

### Performance Monitoring
```bash
# Check bundle sizes
npm run build:analyze-size

# Analyze current build
npm run analyze:bundle
```

### Performance Features
- **Aggressive Minification**: Terser with multiple passes
- **Modern JavaScript**: ES2020 target for smaller bundles
- **Asset Optimization**: Inline assets under 8KB
- **Image Optimization**: WebP conversion and compression
- **Critical CSS**: Inline critical styles

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