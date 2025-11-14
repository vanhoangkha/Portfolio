# i18n Implementation Guide - Phase 2 Completion

## ✅ Completed Tasks

### Task 9.1-9.3: i18n Foundation ✓
- [x] Created 22 translation files (11 namespaces x 2 languages)
- [x] i18n configuration setup in `src/i18n/config.ts`
- [x] LanguageSwitcher component integrated in Navbar
- [x] Navbar navigation links using translations
- [x] Language persistence in localStorage

### Task 8.6: Blog Component Tests ✓
- [x] BlogFilters.test.tsx (29 tests)
- [x] BlogSidebar.test.tsx (39 tests)
- [x] Test setup with IntersectionObserver mocks
- [x] All 68 tests passing

## 🔄 Remaining Tasks for Phase 2

### Task 9.2: Update Section Components with i18n

#### Pattern to Follow

Every component should:
1. Import `useTranslation` hook
2. Specify the namespace
3. Replace hardcoded text with `t(key)`

**Example:**

```typescript
// Before
import { FC } from 'react';

export const HeroSection: FC = () => {
  return (
    <section>
      <h1>Hi, I'm Kha Van Hoang</h1>
      <p>Cloud & AI Solution Architect</p>
      <button>View My Projects</button>
    </section>
  );
};

// After
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const HeroSection: FC = () => {
  const { t } = useTranslation('home');

  return (
    <section>
      <h1>{t('hero.greeting')} {t('hero.name')}</h1>
      <p>{t('hero.title')}</p>
      <button>{t('hero.cta.viewProjects')}</button>
    </section>
  );
};
```

#### Components to Update

##### 1. HeroSection (`src/components/sections/HeroSection.tsx`)
- Namespace: `home`
- Keys: `hero.greeting`, `hero.name`, `hero.title`, `hero.description`, `hero.cta.*`

##### 2. AboutSection (`src/components/sections/AboutSection.tsx`)
- Namespace: `about`
- Keys: `title`, `introduction`, `description`

##### 3. ExperienceSection (`src/components/sections/ExperienceSection.tsx`)
- Namespace: `about`
- Keys: `experience.*`

##### 4. ProjectsSection (`src/components/sections/ProjectsSection.tsx`)
- Namespace: `projects`
- Keys: `title`, `description`, `card.*`, `filter.*`

##### 5. SkillsSection (`src/components/sections/SkillsSection.tsx`)
- Namespace: `skills`
- Keys: `title`, `description`, `categories.*`

##### 6. ContactSection (`src/components/sections/ContactSection.tsx`)
- Namespace: `contact`
- Keys: `title`, `description`, `form.*`, `info.*`

##### 7. CertificationsSection (`src/components/sections/CertificationsSection.tsx`)
- Namespace: `certifications`
- Keys: `title`, `description`, `filter.*`, `card.*`

##### 8. TestimonialsSection (`src/components/sections/TestimonialsSection.tsx`)
- Namespace: `testimonials`
- Keys: `title`, `description`, `rating`, `previous`, `next`

### Task 9.4: Blog Language Support

#### 1. Update BlogPost Type

```typescript
// src/types/index.ts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  // ... existing fields

  // NEW: Multi-language support
  translations?: {
    [key: string]: {
      title?: string;
      excerpt?: string;
      content?: string;
    };
  };
  language?: 'en' | 'vi'; // Default language
}
```

#### 2. Create useBlogTranslation Hook

```typescript
// src/hooks/useBlogTranslation.ts
import { useLanguageStore } from '@store/languageStore';
import type { BlogPost } from '@/types';

export const useBlogTranslation = (post: BlogPost) => {
  const { language } = useLanguageStore();

  if (language === 'en' || !post.translations?.[language]) {
    return {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
    };
  }

  const translation = post.translations[language];
  return {
    title: translation.title || post.title,
    excerpt: translation.excerpt || post.excerpt,
    content: translation.content || post.content,
  };
};
```

#### 3. Update Blog Components

```typescript
// BlogCard.tsx example
import { useBlogTranslation } from '@hooks/useBlogTranslation';

export const BlogCard = ({ post }: { post: BlogPost }) => {
  const translated = useBlogTranslation(post);
  const { language } = useLanguageStore();

  return (
    <article>
      <h3>{translated.title}</h3>
      <p>{translated.excerpt}</p>
      {post.language && post.language !== language && (
        <span className="language-badge">
          Original: {post.language.toUpperCase()}
        </span>
      )}
    </article>
  );
};
```

### Task 9.5: i18n Tests

#### Test Files to Create

##### 1. `src/components/__tests__/LanguageSwitcher.test.tsx`

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useLanguageStore } from '@store/languageStore';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    useLanguageStore.setState({ language: 'en' });
  });

  it('should render both language options', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('VI')).toBeInTheDocument();
  });

  it('should switch language when button is clicked', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const viButton = screen.getByText('VI');
    await user.click(viButton);

    expect(useLanguageStore.getState().language).toBe('vi');
  });

  it('should mark active language button', () => {
    useLanguageStore.setState({ language: 'vi' });
    render(<LanguageSwitcher />);

    const viButton = screen.getByText('VI').closest('button');
    expect(viButton).toHaveClass('active');
  });

  it('should persist language to localStorage', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('VI'));

    expect(localStorage.getItem('i18nextLng')).toBe('vi');
  });
});
```

##### 2. `src/hooks/__tests__/useTranslation.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '@store/languageStore';

describe('useTranslation hook', () => {
  it('should translate text based on current language', () => {
    const { result } = renderHook(() => useTranslation('navigation'));

    expect(result.current.t('home')).toBe('Home');
  });

  it('should update translations when language changes', async () => {
    const { result } = renderHook(() => useTranslation('navigation'));

    expect(result.current.t('home')).toBe('Home');

    act(() => {
      useLanguageStore.getState().setLanguage('vi');
    });

    // Wait for re-render
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(result.current.t('home')).toBe('Trang chủ');
  });

  it('should handle missing translations gracefully', () => {
    const { result } = renderHook(() => useTranslation('common'));

    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
  });
});
```

## Task 10: Enhanced Project Filtering

### Task 10.1: Create Project Filter Store

```typescript
// src/store/projectFilterStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project } from '@/types';

export interface ProjectFilters {
  technologies: string[];
  categories: string[];
  status: 'all' | 'completed' | 'ongoing' | 'archived';
  searchQuery: string;
}

interface ProjectFilterState {
  filters: ProjectFilters;
  setTechnology: (tech: string, selected: boolean) => void;
  setCategory: (category: string) => void;
  setStatus: (status: ProjectFilters['status']) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  getFilteredProjects: (projects: Project[]) => Project[];
}

const initialFilters: ProjectFilters = {
  technologies: [],
  categories: [],
  status: 'all',
  searchQuery: '',
};

export const useProjectFilterStore = create<ProjectFilterState>()(
  persist(
    (set, get) => ({
      filters: initialFilters,

      setTechnology: (tech, selected) =>
        set((state) => ({
          filters: {
            ...state.filters,
            technologies: selected
              ? [...state.filters.technologies, tech]
              : state.filters.technologies.filter((t) => t !== tech),
          },
        })),

      setCategory: (category) =>
        set((state) => ({
          filters: {
            ...state.filters,
            categories: state.filters.categories.includes(category)
              ? state.filters.categories.filter((c) => c !== category)
              : [...state.filters.categories, category],
          },
        })),

      setStatus: (status) =>
        set((state) => ({
          filters: { ...state.filters, status },
        })),

      setSearchQuery: (searchQuery) =>
        set((state) => ({
          filters: { ...state.filters, searchQuery },
        })),

      clearFilters: () => set({ filters: initialFilters }),

      getFilteredProjects: (projects) => {
        const { filters } = get();

        return projects.filter((project) => {
          // Search query filter
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const matchesSearch =
              project.title.toLowerCase().includes(query) ||
              project.description.toLowerCase().includes(query) ||
              project.tags?.some((tag) => tag.toLowerCase().includes(query));

            if (!matchesSearch) return false;
          }

          // Technology filter
          if (filters.technologies.length > 0) {
            const hasTech = filters.technologies.every((tech) =>
              project.technologies?.includes(tech)
            );
            if (!hasTech) return false;
          }

          // Category filter
          if (filters.categories.length > 0) {
            if (!filters.categories.includes(project.category)) return false;
          }

          // Status filter
          if (filters.status !== 'all' && project.status !== filters.status) {
            return false;
          }

          return true;
        });
      },
    }),
    {
      name: 'project-filters',
      partialize: (state) => ({ filters: state.filters }),
    }
  )
);
```

### Task 10.2: Create ProjectFilter Component

```typescript
// src/components/projects/ProjectFilter.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProjectFilterStore } from '@store/projectFilterStore';
import styles from './ProjectFilter.module.css';

interface ProjectFilterProps {
  availableTechnologies: string[];
  availableCategories: string[];
  resultCount: number;
}

export const ProjectFilter = ({
  availableTechnologies,
  availableCategories,
  resultCount,
}: ProjectFilterProps) => {
  const { t } = useTranslation('projects');
  const {
    filters,
    setTechnology,
    setCategory,
    setStatus,
    setSearchQuery,
    clearFilters,
  } = useProjectFilterStore();

  return (
    <motion.div
      className={styles.filterContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder={t('filter.search')}
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Technologies */}
      <div className={styles.filterGroup}>
        <h4>{t('filter.technology')}</h4>
        <div className={styles.checkboxGroup}>
          {availableTechnologies.map((tech) => (
            <label key={tech} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={filters.technologies.includes(tech)}
                onChange={(e) => setTechnology(tech, e.target.checked)}
              />
              <span>{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className={styles.filterGroup}>
        <h4>{t('filter.category')}</h4>
        <div className={styles.buttonGroup}>
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setCategory(category)}
              className={`${styles.categoryButton} ${
                filters.categories.includes(category) ? styles.active : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className={styles.filterGroup}>
        <h4>{t('filter.status')}</h4>
        <select
          value={filters.status}
          onChange={(e) => setStatus(e.target.value as any)}
          className={styles.select}
        >
          <option value="all">{t('filter.all')}</option>
          <option value="completed">{t('status.completed')}</option>
          <option value="ongoing">{t('status.ongoing')}</option>
          <option value="archived">{t('status.archived')}</option>
        </select>
      </div>

      {/* Results and Clear */}
      <div className={styles.filterFooter}>
        <span className={styles.resultCount}>
          {t('filter.resultsCount', { count: resultCount })}
        </span>
        <button onClick={clearFilters} className={styles.clearButton}>
          {t('filter.clearFilters')}
        </button>
      </div>
    </motion.div>
  );
};
```

### Task 10.3: Update ProjectsSection

```typescript
// src/components/sections/ProjectsSection.tsx
import { useTranslation } from 'react-i18next';
import { useProjectFilterStore } from '@store/projectFilterStore';
import { ProjectFilter } from '@components/projects/ProjectFilter';
import { ProjectCard } from '@components/projects/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@data/projectsData';
import styles from './ProjectsSection.module.css';

export const ProjectsSection = () => {
  const { t } = useTranslation('projects');
  const { getFilteredProjects } = useProjectFilterStore();

  const filteredProjects = getFilteredProjects(projectsData);

  // Extract unique technologies and categories
  const availableTechnologies = Array.from(
    new Set(projectsData.flatMap((p) => p.technologies || []))
  );
  const availableCategories = Array.from(
    new Set(projectsData.map((p) => p.category))
  );

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </motion.div>

        <ProjectFilter
          availableTechnologies={availableTechnologies}
          availableCategories={availableCategories}
          resultCount={filteredProjects.length}
        />

        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="grid"
              className={styles.projectGrid}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className={styles.emptyState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>{t('empty.title')}</h3>
              <p>{t('empty.description')}</p>
              <button onClick={() => useProjectFilterStore.getState().clearFilters()}>
                {t('empty.action')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
```

### Task 10.4: Update Project Type

```typescript
// src/types/index.ts - Add new fields
export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;

  // NEW FIELDS for filtering
  category: string; // e.g., "Cloud Infrastructure", "AI/ML", "Web App"
  technologies: string[]; // e.g., ["React", "TypeScript", "AWS"]
  status: 'completed' | 'ongoing' | 'archived';
  completedAt?: string; // ISO date
  images?: string[]; // Additional project images
}
```

### Task 10.5: Project Filter Tests

```typescript
// src/store/__tests__/projectFilterStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectFilterStore } from '../projectFilterStore';
import type { Project } from '@/types';

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AWS Infrastructure',
    description: 'Cloud infrastructure project',
    category: 'Cloud',
    technologies: ['AWS', 'Terraform', 'Kubernetes'],
    status: 'completed',
    tags: ['cloud', 'devops'],
  },
  {
    id: '2',
    title: 'AI Chatbot',
    description: 'Machine learning chatbot',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'React'],
    status: 'ongoing',
    tags: ['ai', 'ml'],
  },
  // ... more projects
];

describe('projectFilterStore', () => {
  beforeEach(() => {
    useProjectFilterStore.getState().clearFilters();
  });

  it('should filter by technology', () => {
    const store = useProjectFilterStore.getState();
    store.setTechnology('React', true);

    const filtered = store.getFilteredProjects(mockProjects);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('2');
  });

  it('should filter by multiple technologies', () => {
    const store = useProjectFilterStore.getState();
    store.setTechnology('AWS', true);
    store.setTechnology('Kubernetes', true);

    const filtered = store.getFilteredProjects(mockProjects);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('1');
  });

  it('should filter by category', () => {
    const store = useProjectFilterStore.getState();
    store.setCategory('AI/ML');

    const filtered = store.getFilteredProjects(mockProjects);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].category).toBe('AI/ML');
  });

  it('should filter by status', () => {
    const store = useProjectFilterStore.getState();
    store.setStatus('completed');

    const filtered = store.getFilteredProjects(mockProjects);
    expect(filtered.every(p => p.status === 'completed')).toBe(true);
  });

  it('should filter by search query', () => {
    const store = useProjectFilterStore.getState();
    store.setSearchQuery('chatbot');

    const filtered = store.getFilteredProjects(mockProjects);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toContain('Chatbot');
  });

  it('should combine multiple filters', () => {
    const store = useProjectFilterStore.getState();
    store.setTechnology('React', true);
    store.setStatus('ongoing');

    const filtered = store.getFilteredProjects(mockProjects);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('2');
  });

  it('should clear all filters', () => {
    const store = useProjectFilterStore.getState();
    store.setTechnology('React', true);
    store.setCategory('AI/ML');
    store.setStatus('completed');
    store.setSearchQuery('test');

    store.clearFilters();

    const { filters } = store;
    expect(filters.technologies).toHaveLength(0);
    expect(filters.categories).toHaveLength(0);
    expect(filters.status).toBe('all');
    expect(filters.searchQuery).toBe('');
  });
});
```

## Quick Implementation Checklist

- [x] Task 8.6: Blog component tests
- [x] Task 9.1: Translation files created
- [x] Task 9.2 (partial): Navbar with i18n
- [x] Task 9.3: LanguageSwitcher integrated
- [ ] Task 9.2 (remaining): Update 8 section components with i18n
- [ ] Task 9.4: Blog language support
- [ ] Task 9.5: i18n tests
- [ ] Task 10.1: Project filter store
- [ ] Task 10.2: ProjectFilter component
- [ ] Task 10.3: Update ProjectsSection
- [ ] Task 10.4: Update Project type
- [ ] Task 10.5: Project filter tests

## Estimated Time to Complete

- Section components i18n (9.2): 2-3 hours
- Blog language support (9.4): 1 hour
- i18n tests (9.5): 1-2 hours
- Project filtering (10.1-10.5): 3-4 hours

**Total:** 7-10 hours remaining for Phase 2 completion

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- BlogFilters.test.tsx

# Run tests in watch mode
npm test -- --watch
```

## Verifying i18n Integration

1. **Check language switching:**
   - Click language switcher in navbar
   - Verify all text updates
   - Check localStorage for `i18nextLng`

2. **Test translation fallbacks:**
   - Remove a translation key
   - Verify fallback to English
   - Check console for missing key warnings (in dev mode)

3. **Test language persistence:**
   - Switch to Vietnamese
   - Refresh page
   - Language should remain Vietnamese

## Next Steps After Phase 2

Once Phase 2 is complete, proceed to **Phase 3: Advanced Features**:
- Task 11: Analytics Dashboard
- Task 12: Full-Text Search
- Task 13: Contact Form Backend
- Task 14: Newsletter Integration
- Task 15: Admin Panel
- Task 16: Comments System
