/**
 * Authentication Types
 */

/**
 * User role types
 */
export type UserRole = 'admin' | 'viewer';

/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

/**
 * Authentication state
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Login response from API
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Token refresh response
 */
export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Auth error types
 */
export enum AuthErrorType {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Auth error
 */
export interface AuthError {
  type: AuthErrorType;
  message: string;
  details?: Record<string, unknown>;
}
