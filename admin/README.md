# Portfolio CMS Admin Panel

React + TypeScript + Vite + Material-UI + AWS Amplify Gen 2

## 🚀 Features

### ✅ Phase 1 - Core MVP (COMPLETED)
- **Authentication**: Cognito-based login/logout
- **Dashboard**: Stats overview (posts, projects, views, messages)
- **Blog Management**: Full CRUD operations
- **Responsive Layout**: Mobile-friendly sidebar & navigation
- **Protected Routes**: Authentication-required pages
- **Material-UI**: Professional admin interface

### ✅ Phase 2 - Rich Features (COMPLETED)
- **Rich Text Editor**: React Quill with full formatting toolbar
  - Headers, fonts, colors, alignment
  - Lists, quotes, code blocks
  - Links, images, videos
  - Clean paste from Word/Google Docs
- **Media Library**: Full S3 integration
  - Drag & drop file upload
  - Image preview grid
  - Copy URL to clipboard
  - Delete files
  - File size display
- **Project Management**: Complete CRUD
  - Card-based list view
  - Rich text descriptions
  - Technology autocomplete
  - Featured projects
  - GitHub + Live URLs
  - Project status tracking
- **Enhanced Dashboard**: Charts & analytics
  - Bar chart for content overview
  - Quick action buttons
  - Real-time stats
- **Contact Messages**: Full inbox
  - Table view with filters
  - New/Read status tracking
  - View message details
  - Reply via email button
  - Delete messages

### 🔄 Phase 3 - Coming Soon
- Skills, Certifications, Achievements CRUD
- Advanced search & filter across all content
- Bulk operations (multi-select delete/publish)
- User management with roles
- Activity audit logs
- Export/Import data (CSV/JSON)

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx
│   │   └── layout/
│   │       └── AdminLayout.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   └── LoginPage.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx
│   │   └── blog/
│   │       ├── BlogListPage.tsx
│   │       ├── BlogCreatePage.tsx
│   │       └── BlogEditPage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🛠️ Installation

```bash
cd admin
npm install
```

## 🚀 Development

```bash
# Start dev server (port 3001)
npm run dev

# Type checking
npm run type-check

# Lint
npm run lint

# Build for production
npm run build
```

## 🔑 Authentication

The CMS uses AWS Cognito for authentication. You need to:

1. **Create admin user** in Cognito:
   ```bash
   # From project root
   aws cognito-idp admin-create-user \
     --user-pool-id <YOUR_USER_POOL_ID> \
     --username admin@example.com \
     --user-attributes Name=email,Value=admin@example.com \
     --temporary-password TempPassword123!
   ```

2. **Login** at http://localhost:3001/login

3. **Change password** on first login

## 📊 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool (fast HMR)
- **Material-UI v6** - Component library
- **React Router v6** - Client-side routing
- **AWS Amplify Gen 2** - Backend integration
- **Zustand** - State management
- **TanStack Query** - Server state
- **React Hook Form + Zod** - Form handling & validation
- **date-fns** - Date formatting
- **Recharts** - Charts (for analytics)

## 🔐 Security

- Protected routes with authentication check
- Automatic redirect to login if unauthenticated
- Secure session management via Amplify
- HTTPS only in production
- No credentials in code

## 📝 Usage

### Creating a Blog Post

1. Navigate to **Blog Posts** in sidebar
2. Click **Create Post**
3. Fill in:
   - Title (required)
   - Slug (auto-generated from title)
   - Content (required, supports Markdown)
   - Category (optional)
   - Tags (comma-separated)
4. Toggle **Publish immediately** to make live
5. Toggle **Featured post** to highlight
6. Click **Create Post**

### Editing a Blog Post

1. Navigate to **Blog Posts**
2. Click **Edit icon** on post row
3. Update fields
4. Click **Save Changes**

### Dashboard

- View total posts, projects, views, messages
- Quick stats overview
- Recent activity (coming soon)

## 🚧 Roadmap

### Phase 2 (Next 2 weeks)
- [ ] Rich text editor integration
- [ ] Media library (S3 browser + upload)
- [ ] Project management CRUD
- [ ] Skills management
- [ ] Certifications management

### Phase 3 (Week 5-6)
- [ ] Analytics with charts
- [ ] Contact inbox with status tracking
- [ ] Search & filter across all content
- [ ] Bulk operations (delete, publish)
- [ ] User management (roles)

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npm run dev
```

### Authentication not working
- Check `amplify_outputs.json` exists in parent directory
- Ensure Amplify backend is deployed
- Verify Cognito user exists

### TypeScript errors
```bash
npm run type-check
```

## 📖 Documentation

- [Amplify Gen 2 Docs](https://docs.amplify.aws)
- [Material-UI Docs](https://mui.com)
- [React Router Docs](https://reactrouter.com)

## 👤 Author

Kha Van Hoang - Cloud Solutions Architect

## 📄 License

MIT
