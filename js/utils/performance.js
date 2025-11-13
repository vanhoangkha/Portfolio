/**
 * Performance Monitoring Utility
 * Track and report performance metrics
 */

import { logger } from './logger.js';

class PerformanceMonitor {
  constructor() {
    this.marks = new Map();
    this.measures = new Map();
  }

  /**
   * Mark a performance point
   */
  mark(name) {
    if (window.performance && window.performance.mark) {
      performance.mark(name);
      this.marks.set(name, performance.now());
    }
  }

  /**
   * Measure time between two marks
   */
  measure(name, startMark, endMark) {
    if (window.performance && window.performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        this.measures.set(name, measure.duration);
        logger.debug(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
        return measure.duration;
      } catch (error) {
        logger.warn(`Failed to measure ${name}:`, error);
      }
    }
    return null;
  }

  /**
   * Get page load metrics
   */
  getPageLoadMetrics() {
    if (!window.performance || !window.performance.timing) {
      return null;
    }

    const timing = performance.timing;
    const navigation = performance.navigation;

    return {
      // Navigation timing
      navigationStart: timing.navigationStart,
      redirectTime: timing.redirectEnd - timing.redirectStart,
      dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
      tcpTime: timing.connectEnd - timing.connectStart,
      requestTime: timing.responseStart - timing.requestStart,
      responseTime: timing.responseEnd - timing.responseStart,
      
      // Page load timing
      domLoadingTime: timing.domLoading - timing.navigationStart,
      domInteractiveTime: timing.domInteractive - timing.navigationStart,
      domContentLoadedTime: timing.domContentLoadedEventEnd - timing.navigationStart,
      loadCompleteTime: timing.loadEventEnd - timing.navigationStart,
      
      // Key metrics
      timeToFirstByte: timing.responseStart - timing.navigationStart,
      domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
      pageLoad: timing.loadEventEnd - timing.navigationStart,
      
      // Navigation type
      navigationType: navigation.type,
      redirectCount: navigation.redirectCount
    };
  }

  /**
   * Get Core Web Vitals
   */
  getCoreWebVitals() {
    return new Promise((resolve) => {
      const vitals = {
        lcp: null, // Largest Contentful Paint
        fid: null, // First Input Delay
        cls: null  // Cumulative Layout Shift
      };

      // LCP
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // FID
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              vitals.fid = entry.processingStart - entry.startTime;
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // CLS
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                vitals.cls = clsValue;
              }
            });
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Resolve after a delay to collect metrics
          setTimeout(() => resolve(vitals), 5000);
        } catch (error) {
          logger.warn('Failed to observe Core Web Vitals:', error);
          resolve(vitals);
        }
      } else {
        resolve(vitals);
      }
    });
  }

  /**
   * Log performance summary
   */
  logSummary() {
    logger.group('Performance Summary', () => {
      const metrics = this.getPageLoadMetrics();
      if (metrics) {
        logger.info(`Time to First Byte: ${metrics.timeToFirstByte}ms`);
        logger.info(`DOM Ready: ${metrics.domReady}ms`);
        logger.info(`Page Load: ${metrics.pageLoad}ms`);
      }

      if (this.measures.size > 0) {
        logger.info('Custom Measures:');
        this.measures.forEach((duration, name) => {
          logger.info(`  ${name}: ${duration.toFixed(2)}ms`);
        });
      }
    });
  }

  /**
   * Report to analytics (placeholder)
   */
  reportToAnalytics(metrics) {
    // Implement analytics reporting here
    // Example: Google Analytics, custom endpoint, etc.
    logger.debug('Performance metrics ready for reporting:', metrics);
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Auto-log on page load
if (document.readyState === 'complete') {
  performanceMonitor.logSummary();
} else {
  window.addEventListener('load', () => {
    setTimeout(() => performanceMonitor.logSummary(), 0);
  });
}

export { PerformanceMonitor, performanceMonitor };
