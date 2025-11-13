import { Routes, Route } from 'react-router-dom';
import { useThemeStore } from '@store/themeStore';
import { useToastStore } from '@store/toastStore';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { Layout } from '@components/Layout';
import { ToastContainer } from '@components/Toast/Toast';
import { ScrollProgress } from '@components/ScrollProgress';
import { SkipToContent } from '@components/SkipToContent';
import { HomePage } from '@/pages/HomePage';
import { ResumePage } from '@/pages/ResumePage';
import { BlogPage } from '@/pages/BlogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  const theme = useThemeStore((state) => state.theme);
  const { toasts, removeToast } = useToastStore();

  return (
    <ErrorBoundary>
      <div className={theme} data-theme={theme}>
        <SkipToContent />
        <ScrollProgress />
        <ToastContainer toasts={toasts} onClose={removeToast} />
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
