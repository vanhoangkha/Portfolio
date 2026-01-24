/**
 * Authentication Store
 * 
 * MOCK AUTHENTICATION (Development Only):
 * - Mock authentication is ONLY available in development mode
 * - Must be explicitly enabled via VITE_ENABLE_MOCK_AUTH=true
 * - Credentials can be configured via environment variables:
 *   - VITE_MOCK_EMAIL (default: admin@example.com)
 *   - VITE_MOCK_PASSWORD (default: admin123)
 * 
 * Production:
 * - Mock authentication is automatically disabled in production builds
 * - Use actual API endpoints configured via VITE_API_URL
 * 
 * Example .env.local for development:
 *   VITE_ENABLE_MOCK_AUTH=true
 *   VITE_MOCK_EMAIL=dev@example.com
 *   VITE_MOCK_PASSWORD=devpassword
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState, LoginCredentials, LoginResponse } from '@/types/auth';
import { setAuthToken, clearAuthToken } from '@/services/api/client';
import { tokenService, setupTokenRefresh } from '@/services/auth/tokenService';
import { logger } from '@utils/logger';
import { API_DELAYS, TOKEN_EXPIRY } from '@/constants/timing';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshAuthToken: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  checkAuth: () => void;
}

/**
 * Authentication Store
 * Manages user authentication state and actions
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      /**
       * Login user
       */
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          // Check if mock auth is enabled (development only)
          const isMockAuthEnabled = import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';
          const isDevelopment = import.meta.env.DEV;

          // Use mock login only in development with explicit flag
          // In production, this should call the actual API
          const response = isDevelopment && isMockAuthEnabled
            ? await mockLogin(credentials)
            : await Promise.reject(new Error('Authentication API not implemented. Please configure VITE_API_URL.'));

          const { user, token, refreshToken } = response;

          // Set auth token in API client and storage
          setAuthToken(token);
          tokenService.setToken(token, response.expiresIn);
          tokenService.setRefreshToken(refreshToken);

          // Setup auto token refresh
          setupTokenRefresh(() => get().refreshAuthToken());

          // Update store
          set({
            user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          logger.info('User logged in successfully:', user.email);
        } catch (error: unknown) {
          logger.error('Login failed:', error);
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      /**
       * Logout user
       */
      logout: () => {
        // Clear auth token from API client and storage
        clearAuthToken();
        tokenService.clearTokens();

        // Clear store
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });

        logger.info('User logged out');
      },

      /**
       * Refresh authentication token
       */
      refreshAuthToken: async () => {
        const { refreshToken: currentRefreshToken } = get();

        if (!currentRefreshToken) {
          logger.warn('No refresh token available');
          get().logout();
          return;
        }

        try {
          // Check if mock auth is enabled (development only)
          const isMockAuthEnabled = import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';
          const isDevelopment = import.meta.env.DEV;

          // Use mock refresh only in development with explicit flag
          // In production, this should call the actual API
          const response = isDevelopment && isMockAuthEnabled
            ? await mockRefreshToken(currentRefreshToken)
            : await Promise.reject(new Error('Token refresh API not implemented. Please configure VITE_API_URL.'));

          const { token, refreshToken: newRefreshToken } = response;

          // Set new auth token in API client and storage
          setAuthToken(token);
          tokenService.setToken(token);
          tokenService.setRefreshToken(newRefreshToken);

          // Update store
          set({
            token,
            refreshToken: newRefreshToken,
            isLoading: false,
            error: null,
          });

          logger.info('Token refreshed successfully');
        } catch (error: unknown) {
          logger.error('Token refresh failed:', error);
          get().logout();
          throw error;
        }
      },

      /**
       * Set user
       */
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      /**
       * Set token
       */
      setToken: (token: string | null) => {
        set({ token });
        if (token) {
          setAuthToken(token);
        } else {
          clearAuthToken();
        }
      },

      /**
       * Set loading state
       */
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      /**
       * Set error
       */
      setError: (error: string | null) => {
        set({ error });
      },

      /**
       * Clear error
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Check authentication status
       * Called on app initialization
       */
      checkAuth: () => {
        const { token, user } = get();

        if (token && user) {
          // Set token in API client
          setAuthToken(token);
          set({ isAuthenticated: true });
          logger.info('User authenticated from storage');
        } else {
          set({ isAuthenticated: false });
          clearAuthToken();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        // Check auth after rehydration
        if (state) {
          state.checkAuth();
        }
      },
    }
  )
);

/**
 * Mock login function
 * Only enabled in development mode via environment variable
 * TODO: Replace with actual API call in production
 */
const mockLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Only allow mock login in development mode
  const isMockAuthEnabled = import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';
  const isDevelopment = import.meta.env.DEV;

  if (!isDevelopment || !isMockAuthEnabled) {
    throw new Error('Mock authentication is disabled. Please use the production API.');
  }

  // Get credentials from environment variables
  // In production, these MUST be set via environment variables - no defaults allowed
  const mockEmail = import.meta.env.VITE_MOCK_EMAIL;
  const mockPassword = import.meta.env.VITE_MOCK_PASSWORD;
  
  // Only allow defaults in development mode when explicitly enabled
  if (!mockEmail || !mockPassword) {
    if (isDevelopment) {
      // Development fallback - clearly marked as unsafe for production
      throw new Error(
        'Mock authentication requires VITE_MOCK_EMAIL and VITE_MOCK_PASSWORD environment variables. ' +
        'Do not use default credentials in production.'
      );
    }
    throw new Error('Mock authentication credentials not configured');
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, API_DELAYS.SLOW));

  // Mock validation using environment variables
  if (credentials.email === mockEmail && credentials.password === mockPassword) {
    return {
      user: {
        id: '1',
        email: credentials.email,
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresIn: TOKEN_EXPIRY.DEFAULT,
    };
  }

  throw new Error('Invalid email or password');
};

/**
 * Mock refresh token function
 * Only enabled in development mode via environment variable
 * TODO: Replace with actual API call in production
 */
const mockRefreshToken = async (_refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
  // Only allow mock refresh in development mode
  const isMockAuthEnabled = import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';
  const isDevelopment = import.meta.env.DEV;

  if (!isDevelopment || !isMockAuthEnabled) {
    throw new Error('Mock authentication is disabled. Please use the production API.');
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, API_DELAYS.STANDARD));

  return {
    token: 'mock-jwt-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
  };
};

/**
 * Listen for logout events from API client
 */
if (typeof window !== 'undefined') {
  window.addEventListener('auth:logout', () => {
    useAuthStore.getState().logout();
  });
}
