/**
 * Prefetch Utilities
 * Prefetch route components and resources for better performance
 */

/**
 * Prefetch a route component
 * Uses link prefetching for better performance
 */
export const prefetchRoute = (path: string): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  link.as = 'document';
  document.head.appendChild(link);
};

/**
 * Prefetch multiple routes
 */
export const prefetchRoutes = (paths: string[]): void => {
  paths.forEach((path) => prefetchRoute(path));
};

/**
 * Prefetch route on hover
 * Automatically prefetches route when user hovers over a link
 * Returns cleanup function
 */
export const setupRoutePrefetch = (): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {}; // Return no-op cleanup function
  }

  let prefetchTimeout: NodeJS.Timeout | null = null;

  const handleLinkHover = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;

    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    // Prefetch after a short delay to avoid unnecessary requests
    prefetchTimeout = setTimeout(() => {
      prefetchRoute(href);
    }, 100);
  };

  const handleLinkLeave = () => {
    if (prefetchTimeout) {
      clearTimeout(prefetchTimeout);
      prefetchTimeout = null;
    }
  };

  document.addEventListener('mouseenter', handleLinkHover, true);
  document.addEventListener('mouseleave', handleLinkLeave, true);

  // Return cleanup function
  return () => {
    document.removeEventListener('mouseenter', handleLinkHover, true);
    document.removeEventListener('mouseleave', handleLinkLeave, true);
    if (prefetchTimeout) {
      clearTimeout(prefetchTimeout);
    }
  };
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Preload critical fonts
 */
export const preloadFont = (src: string, type: string = 'font/woff2'): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = type;
  link.href = src;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

