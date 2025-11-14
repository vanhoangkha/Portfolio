+6
o# Design Document

## Overview

This design document outlines the architecture and implementation approach for enhancing the existing React portfolio with 15 major feature additions. The enhancement maintains the current tech stack (React 18, TypeScript, Vite, Zustand, Framer Motion) while adding new capabilities including CMS integration, multi-language support, analytics, and advanced user interactions. The design prioritizes modularity, performance, accessibility, and maintainability.

### Design Principles

1. **Incremental Enhancement**: Build on existing architecture without breaking changes
2. **Performance First**: Maintain Lighthouse scores above 90 with code splitting and lazy loading
3. **Type Safety**: Full TypeScript coverage for all new features
4. **Accessibility**: WCAG 2.1 AAA compliance for all new components
5. **Modularity**: Reusable components and hooks following existing patterns
6. **Scalability**: Architecture supports future feature additions

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │  Hooks   │  │  Stores  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   API    │  │   i18n   │  │Analytics │  │   Auth   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   CMS    │  │ Analytics│  │  Email   │  │reCAPTCHA │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack Extensions

**New Dependencies:**
- `react-i18next` + `i18next`: Multi-language support
- `@tanstack/react-query`: Server state management and caching
- `axios`: HTTP client for API calls
- `react-hook-form` + `zod`: Form validation
- `recharts`: Analytics data visualization
- `fuse.js`: Full-text search implementation
- `date-fns`: Date formatting and manipulation
- `react-markdown` + `remark-gfm`: Markdown rendering for blog
- `prismjs`: Code syntax highlighting
- `@headlessui/react`: Accessible UI components
- `clsx` (existing): Conditional class names

**Backend Services:**
- Headless CMS: Strapi (self-hosted) or Contentful (cloud)
- Email Service: SendGrid or Mailchimp API
- Analytics: Google Analytics 4 API
- Authentication: JWT-based with httpOnly cookies
- Contact Form: Serverless function (Vercel/Netlify) or Express API

## Components and Interfaces

### 1. Testimonials Module

#### Component Structure
```
components/testimonials/
├── TestimonialsSection.tsx       # Main section container
├── TestimonialCard.tsx           # Individual testimonial card
├── TestimonialCarousel.tsx       # Carousel wrapper
├── TestimonialModal.tsx          # Full testimonial modal
└── testimonials.module.css       # Scoped styles
```

#### Data Interface
```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  featured: boolean;
}
```

#### Key Features
- Carousel with auto-play (5s interval) and manual controls
- Responsive grid fallback for non-JS users
- Star rating display component
- Lazy loading for images with blur placeholder
- Framer Motion animations for card entrance and carousel transitions


### 2. Certifications Display

#### Component Structure
```
components/certifications/
├── CertificationsSection.tsx     # Main section
├── CertificationCard.tsx         # Certificate card
├── CertificationModal.tsx        # Full certificate viewer
├── CertificationFilter.tsx       # Category filter
└── certifications.module.css     # Styles
```

#### Data Interface
```typescript
interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl?: string;
  certificateImage: string;
  category: 'technical' | 'professional' | 'language' | 'other';
  skills: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  category: string;
}
```

#### Key Features
- Filterable grid layout with smooth transitions
- Modal with certificate image zoom and verification link
- Badge system for achievements
- Expiry date warnings (30 days before expiry)
- Integration with Credly/Acclaim for badge verification

### 3. Analytics Dashboard

#### Component Structure
```
pages/admin/
├── DashboardPage.tsx             # Main dashboard
├── AnalyticsOverview.tsx         # Key metrics cards
├── TrafficChart.tsx              # Visitor trends chart
├── TopPagesTable.tsx             # Most viewed pages
├── ReferralSources.tsx           # Traffic sources
└── dashboard.module.css          # Styles
```

#### Data Interface
```typescript
interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ path: string; views: number }>;
  referralSources: Array<{ source: string; visits: number }>;
  trafficTrend: Array<{ date: string; views: number }>;
}

interface DateRange {
  start: Date;
  end: Date;
  preset: '7d' | '30d' | '90d' | 'custom';
}
```


#### Key Features
- Real-time data updates using React Query with 5-minute refetch interval
- Recharts for data visualization (line, bar, pie charts)
- Date range picker with presets
- Export data to CSV functionality
- Protected route with authentication middleware

### 4. Blog CMS Integration

#### Component Structure
```
components/blog/
├── BlogList.tsx                  # Blog post grid
├── BlogPost.tsx                  # Single post view
├── BlogCard.tsx                  # Post preview card
├── BlogSidebar.tsx               # Categories, tags, recent posts
├── BlogSearch.tsx                # Search within blog
├── CodeBlock.tsx                 # Syntax highlighted code
└── blog.module.css               # Styles
```

#### Data Interface
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;              // Markdown or rich text
  featuredImage: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

interface Author {
  name: string;
  avatar: string;
  bio: string;
}
```

#### CMS Integration Strategy
- **Option A: Strapi (Self-hosted)**
  - Full control over data
  - GraphQL or REST API
  - Media library for images
  - Role-based access control
  
- **Option B: Contentful (Cloud)**
  - Managed service
  - CDN for assets
  - Webhook support for real-time updates
  - Built-in image optimization

#### Key Features
- React Query for data fetching with stale-while-revalidate
- Markdown rendering with react-markdown
- Syntax highlighting with Prism.js
- Reading time calculation
- Related posts recommendation
- Social sharing buttons


### 5. Multi-Language System (i18n)

#### Architecture
```
locales/
├── en/
│   ├── common.json               # Common UI text
│   ├── home.json                 # Home page content
│   ├── about.json                # About section
│   ├── projects.json             # Projects content
│   └── blog.json                 # Blog content
└── vi/
    ├── common.json
    ├── home.json
    ├── about.json
    ├── projects.json
    └── blog.json
```

#### Implementation
```typescript
// i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, vi },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
```

#### Store Extension
```typescript
interface LanguageState {
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => {
        set({ language });
        i18n.changeLanguage(language);
      },
    }),
    { name: 'language-storage' }
  )
);
```

#### Key Features
- Language switcher in header (flag icons)
- Automatic browser language detection
- Persistent language preference
- Dynamic content loading for blog posts
- RTL support preparation (for future languages)

### 6. Advanced Project Filtering

#### Component Structure
```
components/projects/
├── ProjectsSection.tsx           # Main section (existing, enhanced)
├── ProjectFilter.tsx             # Filter controls
├── ProjectGrid.tsx               # Filtered grid
├── ProjectCard.tsx               # Project card (existing)
└── projects.module.css           # Styles
```


#### Filter State Management
```typescript
interface ProjectFilters {
  technologies: string[];
  categories: string[];
  dateRange: { start?: Date; end?: Date };
  status: 'all' | 'completed' | 'ongoing' | 'archived';
}

interface ProjectFilterState {
  filters: ProjectFilters;
  setFilter: (key: keyof ProjectFilters, value: any) => void;
  clearFilters: () => void;
  filteredProjects: Project[];
}
```

#### Key Features
- Multi-select technology filter with checkboxes
- Category dropdown filter
- Date range picker for completion date
- Status filter (completed, ongoing, archived)
- Active filter badges with remove option
- Result count display
- Smooth grid animations with Framer Motion layout animations

### 7. Performance Optimization

#### Code Splitting Strategy
```typescript
// Lazy load route components
const HomePage = lazy(() => import('@/pages/HomePage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));

// Lazy load heavy components
const AnalyticsChart = lazy(() => import('@/components/AnalyticsChart'));
const TestimonialCarousel = lazy(() => import('@/components/TestimonialCarousel'));
```

#### Image Optimization
- WebP format with JPEG fallback using `<picture>` element
- Responsive images with srcset for different screen sizes
- Lazy loading with Intersection Observer
- Blur placeholder using low-quality image placeholders (LQIP)
- CDN integration for static assets

#### Bundle Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@headlessui/react'],
          'data-vendor': ['@tanstack/react-query', 'axios'],
          'i18n-vendor': ['react-i18next', 'i18next'],
        },
      },
    },
  },
});
```

#### Performance Metrics Targets
- First Contentful Paint (FCP): < 1.2s
- Largest Contentful Paint (LCP): < 2.0s
- Time to Interactive (TTI): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Total Bundle Size: < 150 KB (gzipped)


### 8. Enhanced SEO

#### SEO Component Enhancement
```typescript
interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  type?: 'website' | 'article' | 'profile';
}

// Dynamic sitemap generation
interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  priority: number;
}
```

#### Structured Data Implementation
```typescript
// JSON-LD schemas
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kha Van Hoang',
  jobTitle: 'Cloud and AI Solution Architect',
  url: 'https://vanhoangkha.github.io/Portfolio',
  sameAs: [/* social links */],
};

const blogPostSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  author: { '@type': 'Person', name: post.author.name },
  datePublished: post.publishedAt,
  image: post.featuredImage,
};
```

#### Key Features
- Dynamic XML sitemap generation from routes and blog posts
- Automatic robots.txt generation
- Open Graph tags for all pages
- Twitter Card meta tags
- Canonical URL management
- Breadcrumb structured data
- Article structured data for blog posts
- Person/Organization structured data

### 9. Contact Form with Backend

#### Component Structure
```
components/contact/
├── ContactSection.tsx            # Main section (existing, enhanced)
├── ContactForm.tsx               # Form component
├── FormField.tsx                 # Reusable form field
└── contact.module.css            # Styles
```

#### Form Validation Schema
```typescript
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
```


#### Backend API Design
```typescript
// Serverless function (Vercel/Netlify)
// api/contact.ts
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

// Rate limiting: 3 requests per hour per IP
// Email notification to portfolio owner
// Auto-reply to sender
```

#### Key Features
- React Hook Form for form state management
- Zod schema validation
- reCAPTCHA v3 integration (invisible)
- Rate limiting on backend
- Email notification via SendGrid
- Success/error toast notifications
- Form reset after successful submission
- Loading state during submission

### 10. Email Newsletter Integration

#### Component Structure
```
components/newsletter/
├── NewsletterForm.tsx            # Subscription form
├── NewsletterModal.tsx           # Welcome modal
└── newsletter.module.css         # Styles
```

#### API Integration
```typescript
interface NewsletterSubscription {
  email: string;
  consent: boolean;
  source: 'footer' | 'blog' | 'modal';
}

// Mailchimp API integration
const subscribeToNewsletter = async (data: NewsletterSubscription) => {
  const response = await axios.post('/api/newsletter/subscribe', {
    email: data.email,
    tags: ['portfolio-subscriber'],
    source: data.source,
  });
  return response.data;
};
```

#### Key Features
- Email validation with real-time feedback
- GDPR consent checkbox
- Double opt-in confirmation email
- Duplicate subscription handling
- Unsubscribe link in all emails
- Privacy policy link
- Success modal with welcome message


### 11. Full-Text Search

#### Component Structure
```
components/search/
├── SearchBar.tsx                 # Search input in header
├── SearchResults.tsx             # Results dropdown
├── SearchResultItem.tsx          # Individual result
└── search.module.css             # Styles
```

#### Search Implementation
```typescript
import Fuse from 'fuse.js';

interface SearchableContent {
  id: string;
  type: 'project' | 'blog' | 'skill' | 'experience';
  title: string;
  content: string;
  url: string;
  tags?: string[];
}

const fuseOptions = {
  keys: ['title', 'content', 'tags'],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
};

const searchIndex = new Fuse<SearchableContent>(searchableData, fuseOptions);
```

#### Key Features
- Debounced search input (300ms)
- Fuzzy search with Fuse.js
- Search across projects, blog posts, skills, experience
- Highlighted matching text in results
- Keyboard navigation (arrow keys, enter, escape)
- Recent searches stored in localStorage
- Search analytics tracking
- Mobile-optimized search overlay

### 12. Admin Panel

#### Route Structure
```
pages/admin/
├── LoginPage.tsx                 # Admin login
├── DashboardPage.tsx             # Analytics dashboard
├── TestimonialsManager.tsx       # Manage testimonials
├── CertificationsManager.tsx     # Manage certifications
├── SettingsPage.tsx              # Admin settings
└── admin.module.css              # Styles
```

#### Authentication Flow
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'viewer';
}

// JWT stored in httpOnly cookie
// Access token: 15 minutes expiry
// Refresh token: 7 days expiry
```


#### Protected Route Component
```typescript
const ProtectedRoute = ({ children, requiredRole = 'viewer' }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
};
```

#### Key Features
- JWT-based authentication with httpOnly cookies
- Role-based access control (admin, viewer)
- Session timeout after 24 hours
- Automatic token refresh
- Login form with email/password
- Logout functionality
- Activity logging for admin actions
- CRUD operations for testimonials and certifications

### 13. Enhanced PWA Features

#### Service Worker Strategy
```typescript
// vite-plugin-pwa configuration
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\./,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: { maxEntries: 50, maxAgeSeconds: 300 },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: { maxEntries: 100, maxAgeSeconds: 2592000 },
        },
      },
    ],
  },
});
```

#### Push Notification Implementation
```typescript
interface PushNotificationPayload {
  title: string;
  body: string;
  icon: string;
  badge: string;
  url: string;
}

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    });
    // Send subscription to backend
  }
};
```


#### Key Features
- Install prompt with custom UI
- Offline page with cached content
- Background sync for form submissions
- Push notifications for new blog posts (opt-in)
- App update notification with reload prompt
- Cache-first strategy for static assets
- Network-first strategy for API calls
- Periodic background sync

### 14. Accessibility Enhancements

#### WCAG 2.1 AAA Compliance
```typescript
// Color contrast ratios
const colors = {
  // AAA compliant (7:1 ratio)
  text: { light: '#000000', dark: '#FFFFFF' },
  background: { light: '#FFFFFF', dark: '#000000' },
  primary: { light: '#0066CC', dark: '#66B3FF' },
  secondary: { light: '#CC6600', dark: '#FFB366' },
};
```

#### Keyboard Navigation
```typescript
// Focus trap for modals
const useFocusTrap = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    return () => element.removeEventListener('keydown', handleTabKey);
  }, [ref]);
};
```

#### Key Features
- AAA color contrast ratios (7:1 minimum)
- Full keyboard navigation with visible focus indicators
- ARIA labels and landmarks for all sections
- Skip links for main content and navigation
- Screen reader announcements for dynamic content
- Text resizing support up to 200%
- Alternative text for all images
- Captions and transcripts for media
- Form labels and error messages
- Focus management for modals and dropdowns


### 15. Comments System for Blog

#### Component Structure
```
components/comments/
├── CommentsSection.tsx           # Main comments container
├── CommentForm.tsx               # New comment form
├── CommentItem.tsx               # Individual comment
├── CommentReply.tsx              # Reply component
└── comments.module.css           # Styles
```

#### Integration Options

**Option A: Utterances (GitHub Issues)**
```typescript
const UtterancesComments = ({ postId }: { postId: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useThemeStore((state) => state.theme);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'vanhoangkha/portfolio-comments');
    script.setAttribute('issue-term', `blog-${postId}`);
    script.setAttribute('theme', theme === 'dark' ? 'github-dark' : 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    
    ref.current?.appendChild(script);
  }, [postId, theme]);
  
  return <div ref={ref} />;
};
```

**Option B: Custom Comments System**
```typescript
interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  parentId?: string;
  status: 'pending' | 'approved' | 'rejected';
  replies?: Comment[];
}

interface CommentFormData {
  name: string;
  email: string;
  content: string;
  parentId?: string;
}
```

#### Key Features
- Nested replies (up to 3 levels)
- Comment moderation workflow
- Email notifications for replies
- Markdown support in comments
- Social login (GitHub, Google)
- Spam protection with Akismet
- Comment voting/reactions
- Edit and delete for comment authors
- Admin moderation panel

## Data Models

### Extended Type Definitions

```typescript
// Existing types extended
interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  // New fields
  category: string;
  completedAt: string;
  status: 'completed' | 'ongoing' | 'archived';
  images: string[];
  technologies: string[];
}
```


```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
  // New fields
  seo: SEOMetadata;
  translations?: { [key: string]: Partial<BlogPost> };
  commentsEnabled: boolean;
  viewCount: number;
}

interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}
```

## Error Handling

### Error Boundary Strategy
```typescript
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error boundary caught:', error, errorInfo);
    analytics.event({
      category: 'Error',
      action: 'Boundary Catch',
      label: error.message,
    });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      useAuthStore.getState().logout();
    } else if (error.response?.status === 429) {
      // Rate limit exceeded
      useToastStore.getState().error('Too many requests. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      useToastStore.getState().error('Request timeout. Please check your connection.');
    } else {
      // Generic error
      useToastStore.getState().error('An error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);
```


### Form Validation Errors
```typescript
const handleFormError = (error: ZodError) => {
  const fieldErrors: Record<string, string> = {};
  error.errors.forEach((err) => {
    const field = err.path[0] as string;
    fieldErrors[field] = err.message;
  });
  return fieldErrors;
};
```

## Testing Strategy

### Unit Testing
```typescript
// Component tests with React Testing Library
describe('TestimonialCard', () => {
  it('renders testimonial data correctly', () => {
    const testimonial = mockTestimonial();
    render(<TestimonialCard testimonial={testimonial} />);
    
    expect(screen.getByText(testimonial.name)).toBeInTheDocument();
    expect(screen.getByText(testimonial.role)).toBeInTheDocument();
    expect(screen.getByAltText(testimonial.name)).toHaveAttribute('src', testimonial.photo);
  });
  
  it('displays correct star rating', () => {
    const testimonial = mockTestimonial({ rating: 4 });
    render(<TestimonialCard testimonial={testimonial} />);
    
    const stars = screen.getAllByTestId('star-icon');
    expect(stars.filter(star => star.classList.contains('filled'))).toHaveLength(4);
  });
});

// Hook tests
describe('useSearch', () => {
  it('debounces search input', async () => {
    const { result } = renderHook(() => useSearch());
    
    act(() => {
      result.current.setQuery('test');
    });
    
    expect(result.current.isSearching).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isSearching).toBe(false);
    }, { timeout: 500 });
  });
});
```

### Integration Testing
```typescript
// User flow tests
describe('Contact Form Submission', () => {
  it('submits form successfully', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });
});
```


### E2E Testing
```typescript
// Playwright tests for critical user flows
test('user can filter projects and view details', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Projects');
  
  // Apply filter
  await page.click('button:has-text("Technology")');
  await page.check('label:has-text("React")');
  
  // Verify filtered results
  const projectCards = page.locator('[data-testid="project-card"]');
  await expect(projectCards).toHaveCount(5);
  
  // Click first project
  await projectCards.first().click();
  
  // Verify modal opens
  await expect(page.locator('[role="dialog"]')).toBeVisible();
});
```

### Performance Testing
```typescript
// Lighthouse CI configuration
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ['http://localhost:3000/', 'http://localhost:3000/blog'],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
  },
};
```

## Security Considerations

### Authentication Security
- JWT tokens stored in httpOnly cookies
- CSRF protection with token validation
- Password hashing with bcrypt (12 rounds)
- Rate limiting on login attempts (5 per 15 minutes)
- Account lockout after 5 failed attempts

### API Security
- CORS configuration for allowed origins
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention (content sanitization)
- Rate limiting on all endpoints

### Data Privacy
- GDPR compliance for newsletter subscriptions
- Privacy policy and terms of service
- Cookie consent banner
- Data retention policies
- User data export functionality


## Deployment Strategy

### Environment Configuration
```typescript
// .env.example
VITE_API_URL=https://api.portfolio.com
VITE_CMS_URL=https://cms.portfolio.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_RECAPTCHA_SITE_KEY=6Lc...
VITE_MAILCHIMP_API_KEY=...
VITE_VAPID_PUBLIC_KEY=...
```

### Build Process
```bash
# Production build
npm run build

# Build with environment
VITE_ENV=production npm run build

# Preview production build
npm run preview
```

### Deployment Platforms

**Vercel (Recommended)**
- Automatic deployments from GitHub
- Serverless functions for API routes
- Edge caching for static assets
- Environment variable management
- Preview deployments for PRs

**Netlify**
- Netlify Functions for backend
- Form handling built-in
- Split testing support
- Deploy previews

**AWS Amplify**
- Full-stack deployment
- CI/CD pipeline
- Custom domain with SSL
- CloudFront CDN

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run validate
      - run: npm run build
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Migration Plan

### Phase 1: Foundation (Week 1-2)
1. Install new dependencies
2. Set up i18n infrastructure
3. Configure React Query
4. Create base API client
5. Set up authentication store

### Phase 2: Core Features (Week 3-5)
1. Implement testimonials module
2. Build certifications display
3. Create blog CMS integration
4. Add multi-language support
5. Enhance project filtering

### Phase 3: Advanced Features (Week 6-8)
1. Build analytics dashboard
2. Implement search functionality
3. Create contact form backend
4. Add newsletter integration
5. Build admin panel

### Phase 4: Optimization (Week 9-10)
1. Performance optimization
2. SEO enhancements
3. Accessibility improvements
4. PWA feature enhancements
5. Security hardening

### Phase 5: Testing & Launch (Week 11-12)
1. Comprehensive testing
2. Bug fixes
3. Documentation updates
4. Deployment to production
5. Monitoring setup


## Monitoring and Analytics

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: Metric) => {
  analytics.event({
    category: 'Web Vitals',
    action: metric.name,
    value: Math.round(metric.value),
    label: metric.id,
  });
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Tracking
```typescript
// Sentry integration (optional)
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
});
```

### Analytics Events
```typescript
// Custom event tracking
const trackEvent = (category: string, action: string, label?: string) => {
  analytics.event({ category, action, label });
};

// Usage examples
trackEvent('Project', 'View', projectId);
trackEvent('Blog', 'Read', postSlug);
trackEvent('Contact', 'Submit', 'Success');
trackEvent('Newsletter', 'Subscribe', 'Footer');
trackEvent('Search', 'Query', searchTerm);
```

## Documentation Requirements

### Code Documentation
- JSDoc comments for all public functions
- Component prop documentation with TypeScript
- README files for each major module
- API endpoint documentation

### User Documentation
- Admin panel user guide
- Content management guide
- Deployment guide
- Troubleshooting guide

### Developer Documentation
- Architecture overview
- Component library
- State management guide
- Testing guide
- Contributing guidelines

## Success Metrics

### Performance Metrics
- Lighthouse score: 95+ (desktop), 90+ (mobile)
- FCP: < 1.2s
- LCP: < 2.0s
- TTI: < 2.5s
- Bundle size: < 150 KB (gzipped)

### User Engagement Metrics
- Average session duration: > 3 minutes
- Bounce rate: < 40%
- Pages per session: > 3
- Newsletter subscription rate: > 5%
- Contact form conversion: > 2%

### Accessibility Metrics
- WCAG 2.1 AAA compliance: 100%
- Keyboard navigation: 100% functional
- Screen reader compatibility: 100%
- Color contrast: 7:1 minimum

### SEO Metrics
- Google PageSpeed Insights: 95+
- Core Web Vitals: All green
- Mobile-friendly test: Pass
- Structured data validation: No errors
- Sitemap coverage: 100%

---

This design provides a comprehensive blueprint for enhancing the portfolio with all requested features while maintaining code quality, performance, and user experience standards.
