# Quick Start Guide

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

```bash
# Run setup script
./SETUP.sh

# Or manually
npm install
```

## Development

```bash
# Start dev server (http://localhost:3000)
npm run dev
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage
npm run test:coverage
```

## Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check

# Run all checks
npm run validate
```

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom hooks
├── pages/          # Page components
├── store/          # State management
├── styles/         # Global styles
├── utils/          # Utilities
└── types/          # TypeScript types
```

## Key Files

- `src/App.tsx` - Main app component
- `src/main.tsx` - Entry point
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript config

## Environment Variables

Create `.env` file:

```env
VITE_APP_NAME=Portfolio
VITE_API_URL=https://api.example.com
```

## Customization

### Update Content
Edit files in `src/components/sections/`:
- `HeroSection.tsx` - Hero content
- `AboutSection.tsx` - About content
- `ExperienceSection.tsx` - Experience
- `ProjectsSection.tsx` - Projects
- `SkillsSection.tsx` - Skills

### Update Styles
Edit CSS modules in component folders or `src/styles/index.css` for global styles.

### Update Theme
Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --primary-color: #ff9900;
  --secondary-color: #146eb4;
  /* ... */
}
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.

## Documentation

- [README.md](README.md) - Overview
- [FEATURES.md](FEATURES.md) - Features
- [TESTING.md](TESTING.md) - Testing
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Migration

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Type errors
```bash
# Check types
npm run type-check
```

## Support

Email: khavan.work@gmail.com
GitHub: https://github.com/vanhoangkha/Portfolio
