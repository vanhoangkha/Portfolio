/**
 * Timing Constants
 * Centralized timing values used throughout the application
 */

// API Delays (Mock implementations)
export const API_DELAYS = {
  /** Standard API call delay */
  STANDARD: 500,
  /** Fast API call delay */
  FAST: 300,
  /** Medium API call delay */
  MEDIUM: 400,
  /** Quick operation delay */
  QUICK: 200,
  /** Slow operation delay */
  SLOW: 1000,
} as const;

// Debounce/Throttle Delays
export const DEBOUNCE_DELAYS = {
  /** Scroll event debounce delay */
  SCROLL: 100,
  /** Search input debounce delay */
  SEARCH: 300,
  /** Form input debounce delay */
  INPUT: 250,
} as const;

// Time Conversions (milliseconds)
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const;

// Cache Times
export const CACHE_TIMES = {
  /** Query stale time: 5 minutes */
  STALE_TIME: 5 * TIME.MINUTE,
  /** Query garbage collection time: 10 minutes */
  GC_TIME: 10 * TIME.MINUTE,
  /** Token expiry buffer: 5 minutes before expiry */
  TOKEN_BUFFER: 5 * TIME.MINUTE,
} as const;

// Token Expiry
export const TOKEN_EXPIRY = {
  /** Default token expiry: 1 hour */
  DEFAULT: 3600, // seconds
  /** Token refresh buffer: 5 minutes before expiry */
  REFRESH_BUFFER: 300, // seconds
} as const;

// Retry Configuration
export const RETRY_CONFIG = {
  /** Maximum retry attempts */
  MAX_ATTEMPTS: 3,
  /** Initial retry delay */
  INITIAL_DELAY: TIME.SECOND,
  /** Maximum retry delay */
  MAX_DELAY: 30 * TIME.SECOND,
} as const;

// API Configuration
export const API_CONFIG = {
  /** Default API timeout: 10 seconds */
  TIMEOUT: 10 * TIME.SECOND,
} as const;

