#!/bin/bash

# Complete setup script for Netlify + Cloudflare Workers deployment

echo "🚀 Setting up Netlify + Cloudflare Workers deployment"
echo "====================================================="

# Check if required tools are installed
echo "🔍 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

# Check git
if ! command -v git &> /dev/null; then
    echo "❌ git not found. Please install git first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
npm run install:worker

# Install Wrangler CLI
echo "🔧 Installing Wrangler CLI..."
npm install -g wrangler

echo ""
echo "🎯 Next steps:"
echo "=============="
echo ""
echo "1. 🔐 Login to Cloudflare:"
echo "   wrangler login"
echo ""
echo "2. 🗄️  Set up R2 storage:"
echo "   - Go to Cloudflare Dashboard → R2 Object Storage"
echo "   - Create bucket named 'resumes'"
echo "   - Create API token with R2 permissions"
echo "   - Note your Account ID"
echo ""
echo "3. 🔑 Configure worker secrets:"
echo "   cd workers"
echo "   wrangler secret put R2_ACCOUNT_ID"
echo "   wrangler secret put R2_ACCESS_KEY_ID"
echo "   wrangler secret put R2_SECRET_ACCESS_KEY"
echo "   wrangler secret put R2_PUBLIC_URL"
echo "   wrangler secret put SENDGRID_API_KEY"
echo "   cd .."
echo ""
echo "4. 🚀 Deploy worker:"
echo "   npm run worker:deploy"
echo ""
echo "5. 🌐 Deploy frontend to Netlify:"
echo "   - Push code to GitHub"
echo "   - Connect repository to Netlify"
echo "   - Netlify will auto-deploy from netlify.toml"
echo ""
echo "6. 🔗 Update CORS (if needed):"
echo "   - Update worker CORS for your Netlify domain"
echo "   - Redeploy worker"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🎉 Setup complete! Ready for deployment."
