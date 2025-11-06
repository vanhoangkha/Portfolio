# 🚀 Quick Start Guide

## View Your Portfolio NOW!

### Option 1: View Frontend Locally

```bash
# Portfolio is already running at:
open http://localhost:8080
# or
curl http://localhost:8080
```

### Option 2: Restart Everything

```bash
# 1. Start PostgreSQL Database
cd /home/ubuntu/Portfolio
docker compose up -d postgres

# 2. Start Backend API
cd backend
npm run dev
# Backend will run at: http://localhost:5000

# 3. Start Frontend Server
cd ../frontend
python3 -m http.server 8080
# Frontend will run at: http://localhost:8080
```

---

## 🎯 What You Can Do

### 1. Browse the Portfolio

Open http://localhost:8080 in your browser to see:

- ✅ **Hero Section** with animated intro
- ✅ **Skills Matrix** with proficiency bars (Basic/Intermediate/Expert)
- ✅ **Work Experience** in STAR format
- ✅ **Projects Showcase** with metrics
- ✅ **Certifications** with badges
- ✅ **Achievements** and awards
- ✅ **Tech Stack** visualization (28 technologies)
- ✅ **Community Activities** timeline
- ✅ **Testimonials** carousel
- ✅ **Blog** integration
- ✅ **Contact** form

### 2. Try the Search

- Press **Ctrl+K** (or Cmd+K on Mac) to open global search
- Search for:
  - Skills: "AWS", "Python", "Kubernetes"
  - Projects: "CloudThinker", "GenAI"
  - Blog posts: any keyword

### 3. Test Filters

- Go to **Skills section** → Click filter buttons:
  - All / Technical / Soft Skills / Expert Only
- Go to **Projects section** → Filter by Featured

### 4. Toggle Dark Mode

- Click the **moon/sun icon** in the navigation bar
- Theme persists across page reloads

---

## 📡 API Testing

### Health Check
```bash
curl http://localhost:5000/health
```

### Get All Portfolio Data
```bash
curl http://localhost:5000/api/v1/portfolio/complete | jq .
```

### Get Specific Sections
```bash
# Skills
curl http://localhost:5000/api/v1/portfolio/skills | jq .

# Certifications
curl http://localhost:5000/api/v1/portfolio/certifications | jq .

# Testimonials
curl http://localhost:5000/api/v1/portfolio/testimonials | jq .

# Tech Stack
curl http://localhost:5000/api/v1/portfolio/tech-stack | jq .

# Community Activities
curl http://localhost:5000/api/v1/portfolio/community-activities | jq .
```

---

## 📝 Edit Content

### Update Skills

```bash
# Edit the seed file
nano database/seed_enhancements.sql

# Reload database
docker exec -i portfolio-db psql -U postgres -d portfolio_db < database/seed_enhancements.sql

# Refresh browser to see changes
```

### Add New Projects

```sql
-- Add to database/seed_enhancements.sql
INSERT INTO projects (title, slug, description, technologies, github_url, featured)
VALUES (
    'My New Project',
    'my-new-project',
    'Amazing project description',
    ARRAY['AWS', 'Python', 'Docker'],
    'https://github.com/username/project',
    true
);
```

---

## 🎨 Customize Design

### Change Primary Color

Edit `frontend/portfolio-enhanced.css`:

```css
:root {
    --primary-color: #FF9900; /* Change to your brand color */
}
```

### Update Personal Info

Edit `frontend/index.html`:
- Hero section (line ~60)
- About section (line ~126)
- Contact section (line ~975)

---

## 🔧 Troubleshooting

### Backend Not Working?

```bash
# Check if it's running
curl http://localhost:5000/health

# If not, restart it
cd /home/ubuntu/Portfolio/backend
npm run dev
```

### Database Connection Issues?

```bash
# Check if PostgreSQL is running
docker ps | grep portfolio-db

# If not running, start it
docker compose up -d postgres

# Check logs
docker logs portfolio-db
```

### Frontend Not Loading Data?

1. Open browser DevTools (F12)
2. Check Console for errors
3. Verify API is accessible:
   ```bash
   curl http://localhost:5000/health
   ```
4. Check CORS settings in `backend/.env`

---

## 📊 View Performance Metrics

Open browser console (F12) to see:

```
✅ Portfolio utilities initialized
Loading portfolio data...
⏱️ portfolioLoad: 250.45ms
✅ Portfolio loaded successfully!
```

---

## 🚀 Deploy to Production

### AWS Deployment (Recommended)

1. **Backend**: Deploy to ECS/Fargate
2. **Database**: Use RDS PostgreSQL
3. **Frontend**: Deploy to S3 + CloudFront
4. **Domain**: Configure Route 53

See `DEPLOYMENT.md` for detailed instructions.

### Quick Deploy with Docker

```bash
# Build and run everything
docker compose up -d --build

# Access at:
# Frontend: http://localhost
# Backend: http://localhost:3000
```

---

## 📚 Documentation

- **PORTFOLIO_COMPREHENSIVE.md** - Complete feature documentation
- **DEVELOPMENT_SUMMARY.md** - Development process and metrics
- **README_FULLSTACK.md** - Full-stack architecture guide

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl/Cmd + K** | Open search |
| **Escape** | Close search/modals |
| **Tab** | Navigate form fields |
| **Scroll** | Auto-update active nav item |

---

## 💡 Tips

1. **Offline Support**: Data is cached in localStorage for offline viewing
2. **Error Recovery**: Click "Retry" button if data fails to load
3. **Smooth Scroll**: Click any navigation link for smooth scrolling
4. **Search Everything**: Use Ctrl+K to search across all sections
5. **Filter Skills**: Use filter buttons to view specific skill categories

---

## 🎯 Next Steps

### 1. Customize Content
- Update personal information
- Add your projects and achievements
- Customize colors and branding

### 2. Test Thoroughly
- Test on different devices
- Check all sections load correctly
- Verify API endpoints work

### 3. Deploy
- Choose hosting provider
- Configure domain
- Set up SSL certificate
- Monitor performance

### 4. Share
- Add to your resume
- Share on LinkedIn
- Include in job applications
- Send to potential clients

---

## 🆘 Need Help?

### Check Logs

```bash
# Backend logs
docker logs -f portfolio-backend

# Database logs
docker logs -f portfolio-db

# Check running processes
ps aux | grep node
```

### Common Issues

**Q: Search not working?**
A: Ensure `portfolio-utils.js` is loaded before `search-filter.js`

**Q: Sections not rendering?**
A: Check browser console for API errors. Verify backend is running.

**Q: Dark mode not saving?**
A: Check browser localStorage is enabled.

---

## 📞 Support

For questions or issues:
- Check documentation files
- Review browser console
- Check backend logs
- Verify all services are running

---

**Version**: 2.0.0
**Status**: ✅ Production Ready

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
