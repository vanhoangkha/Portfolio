# @portfolio/types

Shared TypeScript type definitions for the Portfolio project.

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

## Usage

```typescript
import { User, BlogPost, Project, ApiResponse } from '@portfolio/types';

const user: User = {
  id: '123',
  email: 'user@example.com',
  name: 'John Doe',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
```

## Available Types

- `User` - User account information
- `BlogPost` - Blog post structure
- `Project` - Project portfolio item
- `ContactForm` - Contact form data
- `ApiResponse<T>` - Generic API response wrapper
- Utility types: `Nullable`, `Optional`, `ID`, `Timestamp`
