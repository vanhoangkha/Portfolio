# Migration Guide: Vanilla JS to React

## Overview

This guide explains the migration from the vanilla JavaScript portfolio to React + TypeScript.

## Key Changes

### 1. Technology Stack

**Before:**
- Vanilla JavaScript
- Plain HTML/CSS
- Manual DOM manipulation
- Service Worker for PWA

**After:**
- React 18 + TypeScript
- Vite build tool
- Component-based architecture
- Framer Motion for animations
- Zustand for state management
- React Router for navigation
- Vite PWA plugin

### 2. Project Structure

```
Old Structure:
├── index.html
├── css/
├── js/
└── assets/

New Structure:
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   └── styles/
├── public/
└── vite.config.ts
```

### 3. Component Mapping

| Old File | New Component |
|----------|---------------|
| index.html | HomePage.tsx |
| js/core/script.js | Multiple components |
| css/main.css | CSS Modules |
| js/core/themes.js | themeStore.ts |

### 4. Features Preserved

✅ Dark/Light theme toggle
✅ Smooth scrolling
✅ Typing animation
✅ Counter animations
✅ Intersection Observer
✅ Mobile responsive
✅ PWA support
✅ SEO optimization

### 5. New Features

🆕 TypeScript type safety
🆕 Hot Module Replacement (HMR)
🆕 Optimized bundle splitting
🆕 Better performance
🆕 Component reusability
🆕 Better state management

## Migration Steps

### Step 1: Install Dependencies

```bash
cd react-portfolio
npm install
```

### Step 2: Copy Assets

Copy images, documents, and other static assets from the old project:

```bash
cp -r ../assets ./public/assets
cp -r ../manifest.json ./public/
```

### Step 3: Update Content

Update personal information in:
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/ProjectsSection.tsx`

### Step 4: Customize Styles

Modify CSS modules in:
- `src/styles/index.css` (global styles)
- `src/components/**/*.module.css` (component styles)

### Step 5: Test

```bash
npm run dev
```

Visit http://localhost:3000

### Step 6: Build

```bash
npm run build
```

### Step 7: Deploy

Deploy the `dist` folder to your hosting provider.

## Benefits of Migration

1. **Better Performance**: Code splitting, lazy loading, optimized builds
2. **Developer Experience**: Hot reload, TypeScript, better tooling
3. **Maintainability**: Component-based, reusable code
4. **Scalability**: Easy to add new features
5. **Type Safety**: Catch errors at compile time
6. **Modern Stack**: Industry-standard tools

## Troubleshooting

### Issue: Styles not loading
**Solution**: Check CSS module imports and class names

### Issue: Routes not working
**Solution**: Ensure BrowserRouter is configured correctly

### Issue: Build fails
**Solution**: Run `npm run type-check` to find TypeScript errors

## Next Steps

1. Add unit tests with Vitest
2. Implement E2E tests with Playwright
3. Add more animations
4. Integrate with backend API
5. Add blog functionality
6. Implement search feature

## Support

For questions or issues, contact: khavan.work@gmail.com
