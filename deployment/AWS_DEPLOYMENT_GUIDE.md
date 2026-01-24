# 🚀 AWS Deployment Guide - Portfolio Full-Stack

## 📊 Current Deployment Status

### ✅ **Backend Infrastructure (AWS Amplify Gen 2)**

**Status:** ✅ DEPLOYED

**Resources Created:**
```
Region: us-east-1
App ID: dzecmyr42457
```

**Backend Services:**
1. **Amazon Cognito User Pool**
   - User Pool ID: `us-east-1_Vffgb2O14`
   - Client ID: `17ls2ohuotl6iaoadh3p4t4cgf`
   - Identity Pool: `us-east-1:508f577d-e26b-474c-bb9e-949764bf90f2`
   - Auth: Email-based authentication

2. **AWS AppSync GraphQL API**
   - Endpoint: `https://3pnzpjip2bcilanfdfi5h4xbxa.appsync-api.us-east-1.amazonaws.com/graphql`
   - API Key: `da2-kokjubjxnrbhzgq67hah6ekwjq`
   - Authorization: API_KEY, Cognito, IAM

3. **Amazon DynamoDB Tables (7 tables)**
   - BlogPost
   - Project
   - Skill
   - Certification
   - Achievement
   - CommunityActivity
   - ContactSubmission
   - AnalyticsEvent

4. **Amazon S3 Storage**
   - Bucket: `amplify-portfolio-ubuntu--portfolioassetsbucket4cf-9acpsbphhwvf`
   - Paths:
     - `public/*` - Public assets
     - `blog-images/*` - Blog images
     - `project-images/*` - Project images
     - `private/*` - Private files

5. **AWS Lambda Functions**
   - contact-handler - Contact form processing

---

## 🌐 **Frontend Hosting (AWS Amplify)**

### Production URL:
```
https://master.dzecmyr42457.amplifyapp.com
```

### Build Configuration:
- **Location:** `infrastructure/amplify.yml`
- **Frontend:** Static HTML/CSS/JS (no build needed)
- **Backend:** Amplify Gen 2 with CDK

---

## 🔄 **CI/CD Pipeline (GitHub Actions)**

### Workflows Available:

1. **`.github/workflows/amplify-deploy.yml`**
   - Full-stack deployment
   - Deploys backend + frontend
   - Triggered on push to `master/main`

2. **`.github/workflows/deploy.yml`**
   - Quick deployment
   - Frontend only

3. **`.github/workflows/ci.yml`**
   - Continuous Integration
   - Linting, testing

4. **`.github/workflows/cost-monitor.yml`**
   - AWS cost monitoring

---

## 🚀 **How to Deploy**

### Method 1: GitHub Push (Automatic)

```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push origin master

# GitHub Actions will automatically:
# 1. Deploy backend to AWS
# 2. Deploy frontend to Amplify Hosting
# 3. Update CloudFront CDN
```

### Method 2: Manual Deploy via CLI

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Navigate to backend folder
cd infrastructure/amplify

# Deploy backend
npx ampx sandbox

# Or deploy to production
npx ampx pipeline-deploy --branch master --app-id dzecmyr42457
```

### Method 3: AWS Amplify Console

1. Go to: https://console.aws.amazon.com/amplify
2. Select App: `dzecmyr42457`
3. Click "Deploy" on master branch
4. Monitor build progress

---

## 📁 **Project Structure for Deployment**

```
Portfolio/
├── infrastructure/
│   ├── amplify/              # Backend (Amplify Gen 2)
│   │   ├── backend.ts        # Backend definition
│   │   ├── data/            # GraphQL schema
│   │   ├── auth/            # Cognito config
│   │   ├── storage/         # S3 buckets
│   │   └── functions/       # Lambda functions
│   ├── amplify.yml          # Build specification
│   └── amplify_outputs.json # Backend config (generated)
│
├── index.html               # Frontend entry
├── resume.html
├── blog.html
├── css/                     # Stylesheets
├── js/                      # JavaScript
└── assets/                  # Static assets
```

---

## ⚙️ **Environment Variables Needed**

For GitHub Actions:

```yaml
AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
AWS_REGION: ap-southeast-1
AMPLIFY_APP_ID: dzecmyr42457
```

---

## 🔧 **Local Development with Backend**

### Start Amplify Sandbox:

```bash
cd infrastructure/amplify
npx ampx sandbox
```

This will:
- Create temporary cloud resources
- Generate `amplify_outputs.json`
- Enable local testing with real AWS services

### Copy config to frontend:

```bash
cp infrastructure/amplify/amplify_outputs.json .
```

### Start local server:

```bash
# Port 3000
python3 -m http.server 3000

# Or port 8000
python3 -m http.server 8000
```

---

## 📊 **Backend Data Management**

### GraphQL API Endpoint:
```
https://3pnzpjip2bcilanfdfi5h4xbxa.appsync-api.us-east-1.amazonaws.com/graphql
```

### Example Queries:

**List Blog Posts:**
```graphql
query ListBlogPosts {
  listBlogPosts {
    items {
      id
      title
      slug
      excerpt
      publishedAt
      author
    }
  }
}
```

**List Projects:**
```graphql
query ListProjects {
  listProjects {
    items {
      id
      title
      description
      technologies
      githubUrl
      liveUrl
    }
  }
}
```

### Test API:
```bash
# Using curl
curl -X POST \
  https://3pnzpjip2bcilanfdfi5h4xbxa.appsync-api.us-east-1.amazonaws.com/graphql \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: da2-kokjubjxnrbhzgq67hah6ekwjq' \
  -d '{"query":"query { listProjects { items { id title } } }"}'
```

---

## 🎯 **Deployment Checklist**

Before deploying:

- [ ] Update content in HTML files
- [ ] Test locally (port 3000 or 8000)
- [ ] Check all assets paths
- [ ] Verify API integration (if using backend)
- [ ] Test on mobile viewport
- [ ] Check dark mode
- [ ] Verify all links work
- [ ] Update meta tags (SEO)

---

## 📱 **Access URLs**

### Production:
```
Frontend: https://master.dzecmyr42457.amplifyapp.com
Backend:  https://3pnzpjip2bcilanfdfi5h4xbxa.appsync-api.us-east-1.amazonaws.com/graphql
```

### Local Development:
```
Frontend: http://localhost:3000 or http://localhost:8000
Backend:  Sandbox - dynamic URL when running
```

---

## 🔍 **Monitoring & Logs**

### AWS Amplify Console:
- Build logs: https://console.aws.amazon.com/amplify/apps/dzecmyr42457
- CloudWatch logs for Lambda functions
- AppSync query logs
- Cognito user metrics

### GitHub Actions:
- Workflow runs: https://github.com/vanhoangkha/Portfolio/actions
- Deployment status
- Build artifacts

---

## 💰 **Cost Estimation**

**Expected Monthly Cost:** ~$5-10

- Amplify Hosting: $0 (free tier) - $5
- AppSync: $0 (free tier) - $2
- DynamoDB: $0 (free tier) - $1
- S3: $0 (free tier) - $1
- Lambda: $0 (free tier) - $1
- Cognito: $0 (free tier for <50k users)

**Free Tier Benefits:**
- 1000 build minutes/month
- 15 GB served/month
- 5 GB storage

---

## 🚨 **Troubleshooting**

### Build Fails on Amplify:

```bash
# Check build logs
aws amplify get-job \
  --app-id dzecmyr42457 \
  --branch-name master \
  --job-id <JOB_ID>

# Or check in console
# https://console.aws.amazon.com/amplify
```

### Backend Deploy Fails:

```bash
# Check CloudFormation stacks
aws cloudformation describe-stacks \
  --region us-east-1

# Check Amplify sandbox logs
cd infrastructure/amplify
npx ampx sandbox --debug
```

### CORS Issues:

Backend already configured for CORS. If issues persist:
- Check AppSync API settings
- Verify API key is correct
- Check browser console for errors

---

## 🔄 **Update Deployment**

### Update Frontend Only:

```bash
# Just push changes
git add index.html resume.html blog.html css/ js/ assets/
git commit -m "Update frontend UI"
git push origin master
```

### Update Backend Schema:

```bash
cd infrastructure/amplify
# Edit data/resource.ts
npx ampx sandbox  # Test changes
npx ampx pipeline-deploy --branch master --app-id dzecmyr42457
```

---

## 🎉 **Quick Deploy Commands**

```bash
# Full deploy (backend + frontend)
git push origin master

# Local development
python3 -m http.server 3000

# Backend sandbox
cd infrastructure/amplify && npx ampx sandbox

# Check deployment status
curl -I https://master.dzecmyr42457.amplifyapp.com
```

---

## 📚 **Resources**

- **Amplify Console:** https://console.aws.amazon.com/amplify/apps/dzecmyr42457
- **AppSync Console:** https://console.aws.amazon.com/appsync
- **Cognito Console:** https://console.aws.amazon.com/cognito
- **S3 Console:** https://console.aws.amazon.com/s3
- **CloudWatch Logs:** https://console.aws.amazon.com/cloudwatch

---

## ✅ **Deployment Status Summary**

| Component | Status | URL/Endpoint |
|-----------|--------|--------------|
| Frontend Hosting | ✅ Ready | https://master.dzecmyr42457.amplifyapp.com |
| Backend API | ✅ Deployed | AppSync GraphQL |
| Authentication | ✅ Active | Cognito User Pool |
| Database | ✅ Ready | DynamoDB (7 tables) |
| Storage | ✅ Configured | S3 Buckets |
| CI/CD | ✅ Active | GitHub Actions |

---

**Last Updated:** November 13, 2025
**Maintained By:** Kha Van Hoang

