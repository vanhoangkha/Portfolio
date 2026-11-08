#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║     PUSH TO GITHUB - INTERACTIVE GUIDE                    ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Current branch:${NC}"
git branch | grep '*'
echo ""

echo -e "${YELLOW}Do you want to:${NC}"
echo "1. Push current branch (feature/restructure-international-standards)"
echo "2. Merge to main and push main"
echo "3. Setup git authentication first"
echo "4. Exit"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo -e "\n${YELLOW}Pushing current branch...${NC}"
        git push origin feature/restructure-international-standards
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Push successful!${NC}"
            echo ""
            echo "Next steps:"
            echo "1. Go to: https://github.com/vanhoangkha/Portfolio"
            echo "2. You'll see a banner to create Pull Request"
            echo "3. Create PR and merge to main"
            echo "4. Or just merge locally with option 2"
        else
            echo -e "${RED}Push failed!${NC}"
            echo "You need to setup git authentication first (option 3)"
        fi
        ;;
    2)
        echo -e "\n${YELLOW}Switching to main...${NC}"
        git checkout main
        echo -e "${YELLOW}Merging feature branch...${NC}"
        git merge feature/restructure-international-standards
        echo -e "${YELLOW}Pushing main...${NC}"
        git push origin main
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Push successful!${NC}"
            echo ""
            echo "Your portfolio will be live in 2-3 minutes at:"
            echo "   https://vanhoangkha.github.io/Portfolio/"
        else
            echo -e "${RED}Push failed!${NC}"
            echo "You need to setup git authentication first (option 3)"
        fi
        ;;
    3)
        echo -e "\n${BLUE}Git Authentication Setup${NC}"
        echo "════════════════════════════════════════════════════════"
        echo ""
        echo "OPTION A: Personal Access Token (Recommended)"
        echo "─────────────────────────────────────────────────────"
        echo "1. Visit: https://github.com/settings/tokens"
        echo "2. Click 'Generate new token (classic)'"
        echo "3. Give it a name: 'Portfolio Deployment'"
        echo "4. Select scope: repo (full control)"
        echo "5. Click 'Generate token'"
        echo "6. COPY THE TOKEN (you won't see it again!)"
        echo ""
        echo "Then run:"
        echo "  git config --global credential.helper store"
        echo "  git push origin <branch>"
        echo ""
        echo "When prompted:"
        echo "  Username: vanhoangkha"
        echo "  Password: <paste your token>"
        echo ""
        read -p "Press Enter after you've created the token..."
        
        git config --global credential.helper store
        echo -e "${GREEN}Credential helper configured!${NC}"
        echo ""
        echo "Now run this script again and choose option 1 or 2"
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice!${NC}"
        ;;
esac

echo ""
echo "════════════════════════════════════════════════════════"
echo "For detailed instructions, read: GITHUB_PAGES_DEPLOY.md"
echo "════════════════════════════════════════════════════════"

