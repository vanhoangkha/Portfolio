/**
 * Shared configuration for Portfolio Project
 */

// Environment
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// AWS Amplify Configuration
export const AMPLIFY_CONFIG = {
  REGION: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-southeast-1',
  USER_POOL_ID: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
  USER_POOL_CLIENT_ID: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
  IDENTITY_POOL_ID: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || '',
};

// Application Constants
export const APP_CONFIG = {
  NAME: 'Kha Van Hoang Portfolio',
  DESCRIPTION: 'Full-Stack Developer Portfolio & Blog',
  VERSION: '2.0.0',
  AUTHOR: 'Kha Van Hoang',
  WEBSITE_URL: 'https://khavan.dev',
  SOCIAL: {
    GITHUB: 'https://github.com/khavanco',
    LINKEDIN: 'https://linkedin.com/in/khavan',
    TWITTER: 'https://twitter.com/khavan',
  },
};

// Blog Configuration
export const BLOG_CONFIG = {
  POSTS_PER_PAGE: 10,
  EXCERPT_LENGTH: 200,
  CATEGORIES: ['Cloud', 'AI/ML', 'DevSecOps', 'Community', 'Career'],
  FEATURED_POSTS_LIMIT: 6,
};

// Storage Configuration
export const STORAGE_CONFIG = {
  S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET || '',
  CDN_URL: process.env.NEXT_PUBLIC_CDN_URL || '',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
};

// SEO Configuration
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Kha Van Hoang | Full-Stack Developer',
  DEFAULT_DESCRIPTION:
    'Portfolio and blog of Kha Van Hoang, a full-stack developer specializing in cloud technologies, AI/ML, and DevSecOps.',
  DEFAULT_OG_IMAGE: '/og-image.png',
  TWITTER_HANDLE: '@khavan',
};

// Feature Flags
export const FEATURES = {
  ENABLE_BLOG: true,
  ENABLE_COMMENTS: false,
  ENABLE_ANALYTICS: true,
  ENABLE_PWA: true,
  ENABLE_DARK_MODE: true,
};

// Routes
export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  PROJECTS: '/#projects',
  CONTACT: '/#contact',
  RESUME: '/resume',
  ADMIN: '/admin',
};
