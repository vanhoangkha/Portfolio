// import { get } from './client'; // TODO: Uncomment when integrating real CMS
import { getBlogPosts, getBlogPostBySlug } from '@/data/blogData';
import { logger } from '@utils/logger';
import { API_DELAYS } from '@/constants/timing';
import type { BlogPost } from '@/types';

/**
 * CMS Service
 * Handles blog content fetching from CMS
 * Currently using mock data, ready for Strapi/Contentful integration
 */

/**
 * Fetch all blog posts
 * TODO: Replace with actual CMS API call
 */
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // Mock implementation - replace with actual API call
  // return get<BlogPost[]>('/blog/posts');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAYS.STANDARD));
  return getBlogPosts();
};

/**
 * Fetch single blog post by slug
 * TODO: Replace with actual CMS API call
 */
export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  // Mock implementation - replace with actual API call
  // return get<BlogPost>(`/blog/posts/${slug}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_DELAYS.FAST));
  const post = getBlogPostBySlug(slug);
  return post || null;
};

/**
 * Fetch featured blog posts
 * TODO: Replace with actual CMS API call
 */
export const fetchFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, API_DELAYS.MEDIUM));
  const allPosts = getBlogPosts();
  return allPosts.filter(post => post.featured);
};

/**
 * Fetch blog posts by category
 * TODO: Replace with actual CMS API call
 */
export const fetchBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, API_DELAYS.MEDIUM));
  const allPosts = getBlogPosts();
  return allPosts.filter(post => post.category === category);
};

/**
 * Fetch blog posts by tag
 * TODO: Replace with actual CMS API call
 */
export const fetchBlogPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, API_DELAYS.MEDIUM));
  const allPosts = getBlogPosts();
  return allPosts.filter(post => post.tags.includes(tag));
};

/**
 * Search blog posts
 * TODO: Replace with actual CMS API call
 */
export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, API_DELAYS.STANDARD));
  const allPosts = getBlogPosts();
  const lowerQuery = query.toLowerCase();
  
  return allPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Increment view count
 * TODO: Replace with actual CMS API call
 */
export const incrementViewCount = async (postId: string): Promise<void> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, API_DELAYS.QUICK));
  // In real implementation, this would update the CMS
  logger.info(`View count incremented for post: ${postId}`);
};
