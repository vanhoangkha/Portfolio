# 🚀 START HERE - React Portfolio

## ✅ Setup Complete!

Your React portfolio is ready to use. All dependencies are installed and assets are copied.

## 🎯 Quick Commands

### Development
```bash
npm run dev
```
Opens http://localhost:3000 with hot reload

### Build
```bash
npm run build
```
Creates optimized production build in `dist/`

### Preview Build
```bash
npm run preview
```
Preview production build locally

### Testing
```bash
npm test              # Run tests
npm run test:ui       # Test with UI
npm run test:coverage # Coverage report
```

### Code Quality
```bash
npm run lint          # Check code
npm run format        # Format code
npm run validate      # Run all checks
```

## 📝 Customization Steps

### 1. Update Personal Information

Edit these files with your content:

**Hero Section** (`src/components/sections/HeroSection.tsx`):
- Name and title
- Description
- Metrics (50K+, 100+, 7)
- Social links
- Resume link

**About Section** (`src/components/sections/AboutSection.tsx`):
- Introduction text
- Highlights (experience, community, etc.)
- Statistics

**Experience Section** (`src/components/sections/ExperienceSection.tsx`):
- Job positions
- Companies
- Achievements
- Technologies

**Projects Section** (`src/components/sections/ProjectsSection.tsx`):
- Project details
- Descriptions
- Links
- Technologies

**Skills Section** (`src/components/sections/SkillsSection.tsx`):
- Skill categories
- Technologies

**Contact Section** (`src/components/sections/ContactSection.tsx`):
- Email address
- Contact message

### 2. Update Site Configuration

Edit `src/constants/index.ts`:
```typescript
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ...
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  // ...
};
```

### 3. Customize Theme

Edit `src/styles/index.css`:
```css
:root {
  --primary-color: #ff9900;      /* Your primary color */
  --secondary-color: #146eb4;    /* Your secondary color */
  --success-color: #1ec876;      /* Success color */
  /* ... */
}
```

### 4. Update Assets

Replace files in `public/assets/`:
- `documents/` - Your resume PDF
- `images/` - Your photos/screenshots
- `icons/` - Favicon and app icons

### 5. Update Meta Tags

Edit `src/utils/seo.ts`:
```typescript
export const defaultSEO: SEOConfig = {
  title: 'Your Name - Your Title',
  description: 'Your description',
  ogImage: 'https://your-site.com/image.png',
  // ...
};
```

## 🎨 Styling Tips

### CSS Modules
Each component has its own `.module.css` file for scoped styles.

### Global Styles
Edit `src/styles/index.css` for global styles and CSS variables.

### Dark/Light Theme
Theme automatically switches based on user preference. Customize in `src/store/themeStore.ts`.

## 🧪 Testing Your Changes

After making changes:

1. **Check types**: `npm run type-check`
2. **Lint code**: `npm run lint`
3. **Run tests**: `npm test`
4. **Preview**: `npm run dev`

## 📦 Building for Production

```bash
# Build
npm run build

# Preview build
npm run preview

# Check build size
ls -lh dist/
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📚 Documentation

- [README.md](README.md) - Project overview
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [FEATURES.md](FEATURES.md) - Feature documentation
- [TESTING.md](TESTING.md) - Testing guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Migration from vanilla JS
- [COMPLETE_REFACTOR.md](COMPLETE_REFACTOR.md) - Complete refactor details

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npx kill-port 3000
# Or use different port
npm run dev -- --port 3001
```

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run type-check  # Check TypeScript errors
npm run lint        # Check linting errors
```

### Hot reload not working
```bash
# Restart dev server
# Press Ctrl+C, then npm run dev
```

## 💡 Pro Tips

1. **Use TypeScript**: Get autocomplete and type checking
2. **Use ESLint**: Catch errors early
3. **Write tests**: Ensure code quality
4. **Check performance**: Run Lighthouse audits
5. **Optimize images**: Use WebP format
6. **Use lazy loading**: For better performance

## 🎓 Learning Resources

### React
- [React Docs](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)

### Vite
- [Vite Guide](https://vitejs.dev/guide)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)

### Framer Motion
- [Framer Motion Docs](https://www.framer.com/motion)

## 📞 Support

- **Email**: khavan.work@gmail.com
- **GitHub**: https://github.com/vanhoangkha/Portfolio
- **LinkedIn**: https://linkedin.com/in/vanhoangkha

## ✅ Checklist

Before deploying:

- [ ] Updated personal information
- [ ] Customized theme colors
- [ ] Replaced placeholder images
- [ ] Updated resume PDF
- [ ] Tested all links
- [ ] Checked mobile responsiveness
- [ ] Ran `npm run validate`
- [ ] Built successfully (`npm run build`)
- [ ] Tested production build (`npm run preview`)
- [ ] Checked Lighthouse scores
- [ ] Updated meta tags for SEO
- [ ] Configured analytics (optional)

## 🎉 You're Ready!

Your React portfolio is fully set up and ready to customize. Start with:

```bash
npm run dev
```

Then open http://localhost:3000 and start customizing!

---

**Built with ❤️ using React, TypeScript, and Vite**
