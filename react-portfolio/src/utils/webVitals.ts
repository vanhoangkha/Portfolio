/**
 * Web Vitals Tracking
 * Measures and reports Core Web Vitals metrics
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';
import { logger } from './logger';

export interface WebVitalsReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * Get rating for a metric value
 */
const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  const threshold = thresholds[name];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Format metric for reporting
 */
const formatMetric = (metric: Metric): WebVitalsReport => {
  return {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType || 'navigate',
  };
};

/**
 * Report metric to analytics
 */
const reportMetric = (metric: WebVitalsReport) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    logger.info(`Web Vital: ${metric.name}`, {
      value: `${metric.value.toFixed(2)}ms`,
      rating: metric.rating,
    });
  }

  // Send to analytics service if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint if configured
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl && typeof fetch !== 'undefined') {
    // Use sendBeacon for reliable delivery
    const data = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
      url: window.location.href,
      timestamp: Date.now(),
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${apiUrl}/analytics/web-vitals`, data);
    } else {
      // Fallback to fetch
      fetch(`${apiUrl}/analytics/web-vitals`, {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch((error) => {
        logger.warn('Failed to send Web Vitals to analytics:', error);
      });
    }
  }
};

/**
 * Initialize Web Vitals tracking
 */
export const initWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  onLCP((metric) => {
    reportMetric(formatMetric(metric));
  });

  // Interaction to Next Paint (INP) - replaces FID
  onINP((metric) => {
    reportMetric(formatMetric(metric));
  });

  // Cumulative Layout Shift (CLS)
  onCLS((metric) => {
    reportMetric(formatMetric(metric));
  });

  // First Contentful Paint (FCP)
  onFCP((metric) => {
    reportMetric(formatMetric(metric));
  });

  // Time to First Byte (TTFB)
  onTTFB((metric) => {
    reportMetric(formatMetric(metric));
  });

  logger.info('Web Vitals tracking initialized');
};

/**
 * Get current Web Vitals metrics
 * Returns a promise that resolves with all collected metrics
 */
export const getWebVitals = (): Promise<Record<string, WebVitalsReport>> => {
  return new Promise((resolve) => {
    const metrics: Record<string, WebVitalsReport> = {};

    const collectMetric = (metric: Metric) => {
      metrics[metric.name] = formatMetric(metric);
    };

    onLCP(collectMetric);
    onINP(collectMetric);
    onCLS(collectMetric);
    onFCP(collectMetric);
    onTTFB(collectMetric);

    // Resolve after a delay to collect metrics
    setTimeout(() => {
      resolve(metrics);
    }, 5000);
  });
};

