#!/bin/bash

echo "🧹 Cleaning up project - Focus on Amplify only"
echo ""

# Remove old backend (Express + PostgreSQL)
echo "❌ Removing old Express backend..."
rm -rf backend/

# Remove old deployment configs
echo "❌ Removing old deployment configs..."
rm -rf config/

# Remove old deployment scripts
echo "❌ Removing old deployment scripts..."
rm -f scripts/deploy-s3.sh
rm -f scripts/update-s3.sh
rm -f scripts/check-cloudfront.sh
rm -f deploy-aws.sh
rm -f push-to-codecommit.sh
rm -f upload_to_amplify.py

# Remove temporary files
echo "❌ Removing temporary files..."
rm -f deployment-info.txt
rm -f portfolio-frontend.zip
rm -f /tmp/portfolio-deploy.zip
rm -f /tmp/portfolio-code.tar.gz

# Remove redundant documentation
echo "❌ Removing redundant docs..."
rm -f AMPLIFY_SETUP.md
rm -f CODECOMMIT_DEPLOYMENT.md
rm -f GITHUB_CONNECTION_GUIDE.md
rm -f PRODUCTION_DEPLOYMENT.md
rm -f UPLOAD_GUIDE.md
rm -f FINAL_DEPLOYMENT_GUIDE.md

# Move important docs to docs/ folder
echo "📁 Organizing documentation..."
mkdir -p docs/archive
mv REFACTOR_SUMMARY.md docs/archive/ 2>/dev/null || true

# Keep only essential docs
echo "✅ Keeping essential docs:"
echo "   - README.md"
echo "   - AWS_AMPLIFY_FULLSTACK_PLAN.md"
echo "   - AMPLIFY_IMPLEMENTATION.md"
echo "   - GITHUB_TOKEN_DEPLOY.md"
echo "   - docs/"

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📦 Final structure:"
echo "   amplify/          - Amplify Gen 2 backend"
echo "   frontend/         - Website files"
echo "   docs/             - Documentation"
echo "   package.json      - Dependencies"
echo "   amplify.yml       - Build config"
echo "   README.md         - Main readme"
echo ""
