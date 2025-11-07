# 🚀 AWS Amplify Full-Stack Architecture Plan

## 📊 Current Stack Analysis

### Frontend (Đã có)
- **Framework**: Vanilla HTML/CSS/JavaScript
- **Features**: Portfolio, Blog, Projects, Contact form
- **Premium**: Glassmorphism, 3D effects, animations
- **Size**: ~320 KB (CSS + JS)

### Backend (Đã có)
- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL (với Knex ORM)
- **Features**:
  - ✅ Authentication (JWT)
  - ✅ Blog CMS
  - ✅ Projects management
  - ✅ Contact form
  - ✅ Analytics
  - ✅ Portfolio data API
- **Middleware**: Helmet, CORS, Rate limiting, Compression

## 🏗️ Target AWS Amplify Full-Stack Architecture

### Option 1: Serverless (Recommended) ⭐

```
┌─────────────────────────────────────────────────────────────────┐
│                         AWS Cloud                                │
│                                                                   │
│  ┌────────────────┐      ┌─────────────────────────────────┐   │
│  │  Route 53      │      │    CloudFront CDN (Global)       │   │
│  │  (DNS)         │──────│    - HTTPS automatic             │   │
│  └────────────────┘      │    - Edge caching                │   │
│                          └───────────┬─────────────────────────┘│
│                                      │                           │
│                          ┌───────────▼───────────┐              │
│                          │   AWS Amplify         │              │
│                          │   - Hosting           │              │
│                          │   - CI/CD             │              │
│                          │   - Frontend          │              │
│                          └───────────┬───────────┘              │
│                                      │                           │
│                                      │ API calls                 │
│                                      │                           │
│                          ┌───────────▼───────────────────┐      │
│                          │   API Gateway (REST API)      │      │
│                          │   - Rate limiting             │      │
│                          │   - API keys                  │      │
│                          │   - CORS                      │      │
│                          └───────────┬───────────────────┘      │
│                                      │                           │
│                    ┌─────────────────┼─────────────────┐        │
│                    │                 │                 │        │
│         ┌──────────▼──────┐ ┌───────▼────────┐ ┌──────▼──────┐│
│         │ Lambda Function │ │ Lambda Function│ │ Lambda Func ││
│         │   Blog API      │ │  Auth API      │ │ Portfolio   ││
│         │                 │ │  (Cognito)     │ │   API       ││
│         └──────────┬──────┘ └────────────────┘ └──────┬──────┘│
│                    │                                    │        │
│                    └─────────────┬──────────────────────┘        │
│                                  │                               │
│                       ┌──────────▼──────────┐                   │
│                       │  Amazon RDS         │                   │
│                       │  PostgreSQL         │                   │
│                       │  - Multi-AZ         │                   │
│                       │  - Automated backup │                   │
│                       └─────────────────────┘                   │
│                                                                   │
│  Additional Services:                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Amazon       │  │ Amazon S3    │  │ CloudWatch   │         │
│  │ Cognito      │  │ (assets)     │  │ (monitoring) │         │
│  │ (auth)       │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

### Option 2: Containerized (Alternative)

```
Frontend: Amplify Hosting
Backend: AWS App Runner (containerized Express)
Database: Amazon RDS PostgreSQL
```

## 🎯 Recommended: Option 1 - Serverless

### Why Serverless?

✅ **Cost-effective**: Pay per request, không tốn tiền khi không có traffic
✅ **Auto-scaling**: Scale từ 0 → millions requests
✅ **No server management**: AWS quản lý infrastructure
✅ **High availability**: Multi-AZ by default
✅ **Fast deployment**: Deploy trong vài phút
✅ **Global CDN**: CloudFront built-in với Amplify

### Serverless Architecture Components

#### 1. Frontend (AWS Amplify Hosting)
- **Deployment**: Git-based CI/CD
- **CDN**: CloudFront global distribution
- **HTTPS**: Automatic SSL certificates
- **Domain**: Custom domain support
- **Caching**: Edge locations worldwide

#### 2. Backend API (AWS Lambda + API Gateway)

**Convert Express routes to Lambda functions**:

```
Express Route               →  Lambda Function
─────────────────────────────────────────────────
POST /api/v1/auth/login     →  auth-lambda
POST /api/v1/auth/register  →  auth-lambda
GET  /api/v1/blog           →  blog-lambda
POST /api/v1/blog           →  blog-lambda
GET  /api/v1/projects       →  projects-lambda
POST /api/v1/contact        →  contact-lambda
GET  /api/v1/portfolio/*    →  portfolio-lambda
GET  /api/v1/analytics/*    →  analytics-lambda
```

**Lambda Runtime**: Node.js 20.x (latest)
**Memory**: 512 MB - 1024 MB
**Timeout**: 30 seconds

#### 3. Database (Amazon RDS PostgreSQL)

**Configuration**:
- **Engine**: PostgreSQL 15
- **Instance**: db.t3.micro (Free tier eligible) hoặc db.t4g.micro
- **Storage**: 20 GB SSD (auto-scaling enabled)
- **Multi-AZ**: Enabled (high availability)
- **Backup**: Automated daily backups (7 days retention)
- **Encryption**: At rest and in transit

#### 4. Authentication (Amazon Cognito)

**User Pools**:
- Email/password authentication
- JWT tokens
- MFA support (optional)
- Password policies
- Email verification

**Replace current JWT** with Cognito tokens:
- More secure
- Built-in user management
- Social login ready (Google, Facebook, etc.)

#### 5. Storage (Amazon S3)

**Buckets**:
- `portfolio-assets`: Images, PDFs, files
- `blog-images`: Blog post images
- `project-screenshots`: Project images

**Features**:
- Lifecycle policies
- CDN integration with CloudFront
- Versioning enabled

#### 6. Monitoring (Amazon CloudWatch)

**Metrics**:
- Lambda invocations
- API Gateway requests
- Database connections
- Error rates
- Response times

**Alarms**:
- High error rate → SNS notification
- Database CPU > 80% → SNS notification
- Lambda throttling → SNS notification

## 📦 Migration Steps

### Phase 1: Infrastructure Setup (Day 1)

1. **Setup AWS Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify project**
   ```bash
   cd /home/ubuntu/Portfolio
   amplify init
   ```

3. **Add API (Lambda + API Gateway)**
   ```bash
   amplify add api
   # Choose: REST API
   # Choose: Create new Lambda function
   ```

4. **Add Database (RDS)**
   ```bash
   # Via AWS Console or CDK
   # Configure VPC, security groups
   # Setup connection from Lambda
   ```

5. **Add Authentication**
   ```bash
   amplify add auth
   # Configure Cognito User Pool
   ```

6. **Add Storage**
   ```bash
   amplify add storage
   # Configure S3 buckets
   ```

### Phase 2: Backend Migration (Day 2-3)

1. **Convert Express routes to Lambda handlers**
   - Create Lambda function for each route group
   - Adapt middleware to Lambda context
   - Update database connections for serverless

2. **Database migration**
   - Export PostgreSQL data from current DB
   - Import to RDS PostgreSQL
   - Update connection strings

3. **Update authentication**
   - Integrate Cognito SDK
   - Replace JWT logic with Cognito tokens
   - Migrate user accounts

### Phase 3: Frontend Integration (Day 3)

1. **Update API endpoints**
   - Replace `localhost:5000` with API Gateway URLs
   - Add Amplify SDK to frontend
   - Configure authentication flow

2. **Update deployment**
   - Connect GitHub to Amplify
   - Configure build settings
   - Deploy frontend

### Phase 4: Testing & Optimization (Day 4)

1. **Testing**
   - End-to-end testing
   - Load testing
   - Security testing

2. **Optimization**
   - Lambda cold start optimization
   - Database query optimization
   - CDN caching configuration

3. **Monitoring**
   - Setup CloudWatch dashboards
   - Configure alarms
   - Log aggregation

## 💰 Cost Estimation

### Free Tier (First 12 months)
- Amplify: 1,000 build minutes/month
- Lambda: 1M requests + 400,000 GB-seconds/month
- API Gateway: 1M API calls/month
- RDS: db.t3.micro 750 hours/month
- S3: 5 GB storage
- CloudFront: 50 GB data transfer

### After Free Tier (~$15-30/month for low traffic)
- RDS db.t4g.micro: ~$12/month
- Lambda: ~$0-5/month (depends on traffic)
- API Gateway: ~$0-3/month
- S3: ~$1/month
- CloudFront: ~$1-5/month
- Amplify: ~$0-5/month

**Total**: ~$15-30/month for moderate traffic (1000-5000 visitors/month)

## 🚀 Benefits of This Architecture

### Performance
- ⚡ **Global CDN**: Sub-100ms response times worldwide
- ⚡ **Auto-scaling**: Handle traffic spikes automatically
- ⚡ **Edge caching**: Static assets served from edge locations

### Security
- 🔒 **HTTPS everywhere**: Automatic SSL certificates
- 🔒 **WAF ready**: AWS WAF integration available
- 🔒 **Cognito**: Enterprise-grade authentication
- 🔒 **VPC**: Database in private subnet
- 🔒 **IAM**: Fine-grained access control

### Reliability
- 🎯 **99.99% uptime**: Multi-AZ deployments
- 🎯 **Auto-backup**: Automated daily backups
- 🎯 **Disaster recovery**: Point-in-time recovery
- 🎯 **Monitoring**: Real-time alerts

### Scalability
- 📈 **Serverless**: Auto-scale from 0 to millions
- 📈 **Database**: Read replicas for scaling reads
- 📈 **CDN**: Global distribution
- 📈 **Queue**: Add SQS for async processing

### Developer Experience
- 👨‍💻 **CI/CD**: Auto-deploy on git push
- 👨‍💻 **Local dev**: Amplify mock and local testing
- 👨‍💻 **IaC**: Infrastructure as Code with CDK
- 👨‍💻 **Monitoring**: Built-in CloudWatch integration

## 🛠️ Tools & Technologies

### Development
- **Amplify CLI**: Infrastructure management
- **AWS CDK**: Infrastructure as Code (TypeScript)
- **Amplify SDK**: Frontend integration
- **AWS SDK**: Backend AWS service integration

### Testing
- **Amplify Mock**: Local API testing
- **Postman**: API testing
- **Jest**: Unit testing
- **Artillery**: Load testing

### Monitoring
- **CloudWatch**: Logs and metrics
- **X-Ray**: Distributed tracing
- **CloudWatch Insights**: Log analytics

## 📝 Next Steps

### Option A: Full Serverless Migration (Recommended)
**Timeline**: 4-5 days
**Effort**: Medium
**Result**: Fully serverless, auto-scaling, cost-effective

**I will**:
1. ✅ Setup AWS Amplify infrastructure
2. ✅ Migrate backend to Lambda functions
3. ✅ Setup RDS PostgreSQL database
4. ✅ Configure Cognito authentication
5. ✅ Deploy frontend to Amplify Hosting
6. ✅ End-to-end testing
7. ✅ Documentation

### Option B: Containerized Backend
**Timeline**: 2-3 days
**Effort**: Low
**Result**: Easier migration, less refactoring

**I will**:
1. ✅ Containerize Express backend
2. ✅ Deploy to AWS App Runner
3. ✅ Setup RDS PostgreSQL
4. ✅ Deploy frontend to Amplify Hosting
5. ✅ Testing

### Option C: Keep Current Backend + Amplify Frontend Only
**Timeline**: 1 day
**Effort**: Minimal
**Result**: Frontend on Amplify, backend unchanged

## 💡 My Recommendation

**Choose Option A - Full Serverless**

**Why?**
1. **Future-proof**: Modern serverless architecture
2. **Cost-effective**: Pay per use, scale to zero
3. **Production-ready**: Enterprise-grade reliability
4. **Best practices**: Industry standard architecture
5. **Full AWS integration**: Leverage all AWS services

**Your backend is already well-structured**, migration to Lambda will be straightforward.

## ❓ Decision Time

Bạn muốn chọn option nào?

- **A**: Full Serverless (Lambda + RDS) - Recommended ⭐
- **B**: Containerized (App Runner)
- **C**: Frontend only (keep current backend)

Hoặc bạn có câu hỏi gì về từng option?
