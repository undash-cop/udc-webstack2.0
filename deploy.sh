#!/bin/bash

# Deployment script for Netlify Frontend + Cloudflare Workers Backend

echo "🚀 Starting deployment process..."
echo "=================================="

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Deploy Cloudflare Worker (Backend)
echo "📦 Deploying Cloudflare Worker..."
cd workers
wrangler deploy
WORKER_URL=$(wrangler whoami | grep -o 'https://[^/]*\.workers\.dev' | head -1)
cd ..

echo "✅ Worker deployed at: $WORKER_URL"

# Update frontend configuration with worker URL
echo "🔧 Updating frontend configuration..."
if [ ! -z "$WORKER_URL" ]; then
    # Update the API configuration with the actual worker URL
    sed -i.bak "s|https://udc-applications-worker.your-subdomain.workers.dev|$WORKER_URL|g" src/config/api.ts
    echo "✅ Frontend configuration updated with worker URL: $WORKER_URL"
else
    echo "⚠️  Could not determine worker URL. Please update src/config/api.ts manually."
fi

# Build frontend
echo "🏗️  Building frontend..."
npm run build

echo "✅ Frontend built successfully!"

echo ""
echo "🎉 Deployment complete!"
echo "======================"
echo "Backend (Cloudflare Worker): $WORKER_URL"
echo "Frontend: Ready for Netlify deployment"
echo ""
echo "Next steps:"
echo "1. Push changes to GitHub: git add . && git commit -m 'Deploy to production' && git push"
echo "2. Deploy to Netlify (if not auto-deployed)"
echo "3. Update CORS in worker if needed"
echo "4. Test the full application"
