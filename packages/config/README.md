# @portfolio/config

Shared configuration and constants for the Portfolio project.

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
  APP_CONFIG,
  API_CONFIG,
  BLOG_CONFIG,
  FEATURES,
  ROUTES
} from '@portfolio/config';

// App configuration
console.log(APP_CONFIG.NAME); // 'Kha Van Hoang Portfolio'

// API configuration
const apiUrl = API_CONFIG.BASE_URL;

// Blog settings
const postsPerPage = BLOG_CONFIG.POSTS_PER_PAGE;

// Feature flags
if (FEATURES.ENABLE_BLOG) {
  // Initialize blog
}

// Routes
const blogRoute = ROUTES.BLOG; // '/blog'
```

## Available Configurations

### ENV
- `NODE_ENV` - Current environment
- `IS_PRODUCTION` - Production flag
- `IS_DEVELOPMENT` - Development flag

### API_CONFIG
- `BASE_URL` - API base URL
- `TIMEOUT` - Request timeout
- `RETRY_ATTEMPTS` - Number of retries

### AMPLIFY_CONFIG
- `REGION` - AWS region
- `USER_POOL_ID` - Cognito user pool ID
- `USER_POOL_CLIENT_ID` - Cognito client ID
- `IDENTITY_POOL_ID` - Cognito identity pool ID

### APP_CONFIG
- `NAME` - Application name
- `DESCRIPTION` - App description
- `VERSION` - Current version
- `AUTHOR` - Author information
- `WEBSITE_URL` - Website URL
- `SOCIAL` - Social media links

### BLOG_CONFIG
- `POSTS_PER_PAGE` - Posts per page
- `EXCERPT_LENGTH` - Excerpt length
- `CATEGORIES` - Available categories
- `FEATURED_POSTS_LIMIT` - Featured posts limit

### STORAGE_CONFIG
- `S3_BUCKET` - S3 bucket name
- `CDN_URL` - CDN URL
- `MAX_FILE_SIZE` - Max file size
- `ALLOWED_FILE_TYPES` - Allowed file types

### SEO_CONFIG
- `DEFAULT_TITLE` - Default page title
- `DEFAULT_DESCRIPTION` - Default description
- `DEFAULT_OG_IMAGE` - Default OG image
- `TWITTER_HANDLE` - Twitter handle

### FEATURES
- `ENABLE_BLOG` - Blog feature flag
- `ENABLE_COMMENTS` - Comments feature flag
- `ENABLE_ANALYTICS` - Analytics feature flag
- `ENABLE_PWA` - PWA feature flag
- `ENABLE_DARK_MODE` - Dark mode feature flag

### ROUTES
- `HOME` - Home page route
- `BLOG` - Blog page route
- `PROJECTS` - Projects section route
- `CONTACT` - Contact section route
- `RESUME` - Resume page route
- `ADMIN` - Admin dashboard route
