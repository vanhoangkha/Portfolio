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
  getActiveFilterCount: () => number;
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
        set((state) => {
          const categories = state.filters.categories.includes(category)
            ? state.filters.categories.filter((c) => c !== category)
            : [...state.filters.categories, category];

          return {
            filters: { ...state.filters, categories },
          };
        }),

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
              project.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
              project.technologies?.some((tech) => tech.toLowerCase().includes(query));

            if (!matchesSearch) return false;
          }

          // Technology filter (AND logic - must have all selected technologies)
          if (filters.technologies.length > 0) {
            const hasTech = filters.technologies.every((tech) =>
              project.technologies?.some((t) => t.toLowerCase() === tech.toLowerCase())
            );
            if (!hasTech) return false;
          }

          // Category filter (OR logic - must match any selected category)
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

      getActiveFilterCount: () => {
        const { filters } = get();
        let count = 0;

        if (filters.technologies.length > 0) count += filters.technologies.length;
        if (filters.categories.length > 0) count += filters.categories.length;
        if (filters.status !== 'all') count += 1;
        if (filters.searchQuery) count += 1;

        return count;
      },
    }),
    {
      name: 'project-filters',
      partialize: (state) => ({ filters: state.filters }),
    }
  )
);

