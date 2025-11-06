#!/bin/bash

# ============================================
# Quick S3 Update Script
# For updating existing S3 deployment
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

# Configuration
BUCKET_NAME="${1:-}"
PROFILE="${AWS_PROFILE:-default}"

if [ -z "$BUCKET_NAME" ]; then
    echo "Usage: ./update-s3.sh <bucket-name>"
    echo "Example: ./update-s3.sh khavan-portfolio"
    exit 1
fi

print_info "Updating S3 bucket: $BUCKET_NAME"

# Sync files
print_info "Syncing files..."

aws s3 sync . "s3://$BUCKET_NAME" \
    --profile $PROFILE \
    --delete \
    --exclude ".git/*" \
    --exclude ".gitignore" \
    --exclude "*.sh" \
    --exclude "*.md" \
    --exclude "node_modules/*"

# Set proper content types and cache control
print_info "Setting content types..."

# HTML - short cache
aws s3 cp . "s3://$BUCKET_NAME" \
    --recursive \
    --exclude "*" \
    --include "*.html" \
    --content-type "text/html" \
    --cache-control "public, max-age=300" \
    --metadata-directive REPLACE \
    --profile $PROFILE

# CSS - long cache
aws s3 cp . "s3://$BUCKET_NAME" \
    --recursive \
    --exclude "*" \
    --include "*.css" \
    --content-type "text/css" \
    --cache-control "public, max-age=31536000" \
    --metadata-directive REPLACE \
    --profile $PROFILE

# JS - long cache
aws s3 cp . "s3://$BUCKET_NAME" \
    --recursive \
    --exclude "*" \
    --include "*.js" \
    --content-type "application/javascript" \
    --cache-control "public, max-age=31536000" \
    --metadata-directive REPLACE \
    --profile $PROFILE

# JSON - long cache
aws s3 cp . "s3://$BUCKET_NAME" \
    --recursive \
    --exclude "*" \
    --include "*.json" \
    --content-type "application/json" \
    --cache-control "public, max-age=31536000" \
    --metadata-directive REPLACE \
    --profile $PROFILE

print_success "S3 bucket updated successfully!"

# Optional CloudFront invalidation
print_info "Do you want to invalidate CloudFront cache? (y/n)"
read -r INVALIDATE

if [ "$INVALIDATE" = "y" ]; then
    print_info "Enter CloudFront Distribution ID:"
    read -r DIST_ID

    aws cloudfront create-invalidation \
        --distribution-id $DIST_ID \
        --paths "/*" \
        --profile $PROFILE

    print_success "CloudFront cache invalidated"
fi

echo ""
print_success "Update completed!"
echo "Website: http://${BUCKET_NAME}.s3-website-ap-southeast-1.amazonaws.com"
