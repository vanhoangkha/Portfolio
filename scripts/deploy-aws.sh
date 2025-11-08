#!/bin/bash

##############################################
# AWS S3 Static Website Deployment Script
# Professional Portfolio Deployment
##############################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="${BUCKET_NAME:-khavan-portfolio-site}"
REGION="${AWS_REGION:-ap-southeast-1}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE_DIR="${SOURCE_DIR:-${PROJECT_ROOT}/apps/web}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Portfolio Deployment to AWS S3${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed${NC}"
    exit 1
fi

# Check AWS credentials
echo -e "${YELLOW}🔐 Checking AWS credentials...${NC}"
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured${NC}"
    exit 1
fi
echo -e "${GREEN}✅ AWS credentials valid${NC}"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}❌ Source directory not found: $SOURCE_DIR${NC}"
    exit 1
fi

# Check if bucket exists
echo -e "${YELLOW}🪣 Checking S3 bucket...${NC}"
if aws s3 ls "s3://${BUCKET_NAME}" 2>&1 | grep -q 'NoSuchBucket'; then
    echo -e "${YELLOW}📦 Creating bucket: ${BUCKET_NAME}${NC}"
    aws s3 mb "s3://${BUCKET_NAME}" --region "${REGION}"
    echo -e "${GREEN}✅ Bucket created${NC}"
else
    echo -e "${GREEN}✅ Bucket exists: ${BUCKET_NAME}${NC}"
fi

# Configure bucket for static website hosting
echo -e "${YELLOW}🌐 Configuring static website hosting...${NC}"
aws s3 website "s3://${BUCKET_NAME}" \
    --index-document index.html \
    --error-document index.html

# Set bucket policy for public read
echo -e "${YELLOW}🔓 Setting bucket policy...${NC}"
cat > /tmp/bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy \
    --bucket "${BUCKET_NAME}" \
    --policy file:///tmp/bucket-policy.json

echo -e "${GREEN}✅ Bucket policy set${NC}"

# Disable block public access
echo -e "${YELLOW}🔓 Configuring public access...${NC}"
aws s3api put-public-access-block \
    --bucket "${BUCKET_NAME}" \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo -e "${GREEN}✅ Public access configured${NC}"

# Sync files to S3
echo -e "${YELLOW}📤 Uploading files to S3...${NC}"
aws s3 sync "${SOURCE_DIR}" "s3://${BUCKET_NAME}" \
    --delete \
    --cache-control "max-age=31536000" \
    --exclude "*.md" \
    --exclude "node_modules/*" \
    --exclude ".git/*" \
    --exclude "docs/*"

# Set specific cache headers for HTML files
echo -e "${YELLOW}⚙️  Setting cache headers for HTML files...${NC}"
aws s3 cp "s3://${BUCKET_NAME}" "s3://${BUCKET_NAME}" \
    --recursive \
    --exclude "*" \
    --include "*.html" \
    --cache-control "max-age=0, no-cache, no-store, must-revalidate" \
    --metadata-directive REPLACE

echo -e "${GREEN}✅ Files uploaded successfully${NC}"

# Get website URL
WEBSITE_URL="http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📍 Website URL:${NC}"
echo -e "   ${WEBSITE_URL}"
echo ""
echo -e "${BLUE}🌐 S3 Console:${NC}"
echo -e "   https://s3.console.aws.amazon.com/s3/buckets/${BUCKET_NAME}"
echo ""
echo -e "${YELLOW}💡 Next Steps:${NC}"
echo -e "   1. Visit your website: ${WEBSITE_URL}"
echo -e "   2. Set up CloudFront CDN for better performance"
echo -e "   3. Configure custom domain (optional)"
echo -e "   4. Enable HTTPS with CloudFront + ACM"
echo ""

# Save deployment info
cat > deployment-info.txt <<EOF
Deployment Information
=====================
Date: $(date)
Bucket: ${BUCKET_NAME}
Region: ${REGION}
Website URL: ${WEBSITE_URL}
Status: Success
EOF

echo -e "${GREEN}📄 Deployment info saved to: deployment-info.txt${NC}"
echo ""
