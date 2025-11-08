# Architecture Documentation

## Overview

This portfolio project follows international standard monorepo architecture with clear separation of concerns, enabling scalability, maintainability, and ease of collaboration.

## Table of Contents

- [Project Structure](#project-structure)
- [Architecture Patterns](#architecture-patterns)
- [Technology Stack](#technology-stack)
- [Design Decisions](#design-decisions)
- [Deployment Architecture](#deployment-architecture)
- [Development Workflow](#development-workflow)

## Project Structure

### High-Level Organization

```
Portfolio/
├── apps/                   # Application layer
├── packages/              # Shared libraries
├── infrastructure/        # Infrastructure as Code
├── tests/                 # Testing suites
├── scripts/               # Automation scripts
├── docs/                  # Documentation
└── .github/              # CI/CD workflows
```

### Apps Layer

**Location**: `apps/`

Contains all deployable applications:

#### apps/web/
- **Type**: Static website (HTML/CSS/JavaScript)
- **Purpose**: Public-facing portfolio and blog
- **Features**:
  - Progressive Web App (PWA)
  - Dark/Light mode
  - Responsive design
  - SEO optimized
- **Deployment**: AWS Amplify Hosting + CloudFront CDN

#### apps/admin/
- **Type**: React + TypeScript SPA
- **Purpose**: Content Management System
- **Features**:
  - Blog post management
  - Project showcase management
  - Analytics dashboard
  - User authentication
- **Framework**: Vite + React 18
- **Deployment**: AWS Amplify Hosting

### Packages Layer

**Location**: `packages/`

Shared code reused across applications:

#### packages/types/
- **Purpose**: Centralized TypeScript type definitions
- **Contents**:
  - Data model interfaces (User, BlogPost, Project, etc.)
  - API response types
  - Utility types
- **Consumers**: All TypeScript applications
- **Build**: TypeScript compiler

#### packages/utils/
- **Purpose**: Shared utility functions
- **Contents**:
  - Date formatting
  - String manipulation (slugify, truncate, etc.)
  - Validation (email, URL)
  - Array/Object utilities
  - Performance utilities (debounce, throttle)
  - Local storage helpers
- **Consumers**: Web app, Admin dashboard
- **Build**: TypeScript compiler

#### packages/config/
- **Purpose**: Application configuration and constants
- **Contents**:
  - Environment configuration
  - API configuration
  - AWS Amplify settings
  - Feature flags
  - SEO configuration
  - Routes
- **Consumers**: All applications
- **Build**: TypeScript compiler

### Infrastructure Layer

**Location**: `infrastructure/`

Infrastructure as Code and backend services:

#### infrastructure/amplify/
- **Type**: AWS Amplify Gen 2 (TypeScript-based IaC)
- **Purpose**: Serverless backend infrastructure
- **Components**:
  - `auth/` - Amazon Cognito configuration
  - `data/` - GraphQL schema + DynamoDB models
  - `storage/` - S3 bucket configuration
  - `functions/` - AWS Lambda functions
- **Deployment**: AWS CDK (via Amplify CLI)

**Resources Created**:
- Amazon Cognito User Pool
- AWS AppSync GraphQL API
- 7 DynamoDB tables
- AWS Lambda functions
- 3 S3 buckets (public, protected, private)
- Amazon SES (email notifications)

### Testing Layer

**Location**: `tests/`

Comprehensive testing strategy:

#### tests/unit/
- **Framework**: Jest + ts-jest
- **Purpose**: Test individual functions and modules
- **Scope**: Packages, utilities, business logic
- **Run**: `npm run test:unit`

#### tests/integration/
- **Framework**: Jest
- **Purpose**: Test API integrations and backend interactions
- **Scope**: GraphQL API, DynamoDB, Lambda functions
- **Run**: `npm run test:integration`

#### tests/e2e/
- **Framework**: Playwright
- **Purpose**: End-to-end user flow testing
- **Scope**: Complete user journeys across applications
- **Run**: `npm run test:e2e`

## Architecture Patterns

### Monorepo Pattern

**Why Monorepo?**
- **Code Sharing**: Reuse types, utilities, and configurations
- **Atomic Changes**: Update shared code and consumers in one commit
- **Simplified Dependencies**: Single node_modules at root
- **Consistent Tooling**: Shared linting, formatting, testing
- **Easier Refactoring**: IDE can find all usages across packages

**Implementation**: npm workspaces

### Separation of Concerns

**Layers**:
1. **Presentation** (apps/web, apps/admin)
2. **Business Logic** (packages/utils, Lambda functions)
3. **Data** (infrastructure/amplify/data)
4. **Infrastructure** (infrastructure/amplify)

### Serverless Architecture

**Principles**:
- No server management
- Auto-scaling
- Pay-per-use pricing
- High availability
- Global distribution

**Services**:
- **Compute**: AWS Lambda
- **API**: AWS AppSync (GraphQL)
- **Database**: Amazon DynamoDB
- **Auth**: Amazon Cognito
- **Storage**: Amazon S3
- **Email**: Amazon SES
- **CDN**: Amazon CloudFront

### Infrastructure as Code (IaC)

**Tool**: AWS Amplify Gen 2 (TypeScript-based)

**Benefits**:
- Version controlled infrastructure
- Reproducible deployments
- Type-safe configuration
- Automated resource provisioning
- Environment parity (dev/staging/prod)

## Technology Stack

### Frontend

**Web App** (apps/web):
- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+)
- Service Workers (PWA)

**Admin Dashboard** (apps/admin):
- React 18
- TypeScript 5
- Vite (build tool)
- React Router
- AWS Amplify UI Components

### Backend

- **Language**: TypeScript
- **Runtime**: Node.js 20
- **Framework**: AWS Amplify Gen 2
- **API**: GraphQL (AWS AppSync)
- **Database**: DynamoDB (NoSQL)
- **Auth**: Cognito (OAuth2/OIDC)
- **Functions**: Lambda (Node.js 20)

### DevOps

- **CI/CD**: GitHub Actions
- **Hosting**: AWS Amplify Hosting
- **Monitoring**: AWS CloudWatch
- **Package Manager**: npm (with workspaces)
- **Linting**: ESLint
- **Formatting**: Prettier

### Testing

- **Unit**: Jest + ts-jest
- **Integration**: Jest + AWS SDK
- **E2E**: Playwright
- **Coverage**: Jest coverage reports

## Design Decisions

### Why Vanilla JS for Web App?

**Rationale**:
1. **Performance**: No framework overhead, faster load times
2. **Simplicity**: Static content doesn't need React complexity
3. **SEO**: Direct HTML, no SSR needed
4. **Bundle Size**: Minimal JavaScript footprint
5. **Learning**: Demonstrates core web fundamentals

**Trade-offs**:
- Manual DOM manipulation
- No component reusability (mitigated by template literals)
- Less structured state management

### Why React for Admin Dashboard?

**Rationale**:
1. **Complexity**: CMS requires complex state management
2. **Interactivity**: Rich forms, real-time updates
3. **Ecosystem**: AWS Amplify UI components
4. **Developer Experience**: Fast iteration with HMR
5. **Type Safety**: TypeScript integration

### Why AWS Amplify?

**Rationale**:
1. **Full-Stack**: Frontend + Backend in one platform
2. **TypeScript IaC**: Type-safe infrastructure configuration
3. **Auto-Generated API**: GraphQL schema → API + types
4. **Managed Services**: Less operational overhead
5. **Git-based Deployment**: Push to deploy

**Alternatives Considered**:
- **Vercel + Supabase**: Chose Amplify for deeper AWS integration
- **AWS CDK alone**: Amplify provides higher-level abstractions
- **Serverless Framework**: Amplify Gen 2 offers better DX

### Why DynamoDB?

**Rationale**:
1. **Serverless**: No server provisioning
2. **Scalability**: Auto-scaling read/write capacity
3. **Performance**: Single-digit millisecond latency
4. **Integration**: Native AppSync integration
5. **Cost**: Pay-per-request pricing

**Data Model**: 7 tables
- BlogPost
- Project
- Skill
- Certification
- Achievement
- CommunityActivity
- ContactSubmission

### Why GraphQL?

**Rationale**:
1. **Flexibility**: Clients fetch exactly what they need
2. **Type Safety**: Auto-generated types from schema
3. **Real-time**: Built-in subscriptions
4. **Tooling**: GraphQL playground, introspection
5. **AWS Integration**: AppSync provides managed GraphQL

## Deployment Architecture

### Production Architecture

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────┐
│   Amazon CloudFront (CDN)    │
│   - Global edge locations    │
│   - HTTPS/SSL termination    │
│   - Caching                  │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│   Web App   │  │Admin  Dashboard│
│ (Amplify)   │  │  (Amplify)   │
└─────────────┘  └──────┬────────┘
                        │
                        ▼
                ┌───────────────────┐
                │  AWS AppSync      │
                │  GraphQL API      │
                └───────┬───────────┘
                        │
         ┌──────────────┼──────────────┐
         │              │              │
         ▼              ▼              ▼
┌────────────┐  ┌────────────┐ ┌──────────┐
│  Cognito   │  │  DynamoDB  │ │ Lambda   │
│  (Auth)    │  │ (7 tables) │ │Functions │
└────────────┘  └────────────┘ └──────────┘
```

### Deployment Environments

**Development**:
- Amplify Sandbox (temporary cloud resources)
- Local frontend with hot-reload
- Separate DynamoDB tables

**Staging** (optional):
- Dedicated Amplify environment
- Separate backend stack
- Production-like configuration

**Production**:
- Amplify Hosting (master branch)
- Full backend stack
- CloudFront distribution
- Custom domain (optional)

### CI/CD Pipeline

**Trigger**: Git push to master/main

**Steps**:
1. **Lint & Format**: ESLint + Prettier checks
2. **Type Check**: TypeScript compilation
3. **Unit Tests**: Jest tests for packages
4. **Build Packages**: Compile TypeScript packages
5. **Build Frontend**: Bundle and optimize assets
6. **Build Backend**: Lambda function compilation
7. **Integration Tests**: API and backend tests
8. **Deploy Backend**: Amplify backend deployment
9. **Deploy Frontend**: Amplify hosting deployment
10. **E2E Tests**: Playwright tests on deployed site
11. **Notify**: Deployment status notification

## Development Workflow

### Initial Setup

```bash
# Clone repository
git clone https://github.com/vanhoangkha/Portfolio.git
cd Portfolio

# Install all dependencies (monorepo)
npm install

# Build shared packages
npm run build:packages
```

### Local Development

```bash
# Terminal 1: Start backend sandbox
npm run sandbox

# Terminal 2: Start web app
npm run dev:web

# Terminal 3: Start admin dashboard (optional)
npm run dev:admin
```

### Making Changes

**When updating shared packages**:
```bash
# 1. Make changes in packages/types, packages/utils, or packages/config
# 2. Rebuild the package
cd packages/types
npm run build

# 3. Changes are immediately available to apps
```

**When updating infrastructure**:
```bash
# Amplify sandbox auto-reloads on changes
# No manual restart needed
```

### Testing Workflow

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode (unit tests)
cd tests/unit
npm run test:watch
```

### Deployment Workflow

**Automatic** (recommended):
```bash
git add .
git commit -m "feat: add new feature"
git push origin master
# CI/CD pipeline automatically deploys
```

**Manual** (backend only):
```bash
npm run deploy:backend
```

## Best Practices

### Code Organization

1. **Keep packages focused**: Each package has single responsibility
2. **Avoid circular dependencies**: Packages should not import from apps
3. **Use absolute imports**: Configure tsconfig paths for clean imports
4. **Co-locate tests**: Keep tests near the code they test

### State Management

**Web App** (Vanilla JS):
- Use module pattern for state
- Leverage browser APIs (localStorage, sessionStorage)
- Event-driven architecture for updates

**Admin Dashboard** (React):
- React hooks for local state
- Context API for global state
- AWS Amplify DataStore for sync

### Performance

**Frontend**:
- Lazy load images
- Code splitting (admin dashboard)
- Service worker caching
- Minify assets in production

**Backend**:
- DynamoDB query optimization
- Lambda cold start optimization
- AppSync caching
- S3 CloudFront caching

### Security

**Authentication**:
- Cognito for user management
- JWT tokens for API auth
- MFA support available

**Authorization**:
- AppSync authorization modes
- IAM policies for Lambda
- S3 bucket policies

**Data Protection**:
- HTTPS everywhere (CloudFront)
- Encrypted at rest (DynamoDB, S3)
- Encrypted in transit (TLS 1.2+)

## Migration Guide

If migrating from the old structure, see the [Migration Guide](./docs/MIGRATION_GUIDE.md).

## Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [Monorepo Tools](https://monorepo.tools/)

## Support

For questions or issues:
- GitHub Issues: [Portfolio Issues](https://github.com/vanhoangkha/Portfolio/issues)
- Documentation: [docs/](./docs/)
- Email: contact@khavan.dev
