/**
 * API Services
 * Central export point for all API-related functions
 */

export {
  apiClient,
  get,
  post,
  put,
  patch,
  del,
  upload,
  download,
  setAuthToken,
  getAuthToken,
  clearAuthToken,
  APIError,
} from './client';

// Export API service modules (to be created in future tasks)
// export * from './blogService';
// export * from './projectService';
// export * from './testimonialService';
// export * from './certificationService';
// export * from './analyticsService';
// export * from './contactService';
// export * from './newsletterService';
// export * from './authService';
