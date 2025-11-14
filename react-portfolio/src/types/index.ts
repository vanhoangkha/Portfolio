export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  // New fields for enhanced filtering
  category: string;
  completedAt: string;
  status: 'completed' | 'ongoing' | 'archived';
  images: string[];
  technologies: string[];
  longDescription?: string;
  challenges?: string[];
  results?: string[];
  teamSize?: number;
  duration?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  icon: string;
  achievements: string[];
  tags: string[];
  links?: Array<{ label: string; url: string }>;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface SkillCategory {
  id: string;
  icon: string;
  title: string;
  skills: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured?: boolean;
  seo: SEOMetadata;
  commentsEnabled: boolean;
  viewCount: number;
  // Multi-language support
  language: 'en' | 'vi'; // Primary language of the post
  translations?: {
    [key: string]: {
      title?: string;
      excerpt?: string;
      content?: string;
    };
  };
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  social?: SocialLink[];
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

/**
 * Testimonial Types
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  featured: boolean;
  linkedinUrl?: string;
}

/**
 * Certification Types
 */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl?: string;
  certificateImage: string;
  category: 'technical' | 'professional' | 'language' | 'other';
  skills: string[];
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  category: string;
  url?: string;
}

/**
 * Analytics Types
 */
export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: PageView[];
  referralSources: ReferralSource[];
  trafficTrend: TrafficData[];
}

export interface PageView {
  path: string;
  title: string;
  views: number;
  uniqueViews: number;
  avgTimeOnPage: number;
}

export interface ReferralSource {
  source: string;
  visits: number;
  percentage: number;
}

export interface TrafficData {
  date: string;
  views: number;
  visitors: number;
}

export interface DateRange {
  start: Date;
  end: Date;
  preset: '7d' | '30d' | '90d' | 'custom';
}

/**
 * Newsletter Types
 */
export interface NewsletterSubscription {
  email: string;
  consent: boolean;
  source: 'footer' | 'blog' | 'modal';
  subscribedAt?: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  subscriptionId?: string;
}

/**
 * Contact Form Types
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

/**
 * Comment Types
 */
export interface Comment {
  id: string;
  postId: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string;
  status: 'pending' | 'approved' | 'rejected';
  replies?: Comment[];
  likes?: number;
}

export interface CommentAuthor {
  name: string;
  email: string;
  avatar?: string;
  website?: string;
}

export interface CommentFormData {
  name: string;
  email: string;
  website?: string;
  content: string;
  parentId?: string;
}

/**
 * Search Types
 */
export interface SearchResult {
  id: string;
  type: 'project' | 'blog' | 'skill' | 'experience';
  title: string;
  excerpt: string;
  url: string;
  tags?: string[];
  score: number;
}

export interface SearchQuery {
  query: string;
  filters?: {
    type?: SearchResult['type'][];
    tags?: string[];
  };
  limit?: number;
}

/**
 * Filter Types
 */
export interface ProjectFilters {
  technologies: string[];
  categories: string[];
  dateRange?: { start?: Date; end?: Date };
  status: 'all' | 'completed' | 'ongoing' | 'archived';
}

/**
 * Pagination Types
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * API Response Types
 */
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * File Upload Types
 */
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * Re-export auth types
 */
export type { User, UserRole, AuthState, LoginCredentials, LoginResponse } from './auth';
