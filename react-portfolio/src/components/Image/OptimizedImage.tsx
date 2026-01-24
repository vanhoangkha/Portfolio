import { useState, useEffect, useRef } from 'react';
import styles from './OptimizedImage.module.css';

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /**
   * Source URL for the image
   * Can be a string or an object with different formats
   */
  src: string | {
    webp?: string;
    jpeg?: string;
    png?: string;
    fallback: string;
  };

  /**
   * Responsive image sources for different screen sizes
   */
  srcSet?: {
    webp?: string[];
    jpeg?: string[];
    png?: string[];
    fallback?: string[];
  };

  /**
   * Sizes attribute for responsive images
   * Example: "(max-width: 768px) 100vw, 50vw"
   */
  sizes?: string;

  /**
   * Alt text (required for accessibility)
   */
  alt: string;

  /**
   * Width of the image (for aspect ratio calculation)
   */
  width?: number;

  /**
   * Height of the image (for aspect ratio calculation)
   */
  height?: number;

  /**
   * Aspect ratio (width/height) to prevent layout shift
   */
  aspectRatio?: number;

  /**
   * Enable lazy loading (default: true)
   */
  lazy?: boolean;

  /**
   * Blur placeholder (base64 encoded low-quality image)
   */
  blurDataURL?: string;

  /**
   * Object fit style
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

  /**
   * Object position style
   */
  objectPosition?: string;

  /**
   * Priority loading (disables lazy loading)
   */
  priority?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

/**
 * Optimized Image Component
 * 
 * Features:
 * - WebP format with automatic fallback
 * - Responsive images with srcset
 * - Lazy loading with Intersection Observer
 * - Blur placeholder support
 * - Aspect ratio preservation to prevent CLS
 * - Error handling with fallback UI
 */
export const OptimizedImage = ({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  aspectRatio,
  lazy = true,
  blurDataURL,
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  className = '',
  style,
  onLoad,
  onError,
  ...rest
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority || !lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate aspect ratio
  const calculatedAspectRatio = aspectRatio || (width && height ? width / height : undefined);

  // Convert src to normalized format
  const normalizeSrc = (source: string | OptimizedImageProps['src']): {
    webp?: string;
    fallback: string;
  } => {
    if (typeof source === 'string') {
      // Try to generate WebP version if not already WebP
      const webpSrc = source.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return {
        webp: webpSrc !== source ? webpSrc : undefined,
        fallback: source,
      };
    }
    return {
      webp: source.webp,
      fallback: source.fallback || source.jpeg || source.png || '',
    };
  };

  // Normalize srcSet
  const normalizeSrcSet = (): {
    webp?: string;
    fallback: string;
  } => {
    if (!srcSet) {
      return { fallback: '' };
    }

    const webpSet = srcSet.webp?.join(', ') || '';
    const fallbackSet = srcSet.fallback?.join(', ') || 
                       srcSet.jpeg?.join(', ') || 
                       srcSet.png?.join(', ') || '';

    return {
      webp: webpSet || undefined,
      fallback: fallbackSet,
    };
  };

  const normalizedSrc = normalizeSrc(src);
  const normalizedSrcSet = normalizeSrcSet();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy, priority, shouldLoad]);

  // Handle image load
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  // Handle image error
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  // Container style with aspect ratio
  const containerStyle: React.CSSProperties = {
    ...style,
    aspectRatio: calculatedAspectRatio ? `${calculatedAspectRatio}` : undefined,
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={containerStyle}
    >
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <div
          className={styles.placeholder}
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: objectPosition,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !blurDataURL && (
        <div className={styles.skeleton} />
      )}

      {/* Picture element for WebP support */}
      {shouldLoad && !hasError && (
        <picture className={styles.picture}>
          {/* WebP source */}
          {normalizedSrc.webp && (
            <source
              srcSet={normalizedSrcSet.webp || normalizedSrc.webp}
              type="image/webp"
              sizes={sizes}
            />
          )}

          {/* Fallback image */}
          <img
            ref={imgRef}
            src={normalizedSrc.fallback}
            srcSet={normalizedSrcSet.fallback || undefined}
            sizes={sizes}
            alt={alt}
            className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
            style={{
              objectFit,
              objectPosition,
            }}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            {...rest}
          />
        </picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className={styles.errorFallback}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span>{alt}</span>
        </div>
      )}
    </div>
  );
};

