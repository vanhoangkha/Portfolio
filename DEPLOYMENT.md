# AWS S3 + CloudFront Deployment Guide

Complete guide for deploying your portfolio to AWS S3 with CloudFront CDN.

## 📋 Prerequisites

### 1. AWS Account
- Create an AWS account at https://aws.amazon.com
- Have billing set up (Free tier available)

### 2. AWS CLI Installation

**macOS:**
```bash
brew install awscli
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

**Windows:**
Download and install from: https://aws.amazon.com/cli/

**Verify installation:**
```bash
aws --version
```

### 3. Configure AWS Credentials

```bash
aws configure
```

Enter:
- AWS Access Key ID
- AWS Secret Access Key
- Default region: `ap-southeast-1` (or your preferred region)
- Default output format: `json`

**Test credentials:**
```bash
aws sts get-caller-identity
```

## 🚀 Deployment Methods

### Method 1: Automated Script (Recommended)

#### Initial Deployment:
```bash
chmod +x deploy-s3.sh
./deploy-s3.sh
```

The script will:
1. ✅ Check AWS CLI and credentials
2. ✅ Prompt for bucket name
3. ✅ Create S3 bucket
4. ✅ Configure static website hosting
5. ✅ Set public access policy
6. ✅ Upload all files with proper caching
7. ✅ Optionally create CloudFront distribution

#### Updates (After Initial Deployment):
```bash
chmod +x update-s3.sh
./update-s3.sh <your-bucket-name>
```

### Method 2: Manual AWS CLI Commands

#### Step 1: Create S3 Bucket
```bash
BUCKET_NAME="your-portfolio-bucket"
REGION="ap-southeast-1"

# Create bucket
aws s3api create-bucket \
    --bucket $BUCKET_NAME \
    --region $REGION \
    --create-bucket-configuration LocationConstraint=$REGION
```

#### Step 2: Enable Static Website Hosting
```bash
aws s3 website s3://$BUCKET_NAME \
    --index-document index.html \
    --error-document index.html
```

#### Step 3: Set Bucket Policy for Public Access
```bash
cat > bucket-policy.json <<EOF
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

# Remove block public access
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Apply bucket policy
aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy file://bucket-policy.json
```

#### Step 4: Upload Files
```bash
# Sync all files
aws s3 sync . s3://$BUCKET_NAME \
    --exclude ".git/*" \
    --exclude "*.sh" \
    --exclude "*.md"

# Set HTML cache control
aws s3 cp . s3://$BUCKET_NAME \
    --recursive \
    --exclude "*" \
    --include "*.html" \
    --content-type "text/html" \
    --cache-control "public, max-age=300" \
    --metadata-directive REPLACE

# Set CSS cache control
aws s3 cp . s3://$BUCKET_NAME \
    --recursive \
    --exclude "*" \
    --include "*.css" \
    --content-type "text/css" \
    --cache-control "public, max-age=31536000" \
    --metadata-directive REPLACE

# Set JS cache control
aws s3 cp . s3://$BUCKET_NAME \
    --recursive \
    --exclude "*" \
    --include "*.js" \
    --content-type "application/javascript" \
    --cache-control "public, max-age=31536000" \
    --metadata-directive REPLACE
```

#### Step 5: Get Website URL
```bash
echo "http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"
```

### Method 3: AWS Console (Web Interface)

1. **Go to S3 Console**: https://s3.console.aws.amazon.com
2. **Create Bucket**:
   - Click "Create bucket"
   - Enter bucket name (must be globally unique)
   - Select region: `ap-southeast-1`
   - Uncheck "Block all public access"
   - Click "Create bucket"

3. **Upload Files**:
   - Click on your bucket
   - Click "Upload"
   - Drag and drop all files
   - Click "Upload"

4. **Enable Static Website Hosting**:
   - Go to "Properties" tab
   - Scroll to "Static website hosting"
   - Click "Edit"
   - Enable static website hosting
   - Index document: `index.html`
   - Error document: `index.html`
   - Click "Save changes"

5. **Set Bucket Policy**:
   - Go to "Permissions" tab
   - Click "Bucket Policy"
   - Paste the policy from Step 3 above
   - Click "Save"

6. **Get Website URL**:
   - Go to "Properties" tab
   - Find "Static website hosting"
   - Copy the website endpoint URL

## 🌐 CloudFront Setup (HTTPS + CDN)

### Why CloudFront?
- ✅ HTTPS support (SSL/TLS)
- ✅ Global CDN (faster load times worldwide)
- ✅ Custom domain support
- ✅ DDoS protection
- ✅ Better caching control

### Automated CloudFront Setup:
```bash
# Run deploy script and answer 'y' when prompted
./deploy-s3.sh
```

### Manual CloudFront Setup:

1. **Create Distribution**:
```bash
# Get S3 website endpoint
WEBSITE_ENDPOINT="${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"

# Create CloudFront distribution
aws cloudfront create-distribution \
    --origin-domain-name $WEBSITE_ENDPOINT \
    --default-root-object index.html
```

2. **Via AWS Console**:
   - Go to CloudFront Console: https://console.aws.amazon.com/cloudfront
   - Click "Create Distribution"
   - Origin Domain: Select your S3 bucket
   - Origin Path: Leave empty
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD
   - Compress Objects: Yes
   - Default Root Object: `index.html`
   - Click "Create Distribution"

3. **Wait for Deployment** (15-20 minutes)

4. **Get CloudFront URL**:
   - Example: `https://d1234567890.cloudfront.net`

### CloudFront Cache Invalidation:
```bash
# After updating files
aws cloudfront create-invalidation \
    --distribution-id YOUR_DISTRIBUTION_ID \
    --paths "/*"
```

## 🔒 Custom Domain Setup

### Prerequisites:
- Domain registered (Route53, GoDaddy, Namecheap, etc.)
- SSL Certificate from ACM (AWS Certificate Manager)

### Step 1: Request SSL Certificate
```bash
# Request certificate in us-east-1 (required for CloudFront)
aws acm request-certificate \
    --domain-name yourdomain.com \
    --subject-alternative-names www.yourdomain.com \
    --validation-method DNS \
    --region us-east-1
```

### Step 2: Validate Certificate
- Go to ACM Console
- Add DNS records to your domain
- Wait for validation (5-30 minutes)

### Step 3: Configure CloudFront
- Update CloudFront distribution
- Add Alternate Domain Names (CNAMEs): `yourdomain.com`, `www.yourdomain.com`
- Select Custom SSL Certificate (from ACM)
- Save changes

### Step 4: Update DNS
Create DNS records:
```
Type: A (Alias)
Name: yourdomain.com
Value: CloudFront distribution domain (d1234567890.cloudfront.net)

Type: A (Alias)
Name: www.yourdomain.com
Value: CloudFront distribution domain
```

## 💰 Cost Estimate

### S3 Pricing (ap-southeast-1):
- Storage: $0.025 per GB/month (~$0.01 for this portfolio)
- GET Requests: $0.004 per 10,000 requests
- Data Transfer: First 1 GB free, then $0.12 per GB

### CloudFront Pricing:
- First 10 TB: $0.140 per GB (to Internet)
- Requests: $0.0075 per 10,000 HTTPS requests
- Free tier: 1 TB data transfer, 10M HTTPS requests/month

### Estimated Monthly Cost:
- **S3 Only**: $0.50 - $2
- **S3 + CloudFront**: $1 - $5 (with free tier)
- **With Custom Domain**: +$0.50/month (Route53 hosted zone)

Most users will stay within AWS Free Tier limits!

## 📊 Monitoring & Analytics

### CloudWatch Metrics:
```bash
# View S3 bucket metrics
aws cloudwatch get-metric-statistics \
    --namespace AWS/S3 \
    --metric-name BucketSizeBytes \
    --dimensions Name=BucketName,Value=$BUCKET_NAME \
    --start-time 2025-01-01T00:00:00Z \
    --end-time 2025-01-31T23:59:59Z \
    --period 86400 \
    --statistics Average
```

### Enable S3 Access Logging:
```bash
aws s3api put-bucket-logging \
    --bucket $BUCKET_NAME \
    --bucket-logging-status \
    file://logging-config.json
```

## 🔄 CI/CD Integration

### GitHub Actions Example:
```yaml
# .github/workflows/deploy.yml
name: Deploy to S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-1

      - name: Deploy to S3
        run: |
          aws s3 sync . s3://${{ secrets.BUCKET_NAME }} \
            --exclude ".git/*" \
            --delete

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_ID }} \
            --paths "/*"
```

## 🛠 Troubleshooting

### 403 Forbidden Error:
- Check bucket policy is applied
- Verify public access block settings
- Ensure files have public-read ACL

### 404 Not Found:
- Verify index.html exists in root
- Check error document configuration
- For SPAs, set error document to index.html

### Slow Loading:
- Enable CloudFront distribution
- Check cache-control headers
- Enable gzip compression

### CloudFront Not Updating:
- Create cache invalidation
- Wait for invalidation to complete (5-10 minutes)
- Check TTL settings

## 📚 Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/)
- [S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [CloudFront Pricing](https://aws.amazon.com/cloudfront/pricing/)

## 🎯 Quick Commands Reference

```bash
# Check bucket size
aws s3 ls s3://$BUCKET_NAME --recursive --summarize

# Download backup
aws s3 sync s3://$BUCKET_NAME ./backup

# Delete bucket (careful!)
aws s3 rb s3://$BUCKET_NAME --force

# List CloudFront distributions
aws cloudfront list-distributions

# Get distribution status
aws cloudfront get-distribution --id YOUR_DIST_ID
```

## ✅ Deployment Checklist

- [ ] AWS CLI installed and configured
- [ ] Bucket name decided (globally unique)
- [ ] S3 bucket created
- [ ] Static website hosting enabled
- [ ] Bucket policy configured
- [ ] Files uploaded with correct content types
- [ ] Website accessible via S3 URL
- [ ] (Optional) CloudFront distribution created
- [ ] (Optional) Custom domain configured
- [ ] (Optional) SSL certificate set up
- [ ] (Optional) DNS records updated
- [ ] (Optional) Monitoring/logging enabled
- [ ] (Optional) CI/CD pipeline configured

---

**Need Help?**
- AWS Support: https://console.aws.amazon.com/support
- Community: https://forums.aws.amazon.com
