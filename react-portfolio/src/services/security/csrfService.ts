/**
 * CSRF Token Service
 * 
 * Handles CSRF token retrieval and management for API requests.
 * 
 * Backend Requirements:
 * - Endpoint: GET /api/csrf-token (returns { csrfToken: string })
 * - Cookie: XSRF-TOKEN (httpOnly: false, so JavaScript can read it)
 * - Header: X-CSRF-Token (sent with state-changing requests)
 * 
 * The backend should set the XSRF-TOKEN cookie on initial page load
 * and validate the X-CSRF-Token header on POST/PUT/PATCH/DELETE requests.
 */

import { logger } from '@utils/logger';

const CSRF_TOKEN_KEY = 'csrf_token';
const CSRF_COOKIE_NAME = 'XSRF-TOKEN';
const CSRF_HEADER_NAME = 'X-CSRF-Token';

/**
 * Get CSRF token from cookie
 */
export const getCsrfTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === CSRF_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

/**
 * Get CSRF token from localStorage (fallback)
 */
export const getCsrfTokenFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CSRF_TOKEN_KEY);
};

/**
 * Store CSRF token in localStorage (fallback when cookie not available)
 */
export const storeCsrfToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CSRF_TOKEN_KEY, token);
  } catch (error) {
    logger.warn('Failed to store CSRF token:', error);
  }
};

/**
 * Clear CSRF token from storage
 */
export const clearCsrfToken = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CSRF_TOKEN_KEY);
  } catch (error) {
    logger.warn('Failed to clear CSRF token:', error);
  }
};

/**
 * Get CSRF token (prefers cookie, falls back to storage)
 */
export const getCsrfToken = (): string | null => {
  // Try cookie first (preferred method - set by backend)
  const cookieToken = getCsrfTokenFromCookie();
  if (cookieToken) {
    return cookieToken;
  }

  // Fallback to localStorage
  return getCsrfTokenFromStorage();
};

/**
 * Fetch CSRF token from backend endpoint
 * 
 * @param apiBaseUrl - Base URL of the API
 * @returns CSRF token or null if fetch fails
 */
export const fetchCsrfToken = async (apiBaseUrl?: string): Promise<string | null> => {
  const baseUrl = apiBaseUrl || import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  
  try {
    const response = await fetch(`${baseUrl}/csrf-token`, {
      method: 'GET',
      credentials: 'include', // Include cookies in request
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      logger.warn('Failed to fetch CSRF token:', response.statusText);
      return null;
    }

    const data = await response.json();
    const token = data.csrfToken || data.token || data.csrf_token;

    if (token) {
      // Store token in localStorage as fallback
      storeCsrfToken(token);
      return token;
    }

    return null;
  } catch (error) {
    logger.error('Error fetching CSRF token:', error);
    return null;
  }
};

/**
 * Check if request method requires CSRF token
 */
export const requiresCsrfToken = (method?: string): boolean => {
  if (!method) return false;
  const upperMethod = method.toUpperCase();
  // CSRF protection for state-changing methods
  return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(upperMethod);
};

/**
 * CSRF Token Service Object
 */
export const csrfService = {
  getToken: getCsrfToken,
  fetchToken: fetchCsrfToken,
  clearToken: clearCsrfToken,
  requiresToken: requiresCsrfToken,
  getHeaderName: () => CSRF_HEADER_NAME,
  getCookieName: () => CSRF_COOKIE_NAME,
};

