#!/bin/bash

# Node.js 22 Upgrade Script for Undash-cop Project
# This script helps upgrade to Node.js 22 for optimal performance

echo "🚀 Node.js 22 Upgrade Script for Undash-cop Project"
echo "=================================================="

# Check if NVM is installed
if ! command -v nvm &> /dev/null; then
    echo "❌ NVM is not installed. Please install NVM first:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "   Then restart your terminal and run this script again."
    exit 1
fi

echo "✅ NVM found"

# Check current Node.js version
CURRENT_NODE=$(node --version 2>/dev/null || echo "not installed")
echo "📋 Current Node.js version: $CURRENT_NODE"

# Install Node.js 22 if not already installed
echo "🔧 Installing Node.js 22..."
nvm install 22

# Use Node.js 22
echo "🔄 Switching to Node.js 22..."
nvm use 22

# Verify installation
NEW_NODE=$(node --version)
echo "✅ New Node.js version: $NEW_NODE"

# Check if upgrade was successful
if [[ $NEW_NODE == v22* ]]; then
    echo "🎉 Successfully upgraded to Node.js 22!"
    
    # Install project dependencies
    echo "📦 Installing project dependencies..."
    npm install
    
    # Run version check
    echo "🔍 Running Node.js version check..."
    npm run check:node
    
    # Set Node.js 22 as default (optional)
    read -p "🤔 Set Node.js 22 as default? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        nvm alias default 22
        echo "✅ Node.js 22 set as default"
    fi
    
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Run 'npm run dev' to start development"
    echo "   2. Run 'npm run build' to test production build"
    echo "   3. Check out NODE_UPGRADE.md for more details"
    
else
    echo "❌ Failed to upgrade to Node.js 22"
    echo "   Please check the NODE_UPGRADE.md guide for manual steps"
    exit 1
fi
