# Scripts Documentation

This directory contains build, deployment, and utility scripts for the Portfolio project.

## Available Scripts

### Build Scripts

#### `build.sh`
Builds and optimizes frontend assets for production.

**Usage:**
```bash
npm run build
# or directly
bash scripts/build.sh
```

**What it does:**
- Minifies HTML files
- Optimizes CSS (removes unused styles, minifies)
- Minifies JavaScript files
- Compresses assets
- Outputs to `dist/` directory

**Requirements:**
- Node.js 18+
- html-minifier-terser
- csso-cli
- terser

---

### Deployment Scripts

#### `deploy-s3.sh`
Deploys the built application to AWS S3.

**Usage:**
```bash
BUCKET_NAME=your-bucket-name npm run deploy:s3
# or
BUCKET_NAME=your-bucket-name bash scripts/deploy-s3.sh
```

**Environment Variables:**
- `BUCKET_NAME` (required): S3 bucket name
- `AWS_REGION` (optional): AWS region (default: ap-southeast-1)
- `AWS_PROFILE` (optional): AWS CLI profile

**What it does:**
- Syncs dist/ folder to S3
- Sets appropriate cache headers
- Configures public read access
- Outputs bucket URL

---

#### `deploy-aws.sh`
Full AWS deployment including S3 and CloudFront setup.

**Usage:**
```bash
npm run deploy:aws
# or
bash scripts/deploy-aws.sh
```

**Environment Variables:**
- `BUCKET_NAME` (required)
- `CLOUDFRONT_DISTRIBUTION_ID` (optional)
- `AWS_REGION` (optional)

**What it does:**
- Creates/updates S3 bucket
- Configures bucket for static hosting
- Uploads files with optimized settings
- Creates/updates CloudFront distribution
- Invalidates CloudFront cache
- Outputs URLs

---

#### `update-s3.sh`
Quick update to S3 without full deployment.

**Usage:**
```bash
npm run update:s3
# or
bash scripts/update-s3.sh
```

**What it does:**
- Syncs only changed files
- Faster than full deployment
- Preserves cache settings

---

#### `check-cloudfront.sh`
Checks CloudFront distribution status.

**Usage:**
```bash
npm run check:cloudfront
# or
bash scripts/check-cloudfront.sh
```

**What it does:**
- Displays distribution status
- Shows domain name
- Checks invalidation status
- Verifies HTTPS configuration

---

## Script Development Guidelines

### Error Handling
All scripts should:
- Use `set -e` to exit on errors
- Use `set -u` to error on undefined variables
- Provide meaningful error messages
- Clean up temporary files on exit

### Example:
```bash
#!/bin/bash
set -euo pipefail

# Trap errors
trap 'echo "Error on line $LINENO"' ERR

# Script logic here
```

### Environment Variables
- Always provide defaults
- Document required variables
- Validate before use

### Logging
- Use clear, descriptive messages
- Show progress for long operations
- Color-code output (info, warning, error)

### Testing Scripts
Test scripts in a safe environment before production:
```bash
# Dry run example
DRY_RUN=true bash scripts/deploy-s3.sh
```

## Adding New Scripts

1. Create script in `scripts/` directory
2. Make it executable: `chmod +x scripts/your-script.sh`
3. Add npm script in `package.json`
4. Document here in README
5. Test thoroughly
6. Commit with clear message

## Common Issues

### Permission Denied
```bash
chmod +x scripts/script-name.sh
```

### AWS Credentials Not Found
```bash
aws configure
# or
export AWS_PROFILE=your-profile
```

### Build Fails
```bash
npm install
npm run clean
npm run build
```

## CI/CD Integration

These scripts are used in GitHub Actions workflows:
- `.github/workflows/ci.yml` - Runs build script
- `.github/workflows/deploy.yml` - Runs deployment scripts

See `.github/workflows/` for workflow configurations.

## Security Notes

- Never commit AWS credentials
- Use IAM roles in production
- Limit S3 bucket permissions
- Enable CloudFront security features
- Review scripts for security issues

## Support

For issues or questions about scripts:
1. Check this documentation
2. Review script comments
3. Open an issue on GitHub
4. Contact: khavan.work@gmail.com
