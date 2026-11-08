#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         GITHUB TOKEN SETUP WIZARD                         ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Step 1: Create GitHub Personal Access Token${NC}"
echo "────────────────────────────────────────────────────────────────"
echo ""
echo "1. Open this URL in your browser:"
echo -e "${GREEN}   https://github.com/settings/tokens/new${NC}"
echo ""
echo "2. Fill in the form:"
echo "   • Note: Portfolio Deployment"
echo "   • Expiration: 90 days (or No expiration)"
echo "   • Scopes: repo (full control of private repositories)"
echo ""
echo "3. Click 'Generate token'"
echo ""
echo "4. COPY THE TOKEN (you won't see it again!)"
echo ""
read -p "Press Enter after you've created and copied the token..."

echo ""
echo -e "${BLUE}Step 2: Save Token${NC}"
echo "────────────────────────────────────────────────────────────────"
echo ""
read -p "Paste your GitHub token here: " token

if [ -z "$token" ]; then
    echo -e "${RED}No token provided!${NC}"
    exit 1
fi

# Create credentials file
echo "https://vanhoangkha:${token}@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials

echo -e "${GREEN}Token saved!${NC}"
echo ""

echo -e "${BLUE}Step 3: Test Authentication${NC}"
echo "────────────────────────────────────────────────────────────────"
echo ""
echo "Testing push to GitHub..."

cd /home/ubuntu/Portfolio

# Try to push
git push origin feature/restructure-international-standards 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║     PUSH SUCCESSFUL!                      ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Go to: https://github.com/vanhoangkha/Portfolio"
    echo "2. You'll see option to create Pull Request"
    echo "3. Or run: git checkout master && git merge feature/restructure-international-standards && git push origin master"
    echo "4. Enable GitHub Pages in Settings"
    echo "5. Wait 2-3 minutes"
    echo "6. Visit: https://vanhoangkha.github.io/Portfolio/"
else
    echo ""
    echo -e "${RED}Push failed! Check the error above.${NC}"
    echo ""
    echo "Common issues:"
    echo "- Token doesn't have correct permissions"
    echo "- Token expired"
    echo "- Network issues"
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
