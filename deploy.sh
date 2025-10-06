#!/bin/bash

# 🚀 Netlify Deployment Script
# This script helps you deploy your form submission system to Netlify

echo "🚀 Starting Netlify Deployment Process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Please run: git init"
    exit 1
fi

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  You're on branch '$current_branch'. Consider switching to 'main' for production deployment."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found. Build may have failed."
    exit 1
fi

# Add and commit changes
echo "📝 Committing changes..."
git add .
git commit -m "Deploy: Form submission system with SendGrid and R2"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin $current_branch

if [ $? -ne 0 ]; then
    echo "❌ Failed to push to GitHub. Please check your remote repository."
    exit 1
fi

echo "✅ Code pushed to GitHub successfully!"

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "⚠️  Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Install missing dependencies
echo "📦 Installing Netlify dependencies..."
npm install -g @netlify/edge-functions-bootstrap

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod

if [ $? -ne 0 ]; then
    echo "❌ Netlify CLI deployment failed."
    echo ""
    echo "🔄 Alternative deployment methods:"
    echo "1. GitHub + Netlify Dashboard (Recommended)"
    echo "2. Manual drag & drop deployment"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://netlify.com/"
    echo "2. Click 'New site from Git'"
    echo "3. Connect your GitHub repository"
    echo "4. Set build command: npm run build"
    echo "5. Set publish directory: dist"
    echo "6. Deploy!"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Set up environment variables in Netlify dashboard"
echo "2. Configure Cloudflare R2 credentials"
echo "3. Set up SendGrid API key"
echo "4. Configure server port if needed (default: 3001)"
echo "5. Test your form submission system"
echo ""
echo "📚 Documentation:"
echo "- Setup Guide: SETUP.md"
echo "- SendGrid Setup: SENDGRID-SETUP.md"
echo "- Deployment Guide: NETLIFY-DEPLOYMENT.md"
