#!/bin/bash

# ============================================
# AWS S3 + CloudFront Deployment Script
# Portfolio Website Deployment
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="${BUCKET_NAME:-}"
REGION="${AWS_REGION:-ap-southeast-1}"
PROFILE="${AWS_PROFILE:-default}"

# Functions
print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

# Check if AWS CLI is installed
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first."
        echo "Install: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi
    print_success "AWS CLI is installed"
}

# Check AWS credentials
check_aws_credentials() {
    if ! aws sts get-caller-identity --profile $PROFILE &> /dev/null; then
        print_error "AWS credentials not configured for profile: $PROFILE"
        echo "Run: aws configure --profile $PROFILE"
        exit 1
    fi

    ACCOUNT_ID=$(aws sts get-caller-identity --profile $PROFILE --query Account --output text)
    print_success "AWS credentials configured (Account: $ACCOUNT_ID)"
}

# Get or create bucket name
get_bucket_name() {
    if [ -z "$BUCKET_NAME" ]; then
        print_info "Enter your S3 bucket name (e.g., khavan-portfolio):"
        read -r BUCKET_NAME
    fi

    # Validate bucket name
    if [[ ! $BUCKET_NAME =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]]; then
        print_error "Invalid bucket name. Must be lowercase, alphanumeric, and hyphens only."
        exit 1
    fi

    print_info "Using bucket: $BUCKET_NAME"
}

# Create S3 bucket
create_bucket() {
    print_info "Creating S3 bucket: $BUCKET_NAME..."

    if aws s3 ls "s3://$BUCKET_NAME" --profile $PROFILE 2>&1 | grep -q 'NoSuchBucket'; then
        if [ "$REGION" = "us-east-1" ]; then
            aws s3api create-bucket \
                --bucket $BUCKET_NAME \
                --profile $PROFILE \
                --region $REGION
        else
            aws s3api create-bucket \
                --bucket $BUCKET_NAME \
                --profile $PROFILE \
                --region $REGION \
                --create-bucket-configuration LocationConstraint=$REGION
        fi
        print_success "Bucket created successfully"
    else
        print_warning "Bucket already exists"
    fi
}

# Configure bucket for static website hosting
configure_static_website() {
    print_info "Configuring static website hosting..."

    aws s3 website "s3://$BUCKET_NAME" \
        --index-document index.html \
        --error-document index.html \
        --profile $PROFILE

    print_success "Static website hosting configured"
}

# Set bucket policy for public access
set_bucket_policy() {
    print_info "Setting bucket policy for public access..."

    # Remove block public access
    aws s3api put-public-access-block \
        --bucket $BUCKET_NAME \
        --public-access-block-configuration \
        "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
        --profile $PROFILE

    # Create bucket policy
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
        --bucket $BUCKET_NAME \
        --policy file:///tmp/bucket-policy.json \
        --profile $PROFILE

    rm /tmp/bucket-policy.json
    print_success "Bucket policy configured"
}

# Upload files to S3
upload_files() {
    print_info "Uploading files to S3..."

    # Sync files with cache control
    aws s3 sync . "s3://$BUCKET_NAME" \
        --profile $PROFILE \
        --exclude ".git/*" \
        --exclude ".gitignore" \
        --exclude "deploy-*.sh" \
        --exclude "*.md" \
        --exclude "node_modules/*" \
        --cache-control "public, max-age=31536000" \
        --metadata-directive REPLACE

    # HTML files with shorter cache
    aws s3 sync . "s3://$BUCKET_NAME" \
        --profile $PROFILE \
        --exclude "*" \
        --include "*.html" \
        --cache-control "public, max-age=300" \
        --content-type "text/html" \
        --metadata-directive REPLACE

    # CSS files
    aws s3 sync . "s3://$BUCKET_NAME" \
        --profile $PROFILE \
        --exclude "*" \
        --include "*.css" \
        --cache-control "public, max-age=31536000" \
        --content-type "text/css" \
        --metadata-directive REPLACE

    # JS files
    aws s3 sync . "s3://$BUCKET_NAME" \
        --profile $PROFILE \
        --exclude "*" \
        --include "*.js" \
        --cache-control "public, max-age=31536000" \
        --content-type "application/javascript" \
        --metadata-directive REPLACE

    # JSON files
    aws s3 sync . "s3://$BUCKET_NAME" \
        --profile $PROFILE \
        --exclude "*" \
        --include "*.json" \
        --cache-control "public, max-age=31536000" \
        --content-type "application/json" \
        --metadata-directive REPLACE

    # PDF files
    aws s3 sync . "s3://$BUCKET_NAME" \
        --profile $PROFILE \
        --exclude "*" \
        --include "*.pdf" \
        --cache-control "public, max-age=31536000" \
        --content-type "application/pdf" \
        --metadata-directive REPLACE

    print_success "Files uploaded successfully"
}

# Create CloudFront distribution
create_cloudfront() {
    print_info "Do you want to create CloudFront distribution for HTTPS and CDN? (y/n)"
    read -r CREATE_CF

    if [ "$CREATE_CF" != "y" ]; then
        print_warning "Skipping CloudFront creation"
        return
    fi

    print_info "Creating CloudFront distribution..."

    WEBSITE_ENDPOINT="${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"

    cat > /tmp/cloudfront-config.json <<EOF
{
    "CallerReference": "$(date +%s)",
    "Comment": "Portfolio Website CDN",
    "Enabled": true,
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-${BUCKET_NAME}",
                "DomainName": "${WEBSITE_ENDPOINT}",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "DefaultRootObject": "index.html",
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-${BUCKET_NAME}",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true
    },
    "PriceClass": "PriceClass_100",
    "ViewerCertificate": {
        "CloudFrontDefaultCertificate": true
    },
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    }
}
EOF

    DISTRIBUTION_ID=$(aws cloudfront create-distribution \
        --distribution-config file:///tmp/cloudfront-config.json \
        --profile $PROFILE \
        --query 'Distribution.Id' \
        --output text)

    rm /tmp/cloudfront-config.json

    print_success "CloudFront distribution created: $DISTRIBUTION_ID"
    print_info "Distribution is being deployed. This may take 15-20 minutes."

    # Get CloudFront domain
    CF_DOMAIN=$(aws cloudfront get-distribution \
        --id $DISTRIBUTION_ID \
        --profile $PROFILE \
        --query 'Distribution.DomainName' \
        --output text)

    print_success "CloudFront domain: https://$CF_DOMAIN"
}

# Invalidate CloudFront cache
invalidate_cloudfront() {
    print_info "Do you want to invalidate CloudFront cache? (y/n)"
    read -r INVALIDATE

    if [ "$INVALIDATE" != "y" ]; then
        return
    fi

    print_info "Enter CloudFront Distribution ID:"
    read -r DIST_ID

    aws cloudfront create-invalidation \
        --distribution-id $DIST_ID \
        --paths "/*" \
        --profile $PROFILE

    print_success "Cache invalidation created"
}

# Display URLs
display_urls() {
    echo ""
    echo "============================================"
    print_success "Deployment completed successfully!"
    echo "============================================"
    echo ""
    echo "🌐 Website URLs:"
    echo "   S3 Website: http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"
    echo ""
    echo "📝 Next Steps:"
    echo "   1. Test your website at the S3 URL above"
    echo "   2. (Optional) Create CloudFront distribution for HTTPS"
    echo "   3. (Optional) Configure custom domain with Route53"
    echo "   4. (Optional) Add SSL certificate with ACM"
    echo ""
    echo "🔄 To update your site, run this script again"
    echo ""
}

# Main execution
main() {
    echo "============================================"
    echo "   AWS S3 Portfolio Deployment Script"
    echo "============================================"
    echo ""

    check_aws_cli
    check_aws_credentials
    get_bucket_name
    create_bucket
    configure_static_website
    set_bucket_policy
    upload_files
    create_cloudfront
    display_urls
}

# Run main function
main
