/**
 * Image Utility Functions
 * Helper functions for image optimization and processing
 */

/**
 * Generate WebP URL from original image URL
 */
export const getWebPUrl = (url: string): string => {
  if (!url) return url;
  // If already WebP, return as is
  if (url.toLowerCase().endsWith('.webp')) return url;
  // Replace extension with .webp
  return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
};

/**
 * Generate responsive srcset for different sizes
 */
export const generateSrcSet = (
  baseUrl: string,
  sizes: number[] = [400, 800, 1200, 1600]
): string[] => {
  return sizes.map((size) => {
    // For now, return the base URL with size parameter
    // In production, you might want to use an image CDN or service
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set('w', size.toString());
    return `${url.toString()} ${size}w`;
  });
};

/**
 * Generate blur placeholder data URL
 * Creates a tiny 1x1 pixel version of the image for blur placeholder
 */
export const generateBlurPlaceholder = async (_imageUrl: string): Promise<string> => {
  try {
    // In a real implementation, you might want to:
    // 1. Fetch a tiny version of the image from your CDN
    // 2. Convert it to base64
    // 3. Return as data URL
    
    // For now, return a simple placeholder
    // In production, use a service like Cloudinary, Imgix, or Next.js Image Optimization
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlOWVjZWYiLz48L3N2Zz4=';
  } catch (error) {
    console.error('Failed to generate blur placeholder:', error);
    return '';
  }
};

/**
 * Check if WebP is supported by the browser
 */
export const isWebPSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Get optimal image format based on browser support
 */
export const getOptimalImageFormat = (): 'webp' | 'jpeg' | 'png' => {
  if (isWebPSupported()) {
    return 'webp';
  }
  return 'jpeg';
};

/**
 * Calculate aspect ratio from width and height
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  if (!width || !height) return 0;
  return width / height;
};

/**
 * Validate image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    // Relative URL
    return url.startsWith('/') || url.startsWith('./');
  }
};

