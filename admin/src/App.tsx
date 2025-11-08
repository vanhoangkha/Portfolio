import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

// Pages
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import BlogListPage from './pages/blog/BlogListPage'
import BlogCreatePage from './pages/blog/BlogCreatePage'
import BlogEditPage from './pages/blog/BlogEditPage'
import MediaLibraryPage from './pages/media/MediaLibraryPage'
import ProjectListPage from './pages/projects/ProjectListPage'
import ProjectCreatePage from './pages/projects/ProjectCreatePage'
import ProjectEditPage from './pages/projects/ProjectEditPage'
import MessagesPage from './pages/messages/MessagesPage'

// Layout
import AdminLayout from './components/layout/AdminLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF9900', // AWS Orange
    },
    secondary: {
      main: '#146EB4', // AWS Blue
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Authenticator.Provider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />

              {/* Blog routes */}
              <Route path="blog">
                <Route index element={<BlogListPage />} />
                <Route path="create" element={<BlogCreatePage />} />
                <Route path="edit/:id" element={<BlogEditPage />} />
              </Route>

              {/* Project routes */}
              <Route path="projects">
                <Route index element={<ProjectListPage />} />
                <Route path="create" element={<ProjectCreatePage />} />
                <Route path="edit/:id" element={<ProjectEditPage />} />
              </Route>

              {/* Media Library */}
              <Route path="media" element={<MediaLibraryPage />} />

              {/* Messages */}
              <Route path="messages" element={<MessagesPage />} />

              {/* TODO: Add more routes */}
              {/* Skills, Certifications, Achievements, Settings */}
            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </Authenticator.Provider>
    </ThemeProvider>
  )
}

export default App
