import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { LoadingSpinner } from '@components/LoadingSpinner';
import type { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Restricts access to authenticated users with optional role-based access control
 * 
 * @param children - Child components to render if authorized
 * @param requiredRole - Optional role required to access the route
 * @param redirectTo - Optional redirect path (default: '/admin/login')
 */
export const ProtectedRoute = ({
  children,
  requiredRole,
  redirectTo = '/admin/login',
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading, checkAuth } = useAuthStore();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole && user.role !== requiredRole) {
    // If user doesn't have required role, redirect to dashboard or home
    const fallbackPath = user.role === 'admin' ? '/admin/dashboard' : '/';
    return <Navigate to={fallbackPath} replace />;
  }

  // User is authenticated and authorized
  return <>{children}</>;
};

/**
 * Admin Route Component
 * Shorthand for ProtectedRoute with admin role requirement
 */
export const AdminRoute = ({ children }: { children: ReactNode }) => {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = (): boolean => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated;
};

/**
 * Hook to check if user has specific role
 */
export const useHasRole = (role: UserRole): boolean => {
  const user = useAuthStore((state) => state.user);
  return user?.role === role;
};

/**
 * Hook to check if user is admin
 */
export const useIsAdmin = (): boolean => {
  return useHasRole('admin');
};
