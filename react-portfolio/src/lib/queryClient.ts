import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { CACHE_TIMES, RETRY_CONFIG } from '@/constants/timing';

/**
 * Default options for React Query
 * Configures caching, refetching, and retry behavior
 */
const defaultOptions: DefaultOptions = {
  queries: {
    // Stale time: Data is considered fresh for 5 minutes
    staleTime: CACHE_TIMES.STALE_TIME,
    
    // Cache time: Unused data is garbage collected after 10 minutes
    gcTime: CACHE_TIMES.GC_TIME,
    
    // Retry failed requests 3 times with exponential backoff
    retry: RETRY_CONFIG.MAX_ATTEMPTS,
    retryDelay: (attemptIndex) => Math.min(
      RETRY_CONFIG.INITIAL_DELAY * 2 ** attemptIndex,
      RETRY_CONFIG.MAX_DELAY
    ),
    
    // Refetch on window focus (useful for keeping data fresh)
    refetchOnWindowFocus: true,
    
    // Don't refetch on mount if data is fresh
    refetchOnMount: false,
    
    // Don't refetch on reconnect if data is fresh
    refetchOnReconnect: true,
    
    // Network mode: online-first, fallback to cache
    networkMode: 'online',
  },
  mutations: {
    // Retry mutations once on failure
    retry: 1,
    
    // Network mode for mutations
    networkMode: 'online',
  },
};

/**
 * Create and configure React Query client
 * Includes error handling and logging
 */
export const queryClient = new QueryClient({
  defaultOptions,
});

/**
 * Query keys factory
 * Centralized query key management for consistency
 */
export const queryKeys = {
  // Blog queries
  blog: {
    all: ['blog'] as const,
    lists: () => [...queryKeys.blog.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.blog.lists(), filters] as const,
    details: () => [...queryKeys.blog.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.blog.details(), id] as const,
    categories: () => [...queryKeys.blog.all, 'categories'] as const,
    tags: () => [...queryKeys.blog.all, 'tags'] as const,
  },
  
  // Project queries
  projects: {
    all: ['projects'] as const,
    lists: () => [...queryKeys.projects.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.projects.lists(), filters] as const,
    details: () => [...queryKeys.projects.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.projects.details(), id] as const,
  },
  
  // Testimonial queries
  testimonials: {
    all: ['testimonials'] as const,
    lists: () => [...queryKeys.testimonials.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.testimonials.lists(), filters] as const,
  },
  
  // Certification queries
  certifications: {
    all: ['certifications'] as const,
    lists: () => [...queryKeys.certifications.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.certifications.lists(), filters] as const,
  },
  
  // Analytics queries
  analytics: {
    all: ['analytics'] as const,
    overview: (dateRange?: { start: Date; end: Date }) => 
      [...queryKeys.analytics.all, 'overview', dateRange] as const,
    traffic: (dateRange?: { start: Date; end: Date }) => 
      [...queryKeys.analytics.all, 'traffic', dateRange] as const,
    topPages: (dateRange?: { start: Date; end: Date }) => 
      [...queryKeys.analytics.all, 'topPages', dateRange] as const,
    referrals: (dateRange?: { start: Date; end: Date }) => 
      [...queryKeys.analytics.all, 'referrals', dateRange] as const,
  },
  
  // Search queries
  search: {
    all: ['search'] as const,
    results: (query: string) => [...queryKeys.search.all, query] as const,
  },
  
  // Comments queries
  comments: {
    all: ['comments'] as const,
    lists: () => [...queryKeys.comments.all, 'list'] as const,
    list: (postId: string) => [...queryKeys.comments.lists(), postId] as const,
  },
};

/**
 * Prefetch helper
 * Prefetch data before it's needed
 */
export const prefetchQuery = async <T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>
) => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
};

/**
 * Invalidate queries helper
 * Invalidate and refetch queries
 */
export const invalidateQueries = async (queryKey: readonly unknown[]) => {
  await queryClient.invalidateQueries({ queryKey });
};

/**
 * Set query data helper
 * Manually update query cache
 */
export const setQueryData = <T>(queryKey: readonly unknown[], data: T) => {
  queryClient.setQueryData(queryKey, data);
};

/**
 * Get query data helper
 * Get data from cache
 */
export const getQueryData = <T>(queryKey: readonly unknown[]): T | undefined => {
  return queryClient.getQueryData(queryKey);
};
