# Dependencies Documentation

## New Dependencies Installed

This document lists all new dependencies added for the portfolio enhancement project.

### Production Dependencies

#### State Management & Data Fetching
- **@tanstack/react-query** (v5.90.8)
  - Server state management and caching
  - Used for: CMS data fetching, analytics data, API calls
  - Features: Auto-refetch, caching, optimistic updates

#### Internationalization (i18n)
- **react-i18next** (v16.3.3)
  - React bindings for i18next
  - Used for: Multi-language support (Vietnamese/English)
  
- **i18next** (v25.6.2)
  - Core i18n framework
  - Features: Translation management, language detection
  
- **i18next-browser-languagedetector** (v8.2.0)
  - Automatic language detection from browser
  - Detects from: localStorage, navigator, query params

#### Form Management & Validation
- **react-hook-form** (v7.66.0)
  - Performant form state management
  - Used for: Contact form, newsletter, admin forms
  - Features: Built-in validation, minimal re-renders
  
- **zod** (v4.1.12)
  - TypeScript-first schema validation
  - Used for: Form validation schemas
  - Features: Type inference, error messages

#### HTTP Client
- **axios** (v1.13.2)
  - Promise-based HTTP client
  - Used for: API calls to backend, CMS, external services
  - Features: Interceptors, timeout, retry logic

#### Search
- **fuse.js** (v7.1.0)
  - Lightweight fuzzy-search library
  - Used for: Full-text search across portfolio content
  - Features: Fuzzy matching, scoring, highlighting

#### Data Visualization
- **recharts** (v3.4.1)
  - React charting library
  - Used for: Analytics dashboard charts
  - Features: Line, bar, pie charts, responsive

#### Date Utilities
- **date-fns** (v4.1.0)
  - Modern date utility library
  - Used for: Date formatting, manipulation
  - Features: Tree-shakeable, immutable, TypeScript support

#### Content Rendering
- **react-markdown** (v10.1.0)
  - Markdown to React component renderer
  - Used for: Blog post content rendering
  - Features: Safe by default, extensible
  
- **remark-gfm** (v4.0.1)
  - GitHub Flavored Markdown plugin
  - Used for: Tables, strikethrough, task lists in blog

#### UI Components
- **@headlessui/react** (v2.2.9)
  - Unstyled, accessible UI components
  - Used for: Modals, dropdowns, tabs, transitions
  - Features: Fully accessible, keyboard navigation

### Development Dependencies

#### Developer Tools
- **@tanstack/react-query-devtools** (v5.90.2)
  - DevTools for React Query
  - Used for: Debugging queries, cache inspection
  - Only loaded in development

#### Syntax Highlighting
- **prismjs** (v1.30.0)
  - Syntax highlighter for code blocks
  - Used for: Blog post code highlighting
  - Features: Multiple languages, themes
  
- **@types/prismjs** (v1.26.5)
  - TypeScript definitions for Prism.js

#### Type Definitions
- **@types/react-syntax-highlighter** (v15.5.13)
  - TypeScript definitions for syntax highlighter

## Existing Dependencies (Retained)

### Core
- **react** (v18.3.1) - UI library
- **react-dom** (v18.3.1) - React DOM renderer
- **typescript** (v5.9.3) - Type safety

### Routing & State
- **react-router-dom** (v6.30.2) - Client-side routing
- **zustand** (v4.5.7) - Lightweight state management

### UI & Animation
- **framer-motion** (v11.18.2) - Animation library
- **clsx** (v2.1.1) - Conditional class names

### SEO & PWA
- **react-helmet-async** (v2.0.5) - Meta tags management
- **vite-plugin-pwa** (v0.19.8) - PWA support
- **workbox-window** (v7.3.0) - Service worker

### Build & Development
- **vite** (v5.4.21) - Build tool
- **@vitejs/plugin-react-swc** (v3.11.0) - React plugin with SWC

### Testing
- **vitest** (v1.6.1) - Unit testing
- **@testing-library/react** (v14.3.1) - React testing utilities
- **@testing-library/jest-dom** (v6.9.1) - DOM matchers
- **@testing-library/user-event** (v14.6.1) - User interaction simulation
- **jsdom** (v24.1.3) - DOM implementation

### Code Quality
- **eslint** (v8.57.1) - Linting
- **prettier** (v3.6.2) - Code formatting
- **@typescript-eslint/eslint-plugin** (v7.18.0) - TypeScript linting
- **@typescript-eslint/parser** (v7.18.0) - TypeScript parser

## Environment Variables

See `.env.example` for all required environment variables:
- API endpoints (CMS, backend)
- Authentication secrets
- Third-party service keys (Google Analytics, SendGrid, Mailchimp)
- reCAPTCHA keys
- Feature flags

## Installation

To install all dependencies:

```bash
npm install
```

To verify installation:

```bash
npm list --depth=0
npm run type-check
```

## Bundle Size Impact

Estimated bundle size increase:
- **React Query**: ~13 KB (gzipped)
- **i18next**: ~8 KB (gzipped)
- **React Hook Form**: ~9 KB (gzipped)
- **Zod**: ~12 KB (gzipped)
- **Axios**: ~5 KB (gzipped)
- **Fuse.js**: ~3 KB (gzipped)
- **Recharts**: ~45 KB (gzipped) - lazy loaded
- **React Markdown**: ~8 KB (gzipped) - lazy loaded
- **Headless UI**: ~15 KB (gzipped)

**Total estimated increase**: ~118 KB (gzipped)
**Mitigation**: Code splitting and lazy loading for heavy components

## Security Considerations

- All dependencies are from trusted sources
- Regular security audits with `npm audit`
- Dependencies are pinned to specific versions
- Automated dependency updates via Dependabot (recommended)

## Next Steps

1. Configure React Query client (Task 3)
2. Set up i18n infrastructure (Task 2)
3. Create base API client with Axios (Task 3)
4. Set up authentication store (Task 4)

---

**Last Updated**: November 14, 2025
**Dependencies Count**: 44 total (20 production, 24 development)
