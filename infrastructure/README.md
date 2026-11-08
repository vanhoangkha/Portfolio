# Portfolio Infrastructure - AWS CDK

## Overview

This directory contains the Infrastructure as Code (IaC) for the SA-grade portfolio using AWS CDK (TypeScript).

### Architecture Components

- **CloudFront CDN** - Global content delivery with edge caching
- **S3** - Static website hosting with versioning
- **WAF** - Web Application Firewall with managed rules
- **CloudWatch** - Monitoring, dashboards, and alarms
- **CloudTrail** - Audit logging for compliance
- **AWS Config** - Resource compliance tracking
- **KMS** - Encryption key management

---

## Structure

```
infrastructure/
├── bin/
│   └── app.ts                  # CDK app entry point
├── lib/
│   ├── portfolio-stack.ts      # Main infrastructure (CloudFront, S3, WAF)
│   ├── monitoring-stack.ts     # CloudWatch dashboards and alarms
│   └── security-stack.ts       # CloudTrail, Config, compliance
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
└── cdk.json                    # CDK configuration
```

---

## Prerequisites

1. **AWS CLI** configured with credentials
   ```bash
   aws configure
   ```

2. **Node.js 20+** and npm
   ```bash
   node --version  # Should be v20.x
   ```

3. **AWS CDK CLI**
   ```bash
   npm install -g aws-cdk
   cdk --version
   ```

4. **Bootstrap CDK** (one-time per account/region)
   ```bash
   cdk bootstrap aws://ACCOUNT-ID/us-east-1
   ```

---

## Installation

```bash
cd infrastructure
npm install
```

---

## Deployment

### Deploy All Stacks

```bash
# Development
npm run deploy:dev

# Staging
npm run deploy:staging

# Production
npm run deploy:prod
```

### Deploy Specific Stack

```bash
# Main infrastructure only
cdk deploy Portfolio-production

# Monitoring only
cdk deploy PortfolioMonitoring-production

# Security only
cdk deploy PortfolioSecurity-production
```

### Preview Changes

```bash
cdk diff
```

### Synthesize CloudFormation

```bash
cdk synth
```

---

## Multi-Environment Setup

The infrastructure supports three environments:

| Environment | Branch | URL |
|------------|--------|-----|
| Development | `develop` | dev.yourdomain.com |
| Staging | `staging` | staging.yourdomain.com |
| Production | `master` | yourdomain.com |

Each environment has isolated resources with appropriate tags.

---

## Security Features

### WAF Rules

1. **Rate Limiting**: 2000 requests per 5 minutes per IP
2. **Common Rule Set**: SQL injection, XSS protection
3. **Known Bad Inputs**: Block malicious patterns

### CloudTrail

- **Multi-region**: Tracks all regions
- **Log validation**: Ensures log integrity
- **Encryption**: KMS encryption at rest
- **Retention**: 365 days with Glacier archive

### AWS Config Rules

- S3 bucket encryption enabled
- CloudTrail enabled
- IAM password policy compliance
- Root account MFA enabled
- DynamoDB point-in-time recovery

---

## Monitoring

### CloudWatch Dashboard

Access at: `https://console.aws.amazon.com/cloudwatch/`

**Widgets:**
- CloudFront request count
- Error rate (4xx, 5xx)
- Bytes downloaded
- Cache hit ratio

### Alarms

| Alarm | Threshold | Action |
|-------|-----------|--------|
| High Error Rate | > 5% | SNS notification |
| High Request Count | > 10,000/5min | SNS notification |
| Low Cache Hit Rate | < 70% | SNS notification |

**Configure email notifications:**
```bash
export ALERT_EMAIL=your-email@example.com
cdk deploy PortfolioMonitoring-production
```

---

## Cost Optimization

### Estimated Monthly Cost

| Service | Cost | Notes |
|---------|------|-------|
| CloudFront | $1-5 | Based on traffic |
| S3 | $0.50-2 | Storage + requests |
| WAF | $5-10 | Base + rules |
| CloudWatch | $0-2 | Metrics + logs |
| CloudTrail | $0-1 | Management events |
| Config | $2-3 | Resource tracking |
| **Total** | **$9-23/month** | Low-medium traffic |

### Cost Reduction Tips

1. **Use lifecycle policies** for old S3 versions
2. **Optimize CloudFront caching** to reduce origin requests
3. **Set log retention** policies in CloudWatch
4. **Archive CloudTrail logs** to Glacier after 90 days

---

## Backup & Disaster Recovery

### S3 Versioning

- Enabled on all buckets
- 30-day retention for non-current versions

### CloudFront Failover

- Origin groups with automatic failover
- Health checks every 30 seconds

### Point-in-Time Recovery

- DynamoDB: Continuous backups
- S3: Versioning + Cross-region replication

**RTO**: 1 hour
**RPO**: 15 minutes

---

## Cleanup

**Warning**: This will delete all resources!

```bash
# Development
cdk destroy --all --context environment=development

# Staging
cdk destroy --all --context environment=staging

# Production (requires approval)
cdk destroy --all --context environment=production
```

---

## Outputs

After deployment, CDK will output:

```
Portfolio-production.BucketName = portfolio-production-123456789012
Portfolio-production.DistributionId = E1234567890ABC
Portfolio-production.DistributionDomain = d1234567890abc.cloudfront.net
Portfolio-production.WebACLArn = arn:aws:wafv2:...
PortfolioMonitoring-production.DashboardURL = https://...
PortfolioSecurity-production.CloudTrailArn = arn:aws:cloudtrail:...
```

Save these values for CI/CD configuration.

---

## Troubleshooting

### CDK Bootstrap Issues

```bash
# Re-bootstrap
cdk bootstrap --force
```

### Permission Denied

```bash
# Check AWS credentials
aws sts get-caller-identity

# Ensure IAM user has AdministratorAccess or specific permissions
```

### Stack Update Fails

```bash
# Check CloudFormation events
aws cloudformation describe-stack-events \
  --stack-name Portfolio-production \
  --max-items 10

# Rollback if needed
aws cloudformation cancel-update-stack \
  --stack-name Portfolio-production
```

### CloudFront Deployment Slow

CloudFront distributions take 15-30 minutes to deploy. Be patient!

---

## Testing

### Test CloudFront

```bash
curl -I https://d1234567890abc.cloudfront.net
```

### Test WAF

```bash
# Should block after 2000 requests
for i in {1..2100}; do 
  curl -s https://yourdomain.com > /dev/null
done
```

### Test Monitoring

```bash
# Trigger error rate alarm
# Make requests that return 5xx errors
```

---

## Additional Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [CloudFront Best Practices](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/best-practices.html)
- [WAF Documentation](https://docs.aws.amazon.com/waf/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

---

## Contributing

1. Create feature branch
2. Make changes
3. Run `cdk diff` to preview
4. Test in development environment
5. Create pull request

---

## License

MIT

---

## Author

**Kha Van Hoang**
- AWS Solutions Architect
- Email: kha.van.hoang@example.com

---

**This infrastructure demonstrates AWS Solutions Architect expertise including:**

Infrastructure as Code (CDK)
Multi-environment setup
Security best practices
Monitoring and alerting
Cost optimization
Disaster recovery
Compliance (CloudTrail, Config)
High availability
Performance optimization
Well-Architected Framework alignment

Generated with Claude Code
