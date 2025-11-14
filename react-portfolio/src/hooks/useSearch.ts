import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { search, getSearchSuggestions } from '@/services/search/searchService';
import { queryKeys } from '@/lib/queryClient';
import { debounce } from '@utils/debounce';
import { DEBOUNCE_DELAYS } from '@/constants/timing';
import type { SearchQuery } from '@/types';

/**
 * Hook for search functionality
 * Provides search results, suggestions, and search state management
 */
export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchQuery['filters']>();
  const [isOpen, setIsOpen] = useState(false);

  // Debounced search query
  const debouncedQuery = useMemo(
    () =>
      debounce((searchQuery: string) => {
        setQuery(searchQuery);
      }, DEBOUNCE_DELAYS.SEARCH),
    []
  );

  // Search results query
  const {
    data: results = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.search.results(query),
    queryFn: () => search({ query, filters, limit: 20 }),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Search suggestions query
  const {
    data: suggestions = [],
    isLoading: isLoadingSuggestions,
  } = useQuery({
    queryKey: ['search-suggestions', query],
    queryFn: () => getSearchSuggestions(query, 5),
    enabled: query.length >= 2,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleSearch = useCallback(
    (searchQuery: string) => {
      debouncedQuery(searchQuery);
    },
    [debouncedQuery]
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    query,
    results,
    suggestions,
    isLoading,
    isLoadingSuggestions,
    error,
    isOpen,
    filters,
    handleSearch,
    clearSearch,
    toggleSearch,
    setIsOpen,
    setFilters,
  };
};

