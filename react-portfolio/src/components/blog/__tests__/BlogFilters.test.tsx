import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogFilters } from '../BlogFilters';

describe('BlogFilters', () => {
  const mockCategories = ['Cloud', 'AI/ML', 'DevSecOps', 'Community'];
  const mockProps = {
    categories: mockCategories,
    selectedCategory: 'all',
    onCategoryChange: vi.fn(),
    searchQuery: '',
    onSearchChange: vi.fn(),
    sortBy: 'latest' as const,
    onSortChange: vi.fn(),
    layout: 'grid' as const,
    onLayoutChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Search functionality', () => {
    it('should render search input with placeholder', () => {
      render(<BlogFilters {...mockProps} />);

      const searchInput = screen.getByPlaceholderText(/search blog posts/i);
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('aria-label', 'Search blog posts');
    });

    it('should call onSearchChange when user types', async () => {
      const user = userEvent.setup();
      render(<BlogFilters {...mockProps} />);

      const searchInput = screen.getByPlaceholderText(/search blog posts/i);
      await user.type(searchInput, 'k8s');

      // onSearchChange should be called for each character typed
      expect(mockProps.onSearchChange).toHaveBeenCalled();
      expect(mockProps.onSearchChange).toHaveBeenCalledTimes(3);
      expect(mockProps.onSearchChange).toHaveBeenLastCalledWith('s');
    });

    it('should display clear button when search query exists', () => {
      render(<BlogFilters {...mockProps} searchQuery="test query" />);

      const clearButton = screen.getByLabelText(/clear search/i);
      expect(clearButton).toBeInTheDocument();
    });

    it('should not display clear button when search query is empty', () => {
      render(<BlogFilters {...mockProps} searchQuery="" />);

      const clearButton = screen.queryByLabelText(/clear search/i);
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should clear search query when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<BlogFilters {...mockProps} searchQuery="test query" />);

      const clearButton = screen.getByLabelText(/clear search/i);
      await user.click(clearButton);

      expect(mockProps.onSearchChange).toHaveBeenCalledWith('');
    });

    it('should add focused class when search input is focused', async () => {
      const user = userEvent.setup();
      const { container } = render(<BlogFilters {...mockProps} />);

      const searchInput = screen.getByPlaceholderText(/search blog posts/i);
      await user.click(searchInput);

      const searchContainer = container.querySelector('[class*="searchContainer"]');
      expect(searchContainer).toHaveClass(/focused/);
    });
  });

  describe('Category filter', () => {
    it('should render all category buttons', () => {
      render(<BlogFilters {...mockProps} />);

      expect(screen.getByText('All')).toBeInTheDocument();
      mockCategories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    it('should mark selected category as active', () => {
      render(<BlogFilters {...mockProps} selectedCategory="Cloud" />);

      const cloudButton = screen.getByText('Cloud');
      expect(cloudButton).toHaveClass(/active/);
    });

    it('should call onCategoryChange when category button is clicked', async () => {
      const user = userEvent.setup();
      render(<BlogFilters {...mockProps} />);

      const cloudButton = screen.getByText('Cloud');
      await user.click(cloudButton);

      expect(mockProps.onCategoryChange).toHaveBeenCalledWith('Cloud');
    });

    it('should mark "All" as active when selectedCategory is "all"', () => {
      render(<BlogFilters {...mockProps} selectedCategory="all" />);

      const allButton = screen.getByText('All');
      expect(allButton).toHaveClass(/active/);
    });

    it('should call onCategoryChange with "all" when All button is clicked', async () => {
      const user = userEvent.setup();
      render(<BlogFilters {...mockProps} selectedCategory="Cloud" />);

      const allButton = screen.getByText('All');
      await user.click(allButton);

      expect(mockProps.onCategoryChange).toHaveBeenCalledWith('all');
    });
  });

  describe('Sort functionality', () => {
    it('should render sort select with all options', () => {
      render(<BlogFilters {...mockProps} />);

      const sortSelect = screen.getByLabelText(/sort by/i);
      expect(sortSelect).toBeInTheDocument();

      expect(screen.getByText('Latest')).toBeInTheDocument();
      expect(screen.getByText('Most Popular')).toBeInTheDocument();
      expect(screen.getByText('Oldest')).toBeInTheDocument();
    });

    it('should display current sortBy value', () => {
      render(<BlogFilters {...mockProps} sortBy="popular" />);

      const sortSelect = screen.getByLabelText(/sort by/i) as HTMLSelectElement;
      expect(sortSelect.value).toBe('popular');
    });

    it('should call onSortChange when sort option is selected', async () => {
      const user = userEvent.setup();
      render(<BlogFilters {...mockProps} />);

      const sortSelect = screen.getByLabelText(/sort by/i);
      await user.selectOptions(sortSelect, 'oldest');

      expect(mockProps.onSortChange).toHaveBeenCalledWith('oldest');
    });
  });

  describe('Layout toggle', () => {
    it('should render both layout buttons', () => {
      render(<BlogFilters {...mockProps} />);

      const gridButton = screen.getByLabelText(/grid layout/i);
      const listButton = screen.getByLabelText(/list layout/i);

      expect(gridButton).toBeInTheDocument();
      expect(listButton).toBeInTheDocument();
    });

    it('should mark grid button as active when layout is grid', () => {
      render(<BlogFilters {...mockProps} layout="grid" />);

      const gridButton = screen.getByLabelText(/grid layout/i);
      expect(gridButton).toHaveClass(/active/);
    });

    it('should mark list button as active when layout is list', () => {
      render(<BlogFilters {...mockProps} layout="list" />);

      const listButton = screen.getByLabelText(/list layout/i);
      expect(listButton).toHaveClass(/active/);
    });

    it('should call onLayoutChange when grid button is clicked', async () => {
      const user = userEvent.setup();
      render(<BlogFilters {...mockProps} layout="list" />);

      const gridButton = screen.getByLabelText(/grid layout/i);
      await user.click(gridButton);

      expect(mockProps.onLayoutChange).toHaveBeenCalledWith('grid');
    });

    it('should call onLayoutChange when list button is clicked', async () => {
      const user = userEvent.setup();
      render(<BlogFilters {...mockProps} layout="grid" />);

      const listButton = screen.getByLabelText(/list layout/i);
      await user.click(listButton);

      expect(mockProps.onLayoutChange).toHaveBeenCalledWith('list');
    });

    it('should have proper title attributes for tooltips', () => {
      render(<BlogFilters {...mockProps} />);

      const gridButton = screen.getByLabelText(/grid layout/i);
      const listButton = screen.getByLabelText(/list layout/i);

      expect(gridButton).toHaveAttribute('title', 'Grid layout');
      expect(listButton).toHaveAttribute('title', 'List layout');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for all interactive elements', () => {
      render(<BlogFilters {...mockProps} searchQuery="test" />);

      expect(screen.getByLabelText(/search blog posts/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/grid layout/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/list layout/i)).toBeInTheDocument();
    });

    it('should allow keyboard navigation through category buttons', () => {
      render(<BlogFilters {...mockProps} />);

      const allButton = screen.getByText('All');
      const firstCategoryButton = screen.getByText(mockCategories[0]);

      // Elements should be focusable
      allButton.focus();
      expect(document.activeElement).toBe(allButton);

      // Can manually focus next button
      firstCategoryButton.focus();
      expect(document.activeElement).toBe(firstCategoryButton);
    });
  });

  describe('Animation', () => {
    it('should render with framer-motion animation props', () => {
      const { container } = render(<BlogFilters {...mockProps} />);

      // Check if the component renders (framer-motion wraps it)
      const filtersDiv = container.querySelector('[class*="filters"]');
      expect(filtersDiv).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty categories array', () => {
      render(<BlogFilters {...mockProps} categories={[]} />);

      expect(screen.getByText('All')).toBeInTheDocument();
      // Should not throw error
    });

    it('should handle very long search query', async () => {
      const user = userEvent.setup();
      const longQuery = 'a'.repeat(200);

      render(<BlogFilters {...mockProps} />);

      const searchInput = screen.getByPlaceholderText(/search blog posts/i);
      await user.type(searchInput, longQuery);

      expect(mockProps.onSearchChange).toHaveBeenCalled();
    });

    it('should handle special characters in category names', () => {
      const specialCategories = ['AI/ML', 'C++', 'Web & Mobile'];
      render(<BlogFilters {...mockProps} categories={specialCategories} />);

      specialCategories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    it('should not break when callbacks are not provided', () => {
      // This tests defensive programming
      const minimalProps = {
        ...mockProps,
        onCategoryChange: undefined as any,
        onSearchChange: undefined as any,
        onSortChange: undefined as any,
        onLayoutChange: undefined as any,
      };

      expect(() => render(<BlogFilters {...minimalProps} />)).not.toThrow();
    });
  });

  describe('Visual states', () => {
    it('should apply correct styles to active category button', () => {
      render(<BlogFilters {...mockProps} selectedCategory="Cloud" />);

      const cloudButton = screen.getByText('Cloud');
      const allButton = screen.getByText('All');

      expect(cloudButton).toHaveClass(/active/);
      expect(allButton).not.toHaveClass(/active/);
    });

    it('should show search icon', () => {
      const { container } = render(<BlogFilters {...mockProps} />);

      const searchIcon = container.querySelector('svg');
      expect(searchIcon).toBeInTheDocument();
    });
  });
});
