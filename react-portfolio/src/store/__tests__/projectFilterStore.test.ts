import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectFilterStore } from '../projectFilterStore';
import type { Project } from '@/types';

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AWS Infrastructure',
    description: 'Cloud infrastructure using Terraform',
    category: 'Cloud Infrastructure',
    technologies: ['AWS', 'Terraform', 'Kubernetes'],
    status: 'completed',
    tags: ['cloud', 'devops'],
    icon: 'aws',
    completedAt: '2024-01-01',
    images: [],
  },
  {
    id: '2',
    title: 'AI Chatbot',
    description: 'Machine learning chatbot with React frontend',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'React'],
    status: 'ongoing',
    tags: ['ai', 'ml'],
    icon: 'bot',
    completedAt: '2024-02-01',
    images: [],
  },
  {
    id: '3',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce with Next.js',
    category: 'Web Application',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    status: 'completed',
    tags: ['web', 'ecommerce'],
    icon: 'shop',
    completedAt: '2024-03-01',
    images: [],
  },
];

describe('projectFilterStore', () => {
  beforeEach(() => {
    useProjectFilterStore.getState().clearFilters();
  });

  describe('Technology Filtering', () => {
    it('should filter projects by single technology', () => {
      const store = useProjectFilterStore.getState();
      store.setTechnology('React', true);

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('2');
    });

    it('should filter by multiple technologies with AND logic', () => {
      const store = useProjectFilterStore.getState();
      store.setTechnology('AWS', true);
      store.setTechnology('Kubernetes', true);

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('1');
    });

    it('should return no results if technology combination not found', () => {
      const store = useProjectFilterStore.getState();
      store.setTechnology('AWS', true);
      store.setTechnology('React', true);

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(0);
    });

    it('should remove technology filter when unchecked', () => {
      const store = useProjectFilterStore.getState();
      store.setTechnology('React', true);
      store.setTechnology('React', false);

      expect(store.filters.technologies).toHaveLength(0);
    });
  });

  describe('Category Filtering', () => {
    it('should filter projects by category', () => {
      const store = useProjectFilterStore.getState();
      store.setCategory('AI/ML');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].category).toBe('AI/ML');
    });

    it('should toggle category selection', () => {
      const store = useProjectFilterStore.getState();

      store.setCategory('AI/ML');
      const stateAfterAdd = useProjectFilterStore.getState();
      expect(stateAfterAdd.filters.categories).toContain('AI/ML');

      store.setCategory('AI/ML');
      const stateAfterRemove = useProjectFilterStore.getState();
      expect(stateAfterRemove.filters.categories).not.toContain('AI/ML');
    });

    it('should support multiple category selection', () => {
      const store = useProjectFilterStore.getState();
      store.setCategory('AI/ML');
      store.setCategory('Web Application');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(2);
    });
  });

  describe('Status Filtering', () => {
    it('should filter by completed status', () => {
      const store = useProjectFilterStore.getState();
      store.setStatus('completed');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(2);
      expect(filtered.every((p) => p.status === 'completed')).toBe(true);
    });

    it('should filter by ongoing status', () => {
      const store = useProjectFilterStore.getState();
      store.setStatus('ongoing');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('ongoing');
    });

    it('should show all projects when status is "all"', () => {
      const store = useProjectFilterStore.getState();
      store.setStatus('all');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(3);
    });
  });

  describe('Search Query Filtering', () => {
    it('should filter by title', () => {
      const store = useProjectFilterStore.getState();
      store.setSearchQuery('chatbot');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toContain('Chatbot');
    });

    it('should filter by description', () => {
      const store = useProjectFilterStore.getState();
      store.setSearchQuery('terraform');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
    });

    it('should filter by tags', () => {
      const store = useProjectFilterStore.getState();
      store.setSearchQuery('ecommerce');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
    });

    it('should filter by technology', () => {
      const store = useProjectFilterStore.getState();
      store.setSearchQuery('typescript');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].technologies).toContain('TypeScript');
    });

    it('should be case-insensitive', () => {
      const store = useProjectFilterStore.getState();
      store.setSearchQuery('REACT');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
    });
  });

  describe('Combined Filtering', () => {
    it('should combine technology and status filters', () => {
      const store = useProjectFilterStore.getState();
      store.setTechnology('React', true);
      store.setStatus('ongoing');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('2');
    });

    it('should combine search and category filters', () => {
      const store = useProjectFilterStore.getState();
      store.setSearchQuery('cloud');
      store.setCategory('Cloud Infrastructure');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('1');
    });

    it('should return empty when filters exclude all projects', () => {
      const store = useProjectFilterStore.getState();
      store.setTechnology('AWS', true);
      store.setCategory('AI/ML');

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(0);
    });
  });

  describe('Clear Filters', () => {
    it('should clear all filters', () => {
      const store = useProjectFilterStore.getState();

      store.setTechnology('React', true);
      store.setCategory('AI/ML');
      store.setStatus('completed');
      store.setSearchQuery('test');

      store.clearFilters();

      expect(store.filters.technologies).toHaveLength(0);
      expect(store.filters.categories).toHaveLength(0);
      expect(store.filters.status).toBe('all');
      expect(store.filters.searchQuery).toBe('');
    });

    it('should return all projects after clearing filters', () => {
      const store = useProjectFilterStore.getState();

      store.setTechnology('React', true);
      store.clearFilters();

      const filtered = store.getFilteredProjects(mockProjects);

      expect(filtered).toHaveLength(3);
    });
  });

  describe('Active Filter Count', () => {
    it('should count active filters correctly', () => {
      const store = useProjectFilterStore.getState();

      expect(store.getActiveFilterCount()).toBe(0);

      store.setTechnology('React', true);
      expect(store.getActiveFilterCount()).toBe(1);

      store.setTechnology('AWS', true);
      expect(store.getActiveFilterCount()).toBe(2);

      store.setCategory('AI/ML');
      expect(store.getActiveFilterCount()).toBe(3);

      store.setStatus('completed');
      expect(store.getActiveFilterCount()).toBe(4);

      store.setSearchQuery('test');
      expect(store.getActiveFilterCount()).toBe(5);
    });

    it('should not count "all" status as active', () => {
      const store = useProjectFilterStore.getState();
      store.setStatus('all');

      expect(store.getActiveFilterCount()).toBe(0);
    });
  });

  describe('Persistence', () => {
    it('should persist filters to localStorage', () => {
      const store = useProjectFilterStore.getState();

      store.setTechnology('React', true);
      store.setCategory('AI/ML');

      const stored = localStorage.getItem('project-filters');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.state.filters.technologies).toContain('React');
      expect(parsed.state.filters.categories).toContain('AI/ML');
    });
  });
});

