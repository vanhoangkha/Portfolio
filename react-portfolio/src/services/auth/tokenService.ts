import { logger } from '@utils/logger';
import { CACHE_TIMES, TOKEN_EXPIRY } from '@/constants/timing';

/**
 * Token storage keys
 */
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

/**
 * JWT Token Service
 * Manages authentication tokens in localStorage
 */
export const tokenService = {
  /**
   * Get access token
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      logger.error('Failed to get token:', error);
      return null;
    }
  },

  /**
   * Set access token
   */
  setToken(token: string, expiresIn?: number): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);

      // Calculate and store expiry time
      if (expiresIn) {
        const expiryTime = Date.now() + expiresIn * 1000;
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
      }

      logger.debug('Token stored successfully');
    } catch (error) {
      logger.error('Failed to set token:', error);
    }
  },

  /**
   * Remove access token
   */
  removeToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      logger.debug('Token removed');
    } catch (error) {
      logger.error('Failed to remove token:', error);
    }
  },

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      logger.error('Failed to get refresh token:', error);
      return null;
    }
  },

  /**
   * Set refresh token
   */
  setRefreshToken(refreshToken: string): void {
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      logger.debug('Refresh token stored successfully');
    } catch (error) {
      logger.error('Failed to set refresh token:', error);
    }
  },

  /**
   * Remove refresh token
   */
  removeRefreshToken(): void {
    try {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      logger.debug('Refresh token removed');
    } catch (error) {
      logger.error('Failed to remove refresh token:', error);
    }
  },

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    try {
      const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
      if (!expiryTime) {
        return true;
      }

      const expiry = parseInt(expiryTime, 10);
      const now = Date.now();

      // Consider token expired if it expires in less than 5 minutes
      return now >= expiry - CACHE_TIMES.TOKEN_BUFFER;
    } catch (error) {
      logger.error('Failed to check token expiry:', error);
      return true;
    }
  },

  /**
   * Get time until token expires (in seconds)
   */
  getTimeUntilExpiry(): number {
    try {
      const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
      if (!expiryTime) {
        return 0;
      }

      const expiry = parseInt(expiryTime, 10);
      const now = Date.now();
      const timeLeft = Math.max(0, expiry - now);

      return Math.floor(timeLeft / 1000);
    } catch (error) {
      logger.error('Failed to get time until expiry:', error);
      return 0;
    }
  },

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
    logger.info('All tokens cleared');
  },

  /**
   * Decode JWT token (without verification)
   * Note: This is for reading token data only, not for security validation
   */
  decodeToken(token: string): Record<string, unknown> | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      logger.error('Failed to decode token:', error);
      return null;
    }
  },

  /**
   * Get user ID from token
   */
  getUserIdFromToken(token?: string): string | null {
    try {
      const tokenToUse = token || this.getToken();
      if (!tokenToUse) {
        return null;
      }

      const decoded = this.decodeToken(tokenToUse);
      if (!decoded) return null;
      const sub = decoded.sub as string | undefined;
      const userId = decoded.userId as string | undefined;
      const id = decoded.id as string | undefined;
      return sub || userId || id || null;
    } catch (error) {
      logger.error('Failed to get user ID from token:', error);
      return null;
    }
  },

  /**
   * Get user role from token
   */
  getUserRoleFromToken(token?: string): string | null {
    try {
      const tokenToUse = token || this.getToken();
      if (!tokenToUse) {
        return null;
      }

      const decoded = this.decodeToken(tokenToUse);
      if (!decoded) return null;
      const role = decoded.role as string | undefined;
      return role || null;
    } catch (error) {
      logger.error('Failed to get user role from token:', error);
      return null;
    }
  },

  /**
   * Check if user has required role
   */
  hasRole(requiredRole: string, token?: string): boolean {
    const userRole = this.getUserRoleFromToken(token);
    return userRole === requiredRole;
  },

  /**
   * Check if user is admin
   */
  isAdmin(token?: string): boolean {
    return this.hasRole('admin', token);
  },
};

/**
 * Auto-refresh token setup
 * Automatically refreshes token before it expires
 */
export const setupTokenRefresh = (refreshCallback: () => Promise<void>) => {
  let refreshTimer: NodeJS.Timeout | null = null;

  const scheduleRefresh = () => {
    // Clear existing timer
    if (refreshTimer) {
      clearTimeout(refreshTimer);
    }

    // Get time until expiry
    const timeUntilExpiry = tokenService.getTimeUntilExpiry();

    if (timeUntilExpiry <= 0) {
      logger.warn('Token already expired');
      return;
    }

    // Schedule refresh 5 minutes before expiry
    const refreshTime = Math.max(0, (timeUntilExpiry - TOKEN_EXPIRY.REFRESH_BUFFER) * 1000);

    logger.debug(`Token refresh scheduled in ${refreshTime / 1000} seconds`);

    refreshTimer = setTimeout(async () => {
      try {
        logger.info('Auto-refreshing token...');
        await refreshCallback();
        scheduleRefresh(); // Schedule next refresh
      } catch (error) {
        logger.error('Auto-refresh failed:', error);
      }
    }, refreshTime);
  };

  // Initial schedule
  scheduleRefresh();

  // Return cleanup function
  return () => {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
  };
};
