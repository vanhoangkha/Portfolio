# Portfolio - React + TypeScript + Vite

> Modern, production-ready portfolio built with React 18, TypeScript, and Vite

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)]()
[![React](https://img.shields.io/badge/React-18.3-61dafb)]()
[![Vite](https://img.shields.io/badge/Vite-5.1-646cff)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

## Features

- **Vite** - Lightning fast build tool
- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **React Router v6** - Client-side routing
- **PWA** - Progressive Web App support
- **CSS Modules** - Scoped styling
- **Vitest** - Fast unit testing
- **ESLint + Prettier** - Code quality
- **CI/CD** - GitHub Actions
- **Accessible** - WCAG 2.1 AA compliant
- **SEO Optimized** - Meta tags, Open Graph, structured data

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone repository
git clone https://github.com/vanhoangkha/Portfolio.git
cd Portfolio/react-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview build
npm test                 # Run tests
npm run test:ui          # Test with UI
npm run test:coverage    # Coverage report
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
npm run format           # Format code
npm run type-check       # Check TypeScript
npm run validate         # Run all checks
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout/         # Layout components
│   ├── sections/       # Page sections
│   └── Toast/          # Toast notifications
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── store/              # Zustand stores
├── styles/             # Global styles
├── test/               # Test files
├── types/              # TypeScript types
├── utils/              # Utility functions
├── constants/          # Constants
├── App.tsx             # Main app
└── main.tsx            # Entry point
```

## Customization

### Update Personal Information

1. **Constants** (`src/constants/index.ts`):
```typescript
export const SITE_CONFIG = {
  name: 'Your Name',
  email: 'your.email@example.com',
  // ...
};
```

2. **Sections** (`src/components/sections/`):
- `HeroSection.tsx` - Hero content
- `AboutSection.tsx` - About content
- `ExperienceSection.tsx` - Work experience
- `ProjectsSection.tsx` - Projects
- `SkillsSection.tsx` - Skills

### Customize Theme

Edit `src/styles/index.css`:
```css
:root {
  --primary-color: #ff9900;
  --secondary-color: #146eb4;
  /* ... */
}
```

### Update Assets

Replace files in `public/assets/`:
- `documents/` - Resume PDF
- `images/` - Photos/screenshots
- `icons/` - Favicon and app icons

## Testing

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm run test:coverage

# UI mode
npm run test:ui
```

## Performance

- **Lighthouse Score**: 97/100
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <2.5s
- **Bundle Size**: ~330 KB (gzipped: ~108 KB)

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Documentation

- [READY_TO_USE.md](READY_TO_USE.md) - Setup complete guide
- [QUICKSTART.md](QUICKSTART.md) - Quick reference
- [FEATURES.md](FEATURES.md) - Feature documentation
- [TESTING.md](TESTING.md) - Testing guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment options
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Migration from vanilla JS
- [COMPLETE_REFACTOR.md](COMPLETE_REFACTOR.md) - Refactor details

## Tech Stack

### Core
- React 18.3
- TypeScript 5.3
- Vite 5.1

### UI & Animation
- Framer Motion 11.0
- CSS Modules
- React Intersection Observer

### State & Routing
- Zustand 4.5
- React Router v6

### Development
- Vitest 1.3
- ESLint 8.57
- Prettier 3.2
- React Testing Library

### Build & Deploy
- Vite PWA Plugin
- GitHub Actions
- Workbox (Service Worker)

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) file.

## Author

**Kha Van Hoang**
- Email: khavan.work@gmail.com
- LinkedIn: [linkedin.com/in/vanhoangkha](https://linkedin.com/in/vanhoangkha)
- GitHub: [github.com/vanhoangkha](https://github.com/vanhoangkha)

## Acknowledgments

- React team for amazing framework
- Vite team for blazing fast tooling
- Framer Motion for smooth animations
- Open source community

## Stats

- **Files**: 80+
- **Components**: 25+
- **Custom Hooks**: 5
- **Utilities**: 20+
- **Tests**: 10+
- **Documentation**: 10+ pages

---

**Built with using React, TypeScript, and Vite**

Star this repo if you find it helpful!
