import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import {
  fetchBlogPosts,
  fetchBlogPostBySlug,
  fetchFeaturedBlogPosts,
  fetchBlogPostsByCategory,
  fetchBlogPostsByTag,
  searchBlogPosts,
} from '@/services/api/cmsService';

/**
 * Hook to fetch all blog posts
 */
export const useBlogPosts = () => {
  return useQuery({
    queryKey: queryKeys.blog.lists(),
    queryFn: fetchBlogPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch single blog post by slug
 */
export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.blog.detail(slug),
    queryFn: () => fetchBlogPostBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch featured blog posts
 */
export const useFeaturedBlogPosts = () => {
  return useQuery({
    queryKey: [...queryKeys.blog.lists(), 'featured'],
    queryFn: fetchFeaturedBlogPosts,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch blog posts by category
 */
export const useBlogPostsByCategory = (category: string) => {
  return useQuery({
    queryKey: queryKeys.blog.list({ category }),
    queryFn: () => fetchBlogPostsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch blog posts by tag
 */
export const useBlogPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: queryKeys.blog.list({ tag }),
    queryFn: () => fetchBlogPostsByTag(tag),
    enabled: !!tag,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to search blog posts
 */
export const useSearchBlogPosts = (query: string) => {
  return useQuery({
    queryKey: [...queryKeys.blog.lists(), 'search', query],
    queryFn: () => searchBlogPosts(query),
    enabled: query.length >= 2, // Only search if query is at least 2 characters
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
