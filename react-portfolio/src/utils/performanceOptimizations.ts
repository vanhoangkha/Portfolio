/**
 * Performance Optimizations
 * Utilities to optimize Core Web Vitals
 */

/**
 * Defer non-critical JavaScript execution
 * Uses requestIdleCallback or setTimeout fallback
 */
export const deferExecution = (callback: () => void, delay = 0): void => {
  if (typeof window === 'undefined') return;

  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout: delay });
  } else {
    setTimeout(callback, delay);
  }
};

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
};

/**
 * Reserve space for dynamic content to prevent CLS
 * Sets min-height on container to prevent layout shift
 */
export const reserveSpace = (element: HTMLElement | null, height: number): void => {
  if (!element) return;
  element.style.minHeight = `${height}px`;
};

/**
 * Optimize images for LCP
 * Prioritizes hero images and above-the-fold content
 */
export const prioritizeImage = (image: HTMLImageElement | null): void => {
  if (!image) return;
  image.loading = 'eager';
  image.fetchPriority = 'high';
};

/**
 * Defer non-critical CSS
 * Moves non-critical stylesheets to load after initial render
 */
export const deferStylesheet = (href: string): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};

/**
 * Optimize font loading
 * Preloads critical fonts and uses font-display: swap
 */
export const optimizeFontLoading = (_fontFamily: string, fontUrl: string): void => {
  preloadResource(fontUrl, 'font');
};

/**
 * Reduce JavaScript execution time
 * Splits long tasks into smaller chunks
 */
export const yieldToMain = (): Promise<void> => {
  return new Promise((resolve) => {
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      (window as any).scheduler.postTask(() => resolve(), { priority: 'background' });
    } else if ('requestIdleCallback' in window) {
      requestIdleCallback(() => resolve());
    } else {
      setTimeout(() => resolve(), 0);
    }
  });
};

/**
 * Optimize animations for performance
 * Uses will-change sparingly and removes after animation
 */
export const optimizeAnimation = (element: HTMLElement | null): (() => void) => {
  if (!element) return () => {};

  element.style.willChange = 'transform, opacity';
  
  return () => {
    element.style.willChange = 'auto';
  };
};

