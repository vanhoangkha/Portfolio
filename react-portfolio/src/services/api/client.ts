import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { logger } from '@utils/logger';
import { useToastStore } from '@store/toastStore';
import { csrfService, requiresCsrfToken } from '@/services/security/csrfService';

/**
 * API Error class for structured error handling
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

import { API_CONFIG as TIMING_CONFIG } from '@/constants/timing';

/**
 * API Client configuration
 */
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || String(TIMING_CONFIG.TIMEOUT), 10),
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create Axios instance with default configuration
 */
const createAPIClient = (): AxiosInstance => {
  const client = axios.create(API_CONFIG);

  /**
   * Request interceptor
   * Add authentication token and other headers
   */
  client.interceptors.request.use(
    (config) => {
      // Add authentication token if available
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add CSRF token for state-changing requests
      if (requiresCsrfToken(config.method)) {
        const csrfToken = csrfService.getToken();
        if (csrfToken) {
          config.headers[csrfService.getHeaderName()] = csrfToken;
        } else {
          logger.warn('CSRF token not available for request:', config.method, config.url);
        }
      }

      // Add language header
      const language = localStorage.getItem('language-storage');
      if (language) {
        try {
          const { state } = JSON.parse(language);
          config.headers['Accept-Language'] = state.language;
        } catch (error) {
          logger.warn('Failed to parse language from storage');
        }
      }

      // Log request in development
      if (import.meta.env.DEV) {
        logger.debug('API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params,
        });
      }

      return config;
    },
    (error) => {
      logger.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  /**
   * Response interceptor
   * Handle errors and transform responses
   */
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (import.meta.env.DEV) {
        logger.debug('API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError) => {
      const { response, code, message, config } = error;

      // Network error (no response)
      if (!response) {
        if (code === 'ECONNABORTED') {
          logger.error('Request timeout');
          useToastStore.getState().error('Request timeout. Please check your connection.');
        } else if (code === 'ERR_NETWORK') {
          logger.error('Network error');
          useToastStore.getState().error('Network error. Please check your internet connection.');
        } else {
          logger.error('Request failed:', message);
          useToastStore.getState().error('Request failed. Please try again.');
        }
        
        throw new APIError(message, undefined, code);
      }

      // HTTP error responses
      const { status, data } = response;
      const errorData = data as { message?: string; code?: string } | undefined;

      switch (status) {
        case 400:
          logger.warn('Bad request:', data);
          useToastStore.getState().error(errorData?.message || 'Invalid request.');
          break;

        case 401:
          logger.warn('Unauthorized');
          // Clear auth token
          localStorage.removeItem('auth_token');
          // Redirect to login (handled by auth store)
          useToastStore.getState().error('Session expired. Please log in again.');
          // Optionally trigger logout
          window.dispatchEvent(new CustomEvent('auth:logout'));
          break;

        case 403:
          logger.warn('Forbidden');
          
          // Check if this might be a CSRF token issue
          // If it's a state-changing request and we got 403, try refreshing CSRF token
          if (config && requiresCsrfToken(config.method)) {
            const csrfToken = await csrfService.fetchToken();
            if (csrfToken && config.url) {
              // Retry the request with new CSRF token
              logger.info('Retrying request with refreshed CSRF token');
              try {
                // Clone the config and add CSRF token
                const retryConfig = { ...config };
                retryConfig.headers = retryConfig.headers || {};
                retryConfig.headers[csrfService.getHeaderName()] = csrfToken;
                
                // Retry the original request
                return client.request(retryConfig);
              } catch (retryError) {
                logger.error('Retry with CSRF token failed:', retryError);
              }
            }
          }
          
          useToastStore.getState().error('You do not have permission to perform this action.');
          break;

        case 404:
          logger.warn('Not found:', response.config.url);
          useToastStore.getState().error('Resource not found.');
          break;

        case 429:
          logger.warn('Rate limit exceeded');
          useToastStore.getState().error('Too many requests. Please try again later.');
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          logger.error('Server error:', status);
          useToastStore.getState().error('Server error. Please try again later.');
          break;

        default:
          logger.error('API error:', { status, data });
          useToastStore.getState().error(errorData?.message || 'An error occurred. Please try again.');
      }

      throw new APIError(
        errorData?.message || message,
        status,
        errorData?.code,
        data
      );
    }
  );

  return client;
};

/**
 * Main API client instance
 */
export const apiClient = createAPIClient();

/**
 * Generic GET request
 */
export const get = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};

/**
 * Generic POST request
 */
export const post = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

/**
 * Generic PUT request
 */
export const put = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

/**
 * Generic PATCH request
 */
export const patch = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.patch<T>(url, data, config);
  return response.data;
};

/**
 * Generic DELETE request
 */
export const del = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

/**
 * Upload file with progress tracking
 */
export const upload = async <T = unknown>(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<T> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });

  return response.data;
};

/**
 * Download file
 */
export const download = async (
  url: string,
  filename: string
): Promise<void> => {
  const response = await apiClient.get(url, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(link.href);
};

/**
 * Set authentication token
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('auth_token', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('auth_token');
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

/**
 * Get authentication token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

/**
 * Clear authentication token
 */
export const clearAuthToken = () => {
  setAuthToken(null);
};
