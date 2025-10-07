#!/bin/bash

# Cloudflare Workers Setup Script
# This script helps you set up the Cloudflare Worker for your job application system

echo "🚀 Setting up Cloudflare Workers for UDC Webstack 2.0"
echo "=================================================="

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
else
    echo "✅ Wrangler CLI found"
fi

# Install worker dependencies
echo "📦 Installing worker dependencies..."
cd workers
npm install

# Check if user is logged in
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "Please log in to Cloudflare:"
    wrangler login
fi

echo ""
echo "📋 Next steps:"
echo "1. Set up R2 bucket:"
echo "   - Go to Cloudflare Dashboard → R2 Object Storage"
echo "   - Create bucket named 'resumes'"
echo "   - Note your Account ID"
echo ""
echo "2. Set environment variables:"
echo "   wrangler secret put R2_ACCOUNT_ID"
echo "   wrangler secret put R2_ACCESS_KEY_ID"
echo "   wrangler secret put R2_SECRET_ACCESS_KEY"
echo "   wrangler secret put R2_PUBLIC_URL"
echo ""
echo "3. Deploy the worker:"
echo "   wrangler deploy"
echo ""
echo "4. Test locally:"
echo "   wrangler dev"
echo ""
echo "5. Update frontend config with your worker URL"
echo ""
echo "📖 See CLOUDFLARE_DEPLOYMENT.md for detailed instructions"
