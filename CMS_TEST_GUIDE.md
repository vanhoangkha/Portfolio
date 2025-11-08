# Portfolio CMS - Testing Guide

## 🎯 Quick Start

### Access CMS
1. **URL**: http://localhost:3003
2. **Login Credentials**:
   - Email: `admin@khavan.com`
   - Password: `Portfolio@Admin2025!`
3. **First Login**: You'll be prompted to change password

---

## 📊 Sample Data Overview

The database has been seeded with:

### Blog Posts (5 articles)
1. **Getting Started with AWS CDK** (Featured)
   - Category: Cloud
   - Tags: AWS, CDK, Infrastructure as Code
   - 245 views

2. **Building Scalable APIs with AWS Lambda** (Featured)
   - Category: Cloud
   - Tags: AWS, Lambda, Serverless
   - 189 views

3. **Mastering Kubernetes StatefulSets**
   - Category: DevOps
   - Tags: Kubernetes, StatefulSets
   - 167 views

4. **AI/ML Model Deployment with SageMaker** (Featured)
   - Category: AI/ML
   - Tags: AWS, SageMaker, Machine Learning
   - 203 views

5. **DevSecOps Best Practices**
   - Category: DevSecOps
   - Tags: Security, DevOps, CI/CD
   - 178 views

### Projects (5 projects)
1. **Cloud-Native E-commerce Platform** (Featured, Completed)
   - Technologies: AWS Lambda, DynamoDB, API Gateway, React
   - GitHub + Live Demo links included

2. **Kubernetes Multi-Cluster Management** (Featured, Completed)
   - Technologies: Kubernetes, ArgoCD, Istio, Terraform

3. **AI-Powered Code Review Assistant** (Featured, Completed)
   - Technologies: Python, OpenAI, FastAPI, Docker

4. **Real-time Analytics Dashboard** (In Progress)
   - Technologies: Kafka, Flink, ClickHouse, Next.js

5. **Serverless Blog Platform** (Featured, In Progress)
   - Technologies: React, AWS Amplify, TypeScript, DynamoDB

### Skills (10 skills)
- AWS (95%), Kubernetes (90%), TypeScript (88%)
- Python (85%), Docker (92%), Terraform (87%)
- React (86%), Node.js (84%), PostgreSQL (82%)
- GraphQL (80%)

### Messages (1 sample)
- From: John Doe
- Subject: Interested in collaboration
- Status: New

---

## ✅ Testing Checklist

### 1. Authentication
- [ ] Login with credentials
- [ ] Change password on first login
- [ ] Verify redirect to dashboard after login
- [ ] Test logout functionality
- [ ] Verify redirect to login when not authenticated

### 2. Dashboard (/)
- [ ] View all stat cards (Posts, Projects, Views, Messages)
- [ ] Verify bar chart displays correctly
- [ ] Test quick action buttons:
  - [ ] New Blog Post → redirects to /blog/create
  - [ ] New Project → redirects to /projects/create
  - [ ] Upload Media → redirects to /media
  - [ ] View Messages → redirects to /messages

### 3. Blog Management (/blog)

#### List View
- [ ] Verify 5 blog posts are displayed
- [ ] Check "Featured" badges on 3 posts
- [ ] Check "Published" status chips
- [ ] Verify view counts display
- [ ] Test search/filter (if implemented)

#### Create New Post (/blog/create)
- [ ] Fill in title → verify slug auto-generates
- [ ] Test Rich Text Editor:
  - [ ] Bold, italic, underline text
  - [ ] Create headers (H1-H6)
  - [ ] Create bullet lists and numbered lists
  - [ ] Add code blocks
  - [ ] Insert links
  - [ ] Add images (use Media Library URL)
  - [ ] Test clean paste from Word/Google Docs
- [ ] Add excerpt
- [ ] Select category
- [ ] Add tags (comma-separated)
- [ ] Toggle "Publish immediately"
- [ ] Toggle "Featured post"
- [ ] Click "Create Post"
- [ ] Verify redirect to blog list
- [ ] Verify new post appears

#### Edit Post (/blog/edit/:id)
- [ ] Click edit icon on any post
- [ ] Verify form pre-fills with existing data
- [ ] Modify content in Rich Text Editor
- [ ] Change tags/category
- [ ] Toggle published/featured status
- [ ] Click "Save Changes"
- [ ] Verify changes are saved
- [ ] Verify redirect to blog list

#### Delete Post
- [ ] Click delete icon
- [ ] Confirm deletion dialog
- [ ] Verify post is removed from list

### 4. Project Management (/projects)

#### List View
- [ ] Verify 5 projects display as cards
- [ ] Check project images
- [ ] Verify technology chips display
- [ ] Check "Featured" badges
- [ ] Verify status displays (Completed/In Progress)
- [ ] Test GitHub and Live URL links

#### Create New Project (/projects/create)
- [ ] Enter project title
- [ ] Enter slug
- [ ] Add short description
- [ ] Use Rich Text Editor for long description
- [ ] Select category
- [ ] Add technologies using autocomplete:
  - [ ] Type "React" → select from dropdown
  - [ ] Type custom technology → press Enter
- [ ] Select status (Completed/In Progress/Planned)
- [ ] Add featured image URL
- [ ] Add GitHub URL
- [ ] Add Live Demo URL
- [ ] Toggle "Featured project"
- [ ] Click "Create Project"
- [ ] Verify redirect and new project appears

#### Edit Project (/projects/edit/:id)
- [ ] Click edit icon on any project
- [ ] Verify all fields pre-fill correctly
- [ ] Modify long description with Rich Text Editor
- [ ] Change technologies
- [ ] Update status
- [ ] Click "Save Changes"
- [ ] Verify changes saved

#### Delete Project
- [ ] Click delete icon
- [ ] Confirm deletion
- [ ] Verify project removed

### 5. Media Library (/media)

#### Upload Files
- [ ] Drag and drop image file
- [ ] Verify upload progress
- [ ] Verify file appears in grid after upload
- [ ] Click "Browse" to select multiple files
- [ ] Upload multiple images simultaneously
- [ ] Verify all files appear in grid

#### Manage Files
- [ ] View uploaded files in grid layout
- [ ] Check file size displays correctly
- [ ] Click "Copy URL" → verify URL copied to clipboard
- [ ] Paste URL in browser → verify image loads from S3
- [ ] Click trash icon to delete file
- [ ] Confirm deletion
- [ ] Verify file removed from grid

#### Integration Test
- [ ] Upload image in Media Library
- [ ] Copy image URL
- [ ] Go to Blog Create
- [ ] Insert image in Rich Text Editor using copied URL
- [ ] Save post
- [ ] Verify image displays in post

### 6. Contact Messages (/messages)

#### List View
- [ ] Verify sample message appears
- [ ] Check "New" badge/highlight
- [ ] Verify sender name, email, subject display
- [ ] Check timestamp formatting

#### View Message
- [ ] Click "View" icon
- [ ] Verify dialog opens with full message
- [ ] Check all fields display: name, email, subject, message, date
- [ ] Verify message status changes to "Read"
- [ ] Close dialog

#### Mark as Read
- [ ] Click "Mark as Read" icon
- [ ] Verify status changes from "New" to "Read"
- [ ] Verify row highlight/styling changes

#### Reply to Message
- [ ] Click "Reply via Email" button
- [ ] Verify default email client opens
- [ ] Check "To:" field pre-fills with sender email
- [ ] Check "Subject:" pre-fills with "Re: [original subject]"

#### Delete Message
- [ ] Click delete icon
- [ ] Confirm deletion
- [ ] Verify message removed from list

---

## 🐛 Common Issues & Solutions

### Issue: "Authentication failed"
**Solution**: Clear browser cookies and try logging in again

### Issue: "Failed to load data"
**Solution**: Check that Amplify Sandbox is running (should see logs in terminal)

### Issue: Image upload fails
**Solution**:
1. Check file size (max 5MB recommended)
2. Verify S3 bucket permissions in amplify_outputs.json
3. Check browser console for errors

### Issue: Rich Text Editor not loading
**Solution**:
1. Refresh the page
2. Check browser console for React Quill errors
3. Verify admin dev server is running

### Issue: Changes not saving
**Solution**:
1. Check browser network tab for API errors
2. Verify Amplify Sandbox backend is running
3. Check DynamoDB table permissions

---

## 📱 Mobile Testing

Test responsive design on different viewports:

1. **Desktop** (1920x1080)
   - Sidebar always visible
   - Full width content area

2. **Tablet** (768x1024)
   - Collapsible sidebar
   - Mobile drawer navigation

3. **Mobile** (375x667)
   - Hamburger menu
   - Stack layout for forms
   - Touch-friendly buttons

---

## 🔍 Backend Verification

### Check DynamoDB Tables
```bash
# List all items in BlogPost table
aws dynamodb scan --table-name BlogPost-<table-suffix>

# List all projects
aws dynamodb scan --table-name Project-<table-suffix>
```

### Check S3 Bucket
```bash
# List uploaded files
aws s3 ls s3://amplify-portfolio-ubuntu--portfolioassetsbucket4cf-9acpsbphhwvf/blog-images/
```

### Check AppSync API
- Endpoint: https://3pnzpjip2bcilanfdfi5h4xbxa.appsync-api.us-east-1.amazonaws.com/graphql
- Test queries in AWS AppSync Console

---

## 🎓 Learning Opportunities

While testing, observe:

1. **Real-time Data Sync**: Changes in CMS reflect immediately (AppSync subscriptions)
2. **Optimistic UI Updates**: UI updates before server confirmation
3. **Error Handling**: How errors are displayed to users
4. **Loading States**: Skeleton screens and spinners
5. **Form Validation**: Required fields and data types

---

## ✅ Sign-off Criteria

CMS is production-ready when:
- [ ] All authentication flows work correctly
- [ ] CRUD operations work for all entities
- [ ] File uploads work reliably
- [ ] No console errors in normal operation
- [ ] Mobile responsive design works
- [ ] All links and buttons functional
- [ ] Data persists across page refreshes
- [ ] Error messages are user-friendly

---

## 🚀 Next Steps After Testing

1. **Deploy to Production**
   - Run `npx ampx pipeline-deploy --branch main`
   - Configure custom domain
   - Set up SSL certificate

2. **Add More Features**
   - Skills management CRUD
   - Certifications management
   - Analytics dashboard
   - User roles and permissions

3. **Optimize Performance**
   - Add caching layers
   - Optimize image loading
   - Implement pagination
   - Add search functionality

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check terminal for backend errors
3. Verify all services are running:
   - Amplify Sandbox (terminal 1)
   - CMS Dev Server (terminal 2)

**Backend Status**: http://localhost:3003
**Amplify Sandbox**: Running in background
**Database**: DynamoDB (us-east-1)
**Storage**: S3 (us-east-1)
