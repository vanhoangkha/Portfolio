# @portfolio/utils

Shared utility functions for the Portfolio project.

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
import {
  formatDate,
  slugify,
  isValidEmail,
  debounce
} from '@portfolio/utils';

// Date formatting
const formatted = formatDate(new Date());

// String manipulation
const slug = slugify('Hello World!'); // 'hello-world'

// Validation
const valid = isValidEmail('user@example.com'); // true

// Performance
const debouncedFunc = debounce(() => console.log('Called'), 300);
```

## Available Utilities

### Date Utilities
- `formatDate(date)` - Format date to readable string
- `getRelativeTime(date)` - Get relative time (e.g., "2 days ago")

### String Utilities
- `slugify(text)` - Convert text to URL-friendly slug
- `truncate(text, maxLength)` - Truncate text with ellipsis
- `capitalize(text)` - Capitalize first letter

### Validation Utilities
- `isValidEmail(email)` - Validate email format
- `isValidUrl(url)` - Validate URL format

### Object Utilities
- `omit(obj, keys)` - Remove keys from object
- `pick(obj, keys)` - Pick keys from object

### Array Utilities
- `uniqueBy(arr, key)` - Get unique items by key
- `groupBy(arr, key)` - Group items by key

### Performance Utilities
- `debounce(func, delay)` - Debounce function calls
- `throttle(func, limit)` - Throttle function calls

### Storage Utilities
- `getFromStorage(key, defaultValue)` - Get from localStorage
- `setToStorage(key, value)` - Set to localStorage
- `removeFromStorage(key)` - Remove from localStorage
