# Project Structure & Organization

This document provides a comprehensive overview of the Portfolio project structure, following international standards and best practices.

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [File Organization](#file-organization)
- [Configuration Files](#configuration-files)
- [Scripts & Automation](#scripts--automation)
- [Development Workflow](#development-workflow)
- [Standards & Best Practices](#standards--best-practices)

---

## Overview

This project follows a standard open-source structure that is widely recognized in the industry. It separates concerns clearly, provides comprehensive documentation, and includes all necessary configuration for modern development workflows.

### Key Principles

- **Separation of Concerns**: Frontend, backend, config, and scripts are clearly separated
- **Documentation First**: Comprehensive docs for contributors and users
- **Automation**: CI/CD, linting, formatting, and deployment automated
- **Security**: Security policies, vulnerability scanning, and best practices
- **Maintainability**: Clear structure, consistent code style, version control

---

## Directory Structure

```
Portfolio/
│
├── .github/                    # GitHub-specific files
│   ├── workflows/             # GitHub Actions CI/CD
│   │   ├── ci.yml            # Continuous Integration
│   │   └── deploy.yml        # Deployment workflow
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── README.md              # GitHub config documentation
│
├── backend/                    # Node.js/TypeScript API
│   ├── src/                   # Source code
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── dist/                  # Compiled output
│   ├── .env                   # Environment variables (gitignored)
│   ├── .env.example          # Example environment config
│   ├── package.json
│   └── tsconfig.json
│
├── config/                     # Configuration files
│   ├── docker-compose.yml     # Docker services
│   └── nginx.conf             # Nginx configuration
│
├── database/                   # Database files
│   ├── migrations/            # Schema migrations
│   └── seeds/                 # Seed data
│
├── docs/                       # Documentation
│   ├── API.md                 # API documentation
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── DEVELOPMENT_SUMMARY.md # Development overview
│   ├── PERFORMANCE.md         # Performance optimization
│   ├── QUICK_START.md         # Quick start guide
│   ├── PROJECT_STRUCTURE.md   # This file
│   └── [other docs]
│
├── frontend/                   # Static frontend
│   ├── assets/                # Images, fonts, icons
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── css/                   # Stylesheets
│   │   ├── main.css
│   │   ├── blog.css
│   │   ├── themes.css
│   │   └── components/
│   ├── js/                    # JavaScript modules
│   │   ├── main.js
│   │   ├── blog.js
│   │   ├── analytics.js
│   │   └── utils/
│   ├── docs/                  # Frontend-specific docs
│   ├── index.html            # Main page
│   ├── blog.html             # Blog page
│   ├── resume.html           # Resume page
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service Worker
│   ├── .env.example          # Frontend env example
│   └── README.md             # Frontend documentation
│
├── scripts/                    # Build & deployment scripts
│   ├── build.sh              # Build frontend
│   ├── deploy-s3.sh          # Deploy to S3
│   ├── deploy-aws.sh         # Full AWS deployment
│   ├── update-s3.sh          # Quick S3 update
│   ├── check-cloudfront.sh   # Check CloudFront status
│   └── README.md             # Scripts documentation
│
├── .editorconfig              # Editor configuration
├── .env                       # Root environment variables (gitignored)
├── .env.example              # Example environment config
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore rules
├── .nvmrc                    # Node version specification
├── .prettierrc               # Prettier configuration
├── CHANGELOG.md              # Version history
├── CODE_OF_CONDUCT.md        # Community guidelines
├── CONTRIBUTING.md           # Contribution guide
├── LICENSE                   # MIT License
├── package.json              # Project metadata & scripts
├── README.md                 # Main documentation
└── SECURITY.md               # Security policy
```

---

## File Organization

### Root Level Files

#### Documentation Files
- `README.md` - Main project documentation, first point of contact
- `CHANGELOG.md` - Version history following Keep a Changelog format
- `CONTRIBUTING.md` - How to contribute to the project
- `CODE_OF_CONDUCT.md` - Community guidelines (Contributor Covenant)
- `LICENSE` - MIT License
- `SECURITY.md` - Security policy and vulnerability reporting

#### Configuration Files
- `.editorconfig` - Consistent coding style across editors
- `.eslintrc.json` - JavaScript linting rules
- `.prettierrc` - Code formatting rules
- `.gitignore` - Files to ignore in version control
- `.nvmrc` - Node.js version specification
- `package.json` - Project metadata, dependencies, scripts

#### Environment Files
- `.env` - Local environment variables (gitignored)
- `.env.example` - Template for environment variables

---

## Configuration Files

### `.editorconfig`
Ensures consistent coding style across different editors and IDEs.

**Configuration:**
- UTF-8 charset
- LF line endings
- 2-space indentation
- Trim trailing whitespace

### `.eslintrc.json`
JavaScript linting configuration following industry standards.

**Features:**
- ES2021+ syntax support
- Browser and Node environments
- Recommended rules
- Custom rules for consistency

### `.prettierrc`
Code formatting configuration for automatic code styling.

**Settings:**
- 2-space indentation
- Single quotes
- Semicolons required
- 100 character line width

### `.nvmrc`
Specifies Node.js version for consistency across environments.

**Version:** 18.19.0 (LTS)

---

## Scripts & Automation

### NPM Scripts

```json
{
  "build": "Build frontend assets",
  "deploy:s3": "Deploy to S3",
  "deploy:aws": "Full AWS deployment",
  "update:s3": "Quick S3 update",
  "check:cloudfront": "Check CloudFront status",
  "dev:backend": "Start backend dev server",
  "build:backend": "Build backend",
  "start:backend": "Start backend prod server",
  "docker:up": "Start Docker services",
  "docker:down": "Stop Docker services",
  "docker:logs": "View Docker logs",
  "lint": "Run ESLint with auto-fix",
  "lint:check": "Check linting without fixing",
  "format": "Format code with Prettier",
  "format:check": "Check formatting",
  "validate": "Run all checks",
  "clean": "Clean build artifacts",
  "audit:fix": "Fix npm vulnerabilities",
  "update:deps": "Update dependencies"
}
```

### Shell Scripts

All scripts in `scripts/` directory:
- Proper error handling with `set -euo pipefail`
- Environment variable validation
- Clear progress messages
- Exit on errors
- Comprehensive logging

See `scripts/README.md` for detailed documentation.

---

## Development Workflow

### Getting Started

1. **Clone repository**
   ```bash
   git clone https://github.com/vanhoangkha/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   # Edit .env files with your configuration
   ```

4. **Start development**
   ```bash
   npm run dev:backend  # Terminal 1
   # Open frontend/index.html or use live server
   ```

### Making Changes

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   npm run lint        # Check code style
   npm run format      # Format code
   npm run build       # Test build
   ```

3. **Commit with conventional commits**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

### Code Review Process

1. PR submitted with filled template
2. Automated CI checks run (lint, test, build)
3. Code review by maintainers
4. Changes requested or approved
5. Merge to main/master
6. Automatic deployment (if configured)

---

## Standards & Best Practices

### Code Style

- **JavaScript**: ES6+ features, async/await, arrow functions
- **CSS**: BEM methodology, CSS variables, mobile-first
- **HTML**: Semantic markup, accessibility attributes
- **Commits**: Conventional commits (feat, fix, docs, etc.)

### File Naming

- **Components**: `kebab-case.js`, `ComponentName.tsx`
- **Styles**: `kebab-case.css`
- **Docs**: `UPPERCASE.md` for root, `Title_Case.md` for nested
- **Scripts**: `kebab-case.sh`

### Security

- No secrets in code
- Environment variables for config
- Input validation
- XSS/CSRF protection
- Regular dependency updates
- Security audits

### Performance

- Minified assets in production
- Lazy loading
- CDN for static assets
- Caching strategies
- Optimized images
- Code splitting

### Documentation

- Clear README files
- Inline code comments
- API documentation
- Architecture diagrams
- Setup instructions
- Troubleshooting guides

### Testing

- Unit tests for utilities
- Integration tests for features
- E2E tests for critical paths
- Performance testing
- Security testing

### Versioning

- Semantic Versioning (SemVer)
- Git tags for releases
- Changelog updates
- Migration guides for breaking changes

---

## CI/CD Pipeline

### Continuous Integration

**On every push and PR:**
1. Lint code
2. Run tests
3. Build project
4. Security audit
5. Upload artifacts

### Continuous Deployment

**On merge to main:**
1. Build production assets
2. Run final tests
3. Deploy to staging (optional)
4. Deploy to production
5. Invalidate CDN cache
6. Notify team

See `.github/README.md` for detailed workflow documentation.

---

## Additional Resources

- [Contributing Guide](../CONTRIBUTING.md)
- [Security Policy](../SECURITY.md)
- [Deployment Guide](DEPLOYMENT.md)
- [API Documentation](API.md)
- [Quick Start](QUICK_START.md)

---

## Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Review and respond to issues weekly
- [ ] Update documentation as needed
- [ ] Security audits quarterly
- [ ] Performance reviews quarterly
- [ ] Backup data regularly

### Version Releases

1. Update CHANGELOG.md
2. Bump version in package.json
3. Create git tag
4. Push tag to trigger release
5. Update documentation
6. Announce release

---

**Last Updated**: January 2025
**Version**: 1.0.0

For questions about project structure, open an issue or contact khavan.work@gmail.com.
