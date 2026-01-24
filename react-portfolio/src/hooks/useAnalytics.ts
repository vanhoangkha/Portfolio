import { useQuery } from '@tanstack/react-query';
import { fetchAnalyticsOverview } from '@/services/api/analyticsService';
import { queryKeys } from '@/lib/queryClient';
import type { DateRange } from '@/types';
import { CACHE_TIMES } from '@/constants/timing';

/**
 * Hook to fetch analytics overview data
 * Auto-refreshes every 5 minutes
 */
export const useAnalytics = (dateRange?: DateRange) => {
  return useQuery({
    queryKey: queryKeys.analytics.overview(dateRange),
    queryFn: () => fetchAnalyticsOverview(dateRange),
    staleTime: CACHE_TIMES.STALE_TIME,
    gcTime: CACHE_TIMES.GC_TIME,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
};

