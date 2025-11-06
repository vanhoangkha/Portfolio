#!/bin/bash

# ============================================
# CloudFront Status Checker
# ============================================

DISTRIBUTION_ID="E3MOVOLQCJX2X4"
CLOUDFRONT_URL="https://d1pas1x9m16mj0.cloudfront.net"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "============================================"
echo "   CloudFront Deployment Status"
echo "============================================"
echo ""

# Check distribution status
echo -e "${BLUE}Distribution ID:${NC} $DISTRIBUTION_ID"
echo -e "${BLUE}CloudFront URL:${NC} $CLOUDFRONT_URL"
echo ""

STATUS=$(aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.Status' --output text 2>/dev/null)

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Error checking status. Please verify AWS credentials.${NC}"
    exit 1
fi

echo -e "${BLUE}Deployment Status:${NC} $STATUS"
echo ""

if [ "$STATUS" = "Deployed" ]; then
    echo -e "${GREEN}✓ CloudFront distribution is deployed and ready!${NC}"
    echo ""
    echo "Testing HTTPS connection..."

    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 $CLOUDFRONT_URL 2>/dev/null)

    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✓ Website is accessible via HTTPS${NC}"
        echo ""
        echo "You can now access your portfolio at:"
        echo -e "${GREEN}$CLOUDFRONT_URL${NC}"
    else
        echo -e "${YELLOW}⚠ Got HTTP $HTTP_CODE. Please wait a few more minutes.${NC}"
    fi
else
    echo -e "${YELLOW}⏳ Distribution is still deploying...${NC}"
    echo ""
    echo "This typically takes 15-20 minutes."
    echo "Run this script again in a few minutes to check the status."
    echo ""
    echo "Command: ./check-cloudfront.sh"
fi

echo ""
echo "============================================"
