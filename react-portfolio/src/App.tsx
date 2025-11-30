import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useThemeStore } from '@store/themeStore';
import { useToastStore } from '@store/toastStore';
import { csrfService } from '@/services/security/csrfService';
import { logger } from '@utils/logger';
import { setupRoutePrefetch } from '@utils/prefetch';
import { initWebVitals } from '@utils/webVitals';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { Layout } from '@components/Layout';
import { ToastContainer } from '@components/Toast/Toast';
import { ScrollProgress } from '@components/ScrollProgress';
import { SkipToContent } from '@components/SkipToContent';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { AdminRoute } from '@components/ProtectedRoute';

// Lazy load route components for code splitting
const HomePage = lazy(() => import('@/pages/HomePage').then(module => ({ default: module.HomePage })));
const ResumePage = lazy(() => import('@/pages/ResumePage').then(module => ({ default: module.ResumePage })));
const BlogPage = lazy(() => import('@/pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const LoginPage = lazy(() => import('@/pages/admin/LoginPage').then(module => ({ default: module.LoginPage })));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage').then(module => ({ default: module.DashboardPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

function App() {
  const theme = useThemeStore((state) => state.theme);
  const { toasts, removeToast } = useToastStore();
  const location = useLocation();

  // Initialize CSRF token on app startup
  useEffect(() => {
    const initializeCsrf = async () => {
      // Check if we already have a CSRF token (from cookie or storage)
      const existingToken = csrfService.getToken();
      if (existingToken) {
        logger.debug('CSRF token already available');
        return;
      }

      // Try to fetch CSRF token from backend
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl) {
          await csrfService.fetchToken(apiUrl);
          logger.info('CSRF token initialized');
        } else {
          logger.debug('CSRF token fetch skipped: VITE_API_URL not configured');
        }
      } catch (error) {
        logger.warn('Failed to initialize CSRF token:', error);
      }
    };

    initializeCsrf();
  }, []);

  // Initialize Web Vitals tracking
  useEffect(() => {
    initWebVitals();
  }, []);

  // Setup route prefetching on mount
  useEffect(() => {
    setupRoutePrefetch();
  }, []);

  // Prefetch likely next routes based on current location
  useEffect(() => {
    const prefetchNextRoutes = () => {
      // Prefetch common routes that users might visit next
      const commonRoutes = ['/resume', '/blog'];
      commonRoutes.forEach((route) => {
        if (route !== location.pathname) {
          // Use requestIdleCallback for non-critical prefetching
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = route;
              link.as = 'document';
              document.head.appendChild(link);
            });
          }
        }
      });
    };

    // Delay prefetching to avoid blocking initial load
    const timeoutId = setTimeout(prefetchNextRoutes, 2000);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className={theme} data-theme={theme}>
        <SkipToContent />
        <ScrollProgress />
        <ToastContainer toasts={toasts} onClose={removeToast} />
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="resume"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ResumePage />
                </Suspense>
              }
            />
            <Route
              path="blog"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <BlogPage />
                </Suspense>
              }
            />
            <Route
              path="blog/:slug"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <BlogPostPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
          
          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <DashboardPage />
                </Suspense>
              </AdminRoute>
            }
          />
        </Routes>
        
        {/* React Query DevTools - only in development */}
        {import.meta.env.DEV && (
          <ReactQueryDevtools
            initialIsOpen={false}
            position="bottom"
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
