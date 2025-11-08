/**
 * Shared TypeScript types for Portfolio Project
 */

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

// Blog Post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
  featured?: boolean;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contact Form types
export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string;
export type Timestamp = string;
