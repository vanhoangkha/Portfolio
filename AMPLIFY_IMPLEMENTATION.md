# 🚀 AWS Amplify Full-Stack Implementation Guide

## ✅ Phần đã hoàn thành

### 1. Backend Infrastructure Code (Amplify Gen 2)

Đã tạo cấu trúc backend với AWS Amplify Gen 2:

```
amplify/
├── backend.ts                          # Main backend configuration
├── auth/resource.ts                    # Cognito authentication
├── data/resource.ts                    # Data models (DynamoDB)
├── storage/resource.ts                 # S3 storage buckets
├── functions/
│   └── contact-handler/               # Lambda function for contact form
│       ├── resource.ts
│       ├── handler.ts
│       └── package.json
├── package.json                        # Backend dependencies
└── tsconfig.json                       # TypeScript config
```

### 2. Data Models Defined

**7 data models** sử dụng DynamoDB (thay vì PostgreSQL cho simplicity):

1. **BlogPost** - Blog posts với categories, tags, view count
2. **Project** - Projects với technologies, GitHub, live URLs
3. **Skill** - Skills với categories và levels
4. **Certification** - Certificates với issuer, dates, credentials
5. **Achievement** - Achievements với dates và links
6. **CommunityActivity** - Community activities và workshops
7. **ContactSubmission** - Contact form submissions
8. **AnalyticsEvent** - Analytics tracking

### 3. Authentication (Cognito)

- Email-based authentication
- Email verification with code
- Password recovery via email
- User attributes: email, name

### 4. Storage (S3)

Three bucket paths:
- `public/*` - Public assets (anyone can read)
- `blog-images/*` - Blog post images
- `project-images/*` - Project screenshots
- `private/{entity_id}/*` - Private user files

### 5. Lambda Functions

**Contact Handler**:
- Validates form data
- Sends email via SES
- Stores submission
- Returns success/error response

## 📊 Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                     AWS Amplify Gen 2                         │
│                                                                │
│  Frontend (Amplify Hosting)                                   │
│  ├── HTML/CSS/JS                                              │
│  ├── CloudFront CDN                                           │
│  └── HTTPS automatic                                          │
│                                                                │
│  Backend (Serverless)                                         │
│  ├── Amazon Cognito (Auth)                                    │
│  ├── AWS AppSync (GraphQL API)      ← Auto-generated!       │
│  ├── Amazon DynamoDB (Database)     ← NoSQL, fast, scalable │
│  ├── AWS Lambda (Functions)                                   │
│  └── Amazon S3 (Storage)                                      │
│                                                                │
│  Additional Services                                          │
│  ├── Amazon SES (Email)                                       │
│  ├── Amazon CloudWatch (Monitoring)                           │
│  └── AWS IAM (Security)                                       │
└──────────────────────────────────────────────────────────────┘
```

## 🎯 Key Differences from Original Plan

### Changed: DynamoDB instead of RDS PostgreSQL

**Why?**

✅ **Simpler**: No VPC, security groups, or connection pooling
✅ **Faster**: Amplify Gen 2 built-in support
✅ **Cheaper**: Pay per request, no always-on instance
✅ **Better fit**: Portfolio data is document-oriented, not heavily relational
✅ **Auto-scaling**: Handles any load automatically

**Trade-offs:**
- ⚠️ No complex SQL joins (but not needed for portfolio)
- ⚠️ Different query patterns (but AppSync handles this)

### Added: AppSync GraphQL API

Amplify Gen 2 automatically generates:
- ✅ GraphQL schema from data models
- ✅ CRUD operations (queries & mutations)
- ✅ Real-time subscriptions
- ✅ Authorization rules
- ✅ Optimistic UI updates

Example auto-generated queries:
```graphql
# Get all blog posts
query ListBlogPosts {
  listBlogPosts {
    items {
      id
      title
      content
      category
      publishedAt
    }
  }
}

# Create blog post
mutation CreateBlogPost($input: CreateBlogPostInput!) {
  createBlogPost(input: $input) {
    id
    title
    publishedAt
  }
}

# Subscribe to new blog posts
subscription OnCreateBlogPost {
  onCreateBlogPost {
    id
    title
    publishedAt
  }
}
```

## 🚀 Next Steps

### Step 1: Install Dependencies

```bash
cd /home/ubuntu/Portfolio

# Install root dependencies
npm install

# Install amplify backend dependencies
cd amplify
npm install

# Back to root
cd ..
```

### Step 2: Deploy Backend (Sandbox for testing)

```bash
# Start sandbox environment (for development/testing)
npm run sandbox

# This will:
# ✅ Create Cognito User Pool
# ✅ Create DynamoDB tables
# ✅ Create S3 buckets
# ✅ Deploy Lambda functions
# ✅ Generate AppSync GraphQL API
# ✅ Output amplify_outputs.json
```

Sandbox creates a temporary cloud environment connected to your local code.

### Step 3: Update Frontend

Add Amplify library to frontend:

```html
<!-- Add to index.html -->
<script type="module">
  import { Amplify } from 'https://cdn.jsdelivr.net/npm/aws-amplify@6/+esm';
  import config from './amplify_outputs.json' assert { type: 'json' };

  Amplify.configure(config);
</script>
```

Update API calls to use Amplify:

```javascript
// Old way (REST API)
const response = await fetch('http://localhost:5000/api/v1/blog');

// New way (GraphQL with Amplify)
import { generateClient } from 'aws-amplify/data';
const client = generateClient();

const { data } = await client.models.BlogPost.list();
```

### Step 4: Deploy to Production

```bash
# Connect GitHub to Amplify Console
# Then push code, Amplify auto-deploys everything!

git add .
git commit -m "Add Amplify Gen 2 backend"
git push

# Or deploy manually
npm run deploy:backend
```

### Step 5: Migrate Data (if needed)

If you have existing data in PostgreSQL:

```bash
# Export from PostgreSQL
pg_dump portfolio_db > portfolio_data.sql

# Convert to DynamoDB format
# Write migration script to insert into Amplify Data

# Or use AWS Data Migration Service
```

## 📝 Frontend Integration Examples

### Authentication

```javascript
import { signIn, signUp, signOut, getCurrentUser } from 'aws-amplify/auth';

// Sign up
await signUp({
  username: 'user@example.com',
  password: 'Password123!',
  options: {
    userAttributes: {
      email: 'user@example.com',
      name: 'John Doe'
    }
  }
});

// Sign in
await signIn({
  username: 'user@example.com',
  password: 'Password123!'
});

// Sign out
await signOut();

// Get current user
const user = await getCurrentUser();
```

### Data Operations

```javascript
import { generateClient } from 'aws-amplify/data';
const client = generateClient();

// Create blog post
const newPost = await client.models.BlogPost.create({
  title: 'My First Post',
  content: 'Hello World!',
  author: 'Kha Van Hoang',
  published: true
});

// List blog posts
const { data: posts } = await client.models.BlogPost.list({
  filter: {
    published: { eq: true }
  }
});

// Update blog post
await client.models.BlogPost.update({
  id: 'post-id',
  viewCount: 100
});

// Delete blog post
await client.models.BlogPost.delete({ id: 'post-id' });
```

### File Upload

```javascript
import { uploadData, getUrl } from 'aws-amplify/storage';

// Upload image
const result = await uploadData({
  key: `blog-images/${file.name}`,
  data: file,
  options: {
    contentType: file.type
  }
}).result;

// Get URL
const url = await getUrl({ key: `blog-images/${file.name}` });
```

### Contact Form

```javascript
import { post } from 'aws-amplify/api';

// Call Lambda function via API Gateway
const response = await post({
  apiName: 'contactAPI',
  path: '/contact',
  options: {
    body: {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello!'
    }
  }
}).response;
```

## 💰 Cost Estimate

### Free Tier (12 months)
- Amplify Hosting: 1,000 build minutes + 15 GB served/month
- AppSync: 250,000 queries/month
- DynamoDB: 25 GB storage + 200M requests/month
- Lambda: 1M requests + 400,000 GB-seconds/month
- S3: 5 GB storage + 20,000 GET requests/month
- Cognito: 50,000 MAU (Monthly Active Users)

### After Free Tier (low traffic ~1000 visitors/month)
- Amplify Hosting: $0-5/month
- AppSync: $0-2/month
- DynamoDB: $0-3/month
- Lambda: $0-1/month
- S3: $0-2/month
- Cognito: $0 (under 50K MAU)
- CloudWatch: $0-1/month

**Total: $0-15/month** (much cheaper than RDS!)

## 🎯 Benefits vs Express Backend

| Feature | Express + RDS | Amplify Gen 2 |
|---------|---------------|---------------|
| **Setup** | Complex (VPC, RDS, EC2) | Simple (one command) |
| **Cost** | $30-50/month | $0-15/month |
| **Scaling** | Manual (EC2 + RDS) | Auto (serverless) |
| **Database** | PostgreSQL (relational) | DynamoDB (NoSQL) |
| **API** | REST (manual) | GraphQL (auto-generated) |
| **Auth** | JWT (custom) | Cognito (managed) |
| **Real-time** | Manual (Socket.io) | Built-in (subscriptions) |
| **File Upload** | Manual (multer) | Built-in (S3) |
| **Maintenance** | High (patch, backup) | Low (managed) |
| **Cold Start** | None (always on) | 1-2s (Lambda) |

## ⚠️ Important Notes

### 1. Data Migration

Your existing Express backend has data in PostgreSQL. You'll need to:
- Export data
- Transform to DynamoDB format
- Import via Amplify Data API

### 2. API Changes

Frontend needs updates to use GraphQL instead of REST:
- Replace `fetch()` calls with Amplify Data client
- Update response handling
- Add authentication tokens

### 3. Lambda Cold Starts

First request after idle may be slow (1-2 seconds). Solutions:
- Keep functions warm with scheduled invocations
- Use provisioned concurrency (costs more)
- Acceptable for portfolio (not high-traffic app)

### 4. DynamoDB Learning Curve

Different from SQL:
- No joins (denormalize data)
- Design for access patterns
- Use single-table design for complex queries
- Amplify handles most complexity

## 🚀 Ready to Deploy?

Run these commands:

```bash
# Install dependencies
npm install
cd amplify && npm install && cd ..

# Start sandbox (creates cloud resources)
npm run sandbox

# Follow prompts to create AWS profile if needed
# Wait 2-5 minutes for deployment
# Resources will be created in your AWS account

# When done, you'll see:
# ✅ GraphQL endpoint
# ✅ All resources created
# ✅ amplify_outputs.json generated
```

Then:
1. Update frontend to use Amplify library
2. Test locally with sandbox
3. Connect GitHub to Amplify Console
4. Push code → auto-deploy!

## ❓ Questions?

- How to migrate Express routes? → Use Lambda functions + AppSync resolvers
- How to keep PostgreSQL? → Add RDS manually + connect from Lambda
- How to use REST instead of GraphQL? → Add API Gateway + Lambda directly
- How to customize auth? → Use Cognito triggers (Lambda functions)

---

**Status**: Backend infrastructure ready, pending installation & deployment
**Next**: Run `npm install` and `npm run sandbox`
