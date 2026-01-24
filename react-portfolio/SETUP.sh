#!/bin/bash

echo "🚀 Setting up React Portfolio..."
echo ""

# Check Node version
echo "✓ Node version: $(node --version)"
echo "✓ NPM version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. npm run dev     - Start development server"
echo "  2. npm run build   - Build for production"
echo "  3. npm test        - Run tests"
echo ""
