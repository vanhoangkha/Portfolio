import { useEffect, useState } from 'react';
import { initWebVitals, getWebVitals, type WebVitalsReport } from '@utils/webVitals';

/**
 * Hook to track Web Vitals
 */
export const useWebVitals = () => {
  const [metrics, setMetrics] = useState<Record<string, WebVitalsReport>>({});

  useEffect(() => {
    // Initialize tracking
    initWebVitals();

    // Collect metrics after a delay
    const timeoutId = setTimeout(() => {
      getWebVitals().then(setMetrics);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return metrics;
};

