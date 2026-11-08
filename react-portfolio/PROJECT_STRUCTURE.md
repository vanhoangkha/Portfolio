# Project Structure

This document provides an overview of the professional folder structure.

## Quick Reference

```
react-portfolio/
├── .github/ # GitHub workflows and templates
├── config/ # Configuration files
├── docs/ # All documentation
│   ├── guides/            # User and developer guides
│   ├── architecture/      # Architecture docs
│   ├── api/              # API documentation
│   └── changelog/        # Version history
├── public/ # Static assets
├── scripts/ # Build and utility scripts
├── src/ # Source code
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom hooks
│   ├── services/        # API and business logic
│   ├── store/           # State management
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   ├── constants/       # Constants
│   ├── styles/          # Global styles
│   ├── i18n/           # Internationalization
│   └── lib/            # Library configurations
└── Configuration files
```

## Detailed Structure

See [docs/architecture/folder-structure.md](docs/architecture/folder-structure.md) for complete details.

## Key Directories

### `src/components/`
Organized by feature:
- `Layout/` - Layout components
- `sections/` - Page sections
- `blog/` - Blog components
- `contact/` - Contact form
- `search/` - Search functionality
- And more...

### `src/services/`
API and business logic:
- `api/` - API service clients
- `auth/` - Authentication
- `security/` - Security services
- `search/` - Search service

### `docs/`
All documentation organized by category:
- `guides/` - How-to guides
- `architecture/` - System design
- `api/` - API docs
- `changelog/` - Version history

## Import Paths

Use configured path aliases:

```typescript
import { BlogCard } from '@components/blog/BlogCard';
import { useAnalytics } from '@hooks/useAnalytics';
import { logger } from '@utils/logger';
import type { BlogPost } from '@/types';
```

## Best Practices

1. **Feature-based organization** - Group related files together
2. **Co-location** - Keep related files close
3. **Barrel exports** - Use `index.ts` for clean imports
4. **Consistent naming** - Follow established conventions

For more details, see the [Architecture Documentation](docs/architecture/).

