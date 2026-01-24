# Folder Structure

This document describes the professional folder structure of the React Portfolio project.

## 📁 Root Directory

```
react-portfolio/
├── .github/                     # GitHub configuration
│   └── workflows/              # CI/CD workflows
├── config/                      # Configuration files
│   ├── eslint.config.js
│   └── vitest.config.ts
├── docs/                        # Documentation
│   ├── guides/
│   ├── architecture/
│   └── api/
├── public/                      # Static assets
│   ├── assets/
│   └── manifest.json
├── scripts/                     # Build and utility scripts
│   ├── lighthouse.js
│   └── run-lighthouse.sh
├── src/                         # Source code
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── utils/
│   ├── types/
│   ├── constants/
│   ├── styles/
│   ├── i18n/
│   └── lib/
├── .lighthouserc.js            # Lighthouse CI config
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📂 Source Code Structure (`src/`)

### Components (`src/components/`)

Organized by feature and type:

```
components/
├── Layout/                      # Layout components
│   ├── Navbar/
│   ├── Footer/
│   └── Layout.tsx
├── sections/                    # Page sections
│   ├── HeroSection/
│   ├── AboutSection/
│   ├── ProjectsSection/
│   └── ...
├── blog/                        # Blog-related components
│   ├── BlogCard/
│   ├── BlogFilters/
│   └── BlogSidebar/
├── comments/                   # Comments system
│   ├── CommentForm/
│   ├── CommentItem/
│   └── CommentsSection/
├── contact/                    # Contact form
│   └── ContactForm/
├── newsletter/                 # Newsletter
│   ├── NewsletterForm/
│   └── NewsletterModal/
├── search/                     # Search functionality
│   ├── SearchBar/
│   └── SearchResults/
├── analytics/                  # Analytics components
│   └── MetricCard/
├── Image/                      # Image components
│   └── OptimizedImage/
├── Toast/                      # Toast notifications
├── ErrorBoundary.tsx
├── LoadingSpinner.tsx
└── SEO.tsx
```

### Pages (`src/pages/`)

```
pages/
├── HomePage.tsx
├── ResumePage.tsx
├── BlogPage.tsx
├── BlogPostPage.tsx
├── NotFoundPage.tsx
└── admin/
    ├── LoginPage.tsx
    └── DashboardPage.tsx
```

### Services (`src/services/`)

```
services/
├── api/                        # API services
│   ├── client.ts
│   ├── cmsService.ts
│   ├── contactService.ts
│   ├── newsletterService.ts
│   └── commentService.ts
├── auth/                       # Authentication
│   └── tokenService.ts
├── security/                   # Security services
│   └── csrfService.ts
├── recaptcha/                  # reCAPTCHA
│   └── recaptchaService.ts
└── search/                     # Search service
    └── searchService.ts
```

### Hooks (`src/hooks/`)

```
hooks/
├── useAnalytics.ts
├── useBlogTranslation.ts
├── useLocalStorage.ts
├── useMediaQuery.ts
├── useScrollSpy.ts
└── useWebVitals.ts
```

### Store (`src/store/`)

```
store/
├── authStore.ts
├── languageStore.ts
├── projectFilterStore.ts
├── themeStore.ts
└── toastStore.ts
```

### Utils (`src/utils/`)

```
utils/
├── analytics.ts
├── imageUtils.ts
├── i18n.ts
├── logger.ts
├── performanceOptimizations.ts
├── prefetch.ts
├── seo.ts
├── structuredData.ts
└── webVitals.ts
```

### Types (`src/types/`)

```
types/
└── index.ts                    # All TypeScript type definitions
```

### Constants (`src/constants/`)

```
constants/
├── index.ts                    # Export all constants
├── layout.ts                   # Layout constants
└── timing.ts                   # Timing constants
```

### Styles (`src/styles/`)

```
styles/
└── index.css                   # Global styles and CSS variables
```

### i18n (`src/i18n/`)

```
i18n/
├── config.ts
└── locales/
    ├── en/
    └── vi/
```

### Lib (`src/lib/`)

```
lib/
└── queryClient.ts              # React Query configuration
```

## 🎯 Best Practices

### Component Organization

1. **Feature-based grouping**: Components are grouped by feature (blog, contact, etc.)
2. **Co-location**: Component files and styles are kept together
3. **Barrel exports**: Use `index.ts` files for clean imports
4. **Naming convention**: PascalCase for components, camelCase for utilities

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `BlogCard.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `imageUtils.ts`)
- **Constants**: `camelCase.ts` (e.g., `timing.ts`)
- **Types**: `index.ts` or `camelCase.ts`
- **Styles**: `ComponentName.module.css`

### Import Organization

```typescript
// 1. React and external libraries
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// 2. Internal components
import { BlogCard } from '@components/blog/BlogCard';
import { Layout } from '@components/Layout';

// 3. Hooks
import { useBlogTranslation } from '@hooks/useBlogTranslation';

// 4. Utils and services
import { logger } from '@utils/logger';
import { searchService } from '@/services/search/searchService';

// 5. Types
import type { BlogPost } from '@/types';

// 6. Styles
import styles from './Component.module.css';
```

## 📦 Module Organization

### Barrel Exports

Use `index.ts` files to create clean import paths:

```typescript
// src/components/blog/index.ts
export { BlogCard } from './BlogCard';
export { BlogFilters } from './BlogFilters';
export { BlogSidebar } from './BlogSidebar';
```

### Path Aliases

Configured in `vite.config.ts` and `tsconfig.json`:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@hooks/` → `src/hooks/`
- `@utils/` → `src/utils/`
- `@store/` → `src/store/`
- `@types/` → `src/types/`

## 🔄 Migration Notes

When adding new features:

1. Create feature folder in `components/`
2. Add related services in `services/`
3. Add types in `types/index.ts`
4. Add constants if needed
5. Update this documentation



