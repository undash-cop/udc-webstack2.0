#!/bin/bash

# Script to connect Netlify frontend to Cloudflare Worker backend

echo "🔗 Connecting Netlify Frontend to Cloudflare Worker Backend"
echo "=========================================================="

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Deploy Cloudflare Worker
echo "📦 Deploying Cloudflare Worker..."
cd workers
wrangler deploy
WORKER_URL=$(wrangler whoami | grep -o 'https://[^/]*\.workers\.dev' | head -1)
cd ..

if [ -z "$WORKER_URL" ]; then
    echo "❌ Could not determine worker URL. Please check wrangler deployment."
    exit 1
fi

echo "✅ Worker deployed at: $WORKER_URL"

# Update frontend configuration
echo "🔧 Updating frontend configuration..."
sed -i.bak "s|https://udc-applications-worker.your-subdomain.workers.dev|$WORKER_URL|g" src/config/api.ts
echo "✅ Frontend configuration updated with worker URL: $WORKER_URL"

# Build frontend
echo "🏗️  Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully!"
else
    echo "❌ Frontend build failed. Please check for errors."
    exit 1
fi

echo ""
echo "🎉 Connection setup complete!"
echo "============================="
echo ""
echo "📋 Next steps:"
echo "1. Push changes to GitHub:"
echo "   git add . && git commit -m 'Connect to Cloudflare Worker' && git push"
echo ""
echo "2. Deploy to Netlify:"
echo "   - Go to netlify.com"
echo "   - Connect your GitHub repository"
echo "   - Netlify will auto-deploy"
echo ""
echo "3. Update CORS in worker for your Netlify domain:"
echo "   - Edit workers/applications.js"
echo "   - Add your Netlify URL to allowedOrigins"
echo "   - Run: cd workers && wrangler deploy"
echo ""
echo "4. Test the connection:"
echo "   - Visit your Netlify site"
echo "   - Go to /careers"
echo "   - Try submitting a job application"
echo ""
echo "🔗 Your worker URL: $WORKER_URL"
echo "📖 See NETLIFY_CLOUDFLARE_CONNECTION.md for detailed instructions"
