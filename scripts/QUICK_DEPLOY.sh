#!/bin/bash

echo "========================================="
echo "🚀 PORTFOLIO QUICK DEPLOY SCRIPT"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Select deployment option:${NC}"
echo ""
echo "1. Deploy to AWS Amplify (Full-stack)"
echo "2. Start Local Development Server"
echo "3. Deploy Backend Only"
echo "4. Deploy Frontend Only"
echo "5. Check Deployment Status"
echo "6. View Production URL"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo -e "\n${YELLOW}📦 Deploying Full-Stack to AWS...${NC}"
        git add .
        git status
        read -p "Commit message: " message
        git commit -m "$message"
        git push origin master
        echo -e "${GREEN}✅ Pushed to GitHub! CI/CD will deploy automatically.${NC}"
        echo "Monitor at: https://github.com/vanhoangkha/Portfolio/actions"
        ;;
    2)
        echo -e "\n${YELLOW}🖥️  Starting Local Development Server...${NC}"
        echo "Server will run on http://localhost:3000"
        echo "Press Ctrl+C to stop"
        python3 -m http.server 3000
        ;;
    3)
        echo -e "\n${YELLOW}☁️  Deploying Backend...${NC}"
        cd infrastructure/amplify
        npx ampx pipeline-deploy --branch master --app-id dzecmyr42457
        ;;
    4)
        echo -e "\n${YELLOW}🎨 Deploying Frontend Only...${NC}"
        aws amplify start-job \
          --app-id dzecmyr42457 \
          --branch-name master \
          --job-type RELEASE
        echo -e "${GREEN}✅ Frontend deployment started!${NC}"
        ;;
    5)
        echo -e "\n${BLUE}📊 Checking Deployment Status...${NC}"
        echo ""
        echo "Production URL:"
        curl -I https://master.dzecmyr42457.amplifyapp.com 2>&1 | head -1
        echo ""
        echo "Local Servers:"
        lsof -i :3000 2>/dev/null | grep LISTEN && echo "  ✅ Port 3000: Running" || echo "  ❌ Port 3000: Not running"
        lsof -i :8000 2>/dev/null | grep LISTEN && echo "  ✅ Port 8000: Running" || echo "  ❌ Port 8000: Not running"
        ;;
    6)
        echo -e "\n${GREEN}🌐 Production URLs:${NC}"
        echo ""
        echo "Frontend: https://master.dzecmyr42457.amplifyapp.com"
        echo "Backend:  https://3pnzpjip2bcilanfdfi5h4xbxa.appsync-api.us-east-1.amazonaws.com/graphql"
        echo ""
        echo "Opening in browser..."
        which xdg-open > /dev/null && xdg-open https://master.dzecmyr42457.amplifyapp.com
        ;;
    *)
        echo -e "${YELLOW}Invalid choice!${NC}"
        ;;
esac

echo ""
echo "========================================="
