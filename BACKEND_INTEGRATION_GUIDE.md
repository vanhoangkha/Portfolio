# Backend Integration Guide

## 🎯 Overview

This guide explains how the portfolio frontend connects to the AWS Amplify backend to display dynamic data from the CMS.

---

## 📁 Files Created

### API Modules (`frontend/js/api/`)

1. **blog.js** - Blog post operations
   - `getBlogPosts()` - Fetch all published posts
   - `getBlogPostBySlug()` - Get single post by slug
   - `incrementViewCount()` - Track post views
   - `getBlogCategories()` - Get categories with counts

2. **projects.js** - Project operations
   - `getProjects()` - Fetch all projects
   - `getProjectBySlug()` - Get single project
   - `getTechnologies()` - Get all technologies

3. **contact.js** - Contact form
   - `submitContactForm()` - Submit contact message

### Configuration (`frontend/js/config/`)

4. **amplify-config.js** - Amplify initialization
   - Configures Amplify with backend settings
   - Uses `amplify_outputs.json` for config

### Integration (`frontend/js/`)

5. **backend-integration.js** - Main integration module
   - Initializes all APIs
   - Handles dynamic data loading
   - Provides global `window.portfolioAPI` object

---

## 🚀 Integration Approaches

### Option 1: Module Bundling (Recommended for Production)

Bundle all modules into a single JavaScript file using Vite:

**Step 1: Create Vite Config**

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'js/backend-integration.js',
      name: 'PortfolioBackend',
      fileName: 'portfolio-backend',
      formats: ['es', 'umd']
    },
    outDir: 'dist',
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
```

**Step 2: Build**

```bash
cd frontend
npm run build
```

**Step 3: Include in HTML**

```html
<!-- Add before closing </body> -->
<script type="module" src="/dist/portfolio-backend.es.js"></script>
```

### Option 2: Direct ES Modules (Development)

Use native ES modules in modern browsers:

```html
<!-- Add before closing </body> -->
<script type="module">
  import './js/backend-integration.js';
</script>
```

### Option 3: CDN Approach (Simplest)

Use Amplify from CDN and inline the integration:

```html
<!-- Add in <head> -->
<script src="https://cdn.jsdelivr.net/npm/aws-amplify@latest/dist/aws-amplify.min.js"></script>

<!-- Add before closing </body> -->
<script>
  // Configure Amplify
  Amplify.configure({
    // Copy content from amplify_outputs.json
  });

  // Then use the API
  async function loadBlogPosts() {
    const client = Amplify.generateClient({ authMode: 'identityPool' });
    const { data } = await client.models.BlogPost.list();
    // Render posts...
  }
</script>
```

---

## 📊 Usage Examples

### Fetch Featured Blog Posts

```javascript
// Get 6 featured blog posts
const posts = await window.portfolioAPI.blog.getPosts({
  featuredOnly: true,
  limit: 6
});

// Render in UI
posts.forEach(post => {
  console.log(post.title, post.category);
});
```

### Fetch Featured Projects

```javascript
// Get featured projects
const projects = await window.portfolioAPI.projects.getProjects({
  featuredOnly: true,
  limit: 6
});

projects.forEach(project => {
  console.log(project.title, project.technologies);
});
```

### Submit Contact Form

```javascript
// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const result = await window.portfolioAPI.contact.submit({
    name: e.target.name.value,
    email: e.target.email.value,
    subject: e.target.subject.value,
    message: e.target.message.value
  });

  if (result.success) {
    alert('Message sent!');
  }
});
```

---

## 🔧 HTML Updates Needed

### 1. Update index.html

Add dynamic blog section:

```html
<!-- Replace static blog cards with: -->
<div class="featured-blog-grid" id="featured-blog">
  <!-- Will be populated by backend-integration.js -->
  <div class="loading">Loading blog posts...</div>
</div>
```

Add dynamic projects section:

```html
<!-- Replace static project cards with: -->
<div class="projects-grid" id="featured-projects">
  <!-- Will be populated by backend-integration.js -->
  <div class="loading">Loading projects...</div>
</div>
```

### 2. Update blog.html

Add blog grid container:

```html
<!-- Add category filters -->
<div class="blog-categories" id="blog-categories">
  <!-- Will be populated dynamically -->
</div>

<!-- Add blog grid -->
<div class="blog-grid" id="blog-grid">
  <!-- Will be populated by backend-integration.js -->
  <div class="loading">Loading blog posts...</div>
</div>
```

### 3. Update Contact Form

Update form to use backend submission:

```html
<form id="contactForm" onsubmit="handleContactSubmit(event)">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <input type="text" name="subject">
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

---

## 🎨 CSS Updates

Add styles for dynamic content:

```css
/* Loading state */
.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

/* Blog cards */
.blog-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.category {
  background: #FF9900;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
}

.badge.featured {
  background: #146EB4;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

/* Category filters */
.blog-categories {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn.active {
  background: #FF9900;
  color: white;
  border-color: #FF9900;
}

/* Project cards */
.project-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.project-tech {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 10px 0;
}

.tech-tag {
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85em;
}

/* Notification */
@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}
```

---

## ⚙️ Configuration

### Authentication Mode

The frontend uses **Identity Pool** authentication (unauthenticated access) for public read operations:

```javascript
const client = generateClient({
  authMode: 'identityPool'
});
```

This allows:
- ✅ Read blog posts (public)
- ✅ Read projects (public)
- ✅ Submit contact forms (public)
- ❌ Create/Edit/Delete (requires authentication)

### Data Permissions

From `amplify/data/resource.ts`:

```typescript
.authorization(allow => [
  allow.authenticated(),           // Logged-in users (CMS)
  allow.guest().to(['read'])      // Public users (Frontend)
])
```

---

## 🧪 Testing

### 1. Test API Availability

Open browser console on any page:

```javascript
// Check if API is loaded
console.log(window.portfolioAPI);

// Test blog API
const posts = await window.portfolioAPI.blog.getPosts({ limit: 5 });
console.log('Blog posts:', posts);

// Test projects API
const projects = await window.portfolioAPI.projects.getProjects({ limit: 5 });
console.log('Projects:', projects);
```

### 2. Test Contact Form

Submit a test message and check:
1. Form submission shows "Sending..."
2. Success notification appears
3. Form resets after submission
4. Message appears in CMS admin panel

### 3. Verify Dynamic Data

1. Open index.html
2. Check browser console for:
   ```
   ✅ Amplify configured successfully
   🔗 Backend Integration Active
   ⭐ Loaded X featured blog posts
   ⭐ Loaded X featured projects
   ```
3. Verify blog posts and projects display on page

---

## 🚨 Troubleshooting

### Issue: "Amplify is not defined"

**Solution**: Ensure amplify_outputs.json exists and is in the correct location.

```bash
# Check if file exists
ls /home/ubuntu/Portfolio/amplify_outputs.json
```

### Issue: "Failed to fetch data"

**Solution**: Verify Amplify Sandbox is running:

```bash
# Check sandbox status
npx ampx sandbox
```

### Issue: "Authentication failed"

**Solution**: Check Identity Pool permissions in amplify_outputs.json:

```json
{
  "auth": {
    "identity_pool_id": "us-east-1:xxx",
    "unauthenticated_identities_enabled": true
  }
}
```

### Issue: "CORS error"

**Solution**: CORS is automatically configured by Amplify. Ensure you're accessing via http://localhost or https:// (not file://).

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "aws-amplify": "^6.9.0"
  },
  "devDependencies": {
    "vite": "^5.4.21",
    "@vitejs/plugin-legacy": "^5.0.0"
  }
}
```

---

## 🔄 Development Workflow

1. **Make changes to API modules** (`frontend/js/api/*.js`)
2. **Update backend-integration.js** if needed
3. **Test locally** with Amplify Sandbox running
4. **Build for production** with `npm run build`
5. **Deploy** to hosting (S3, Amplify Hosting, etc.)

---

## 🎓 Learning Resources

- [AWS Amplify Docs](https://docs.amplify.aws)
- [Amplify Data (Gen 2)](https://docs.amplify.aws/react/build-a-backend/data/)
- [AppSync GraphQL](https://docs.aws.amazon.com/appsync/)
- [DynamoDB](https://docs.aws.amazon.com/dynamodb/)

---

## ✅ Next Steps

1. **Choose Integration Approach** (Option 1, 2, or 3)
2. **Update HTML files** with dynamic containers
3. **Add CSS** for dynamic content styling
4. **Test** on localhost with Amplify Sandbox
5. **Build** and deploy to production

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify Amplify Sandbox is running
3. Check Network tab for API calls
4. Ensure amplify_outputs.json is up-to-date

**Backend Status:**
- Amplify Sandbox: http://localhost:3000 (if applicable)
- CMS Admin: http://localhost:3003
- Database: DynamoDB (us-east-1)
- Storage: S3 (us-east-1)
