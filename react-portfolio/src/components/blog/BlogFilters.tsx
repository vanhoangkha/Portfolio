import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './BlogFilters.module.css';

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'latest' | 'popular' | 'oldest';
  onSortChange: (sort: 'latest' | 'popular' | 'oldest') => void;
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
}

/**
 * Blog Filters Component
 * Provides search, category filter, sort, and layout controls
 */
export const BlogFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  layout,
  onLayoutChange,
}: BlogFiltersProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <motion.div
      className={styles.filters}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Bar */}
      <div className={`${styles.searchContainer} ${isSearchFocused ? styles.focused : ''}`}>
        <svg
          className={styles.searchIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className={styles.searchInput}
          aria-label="Search blog posts"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className={styles.categoryFilter}>
        <button
          onClick={() => onCategoryChange('all')}
          className={`${styles.categoryButton} ${
            selectedCategory === 'all' ? styles.active : ''
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Sort Dropdown */}
        <div className={styles.sortContainer}>
          <label htmlFor="sort-select" className={styles.sortLabel}>
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => {
              const value = e.target.value as 'latest' | 'popular' | 'oldest';
              onSortChange(value);
            }}
            className={styles.sortSelect}
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Layout Toggle */}
        <div className={styles.layoutToggle}>
          <button
            onClick={() => onLayoutChange('grid')}
            className={`${styles.layoutButton} ${
              layout === 'grid' ? styles.active : ''
            }`}
            aria-label="Grid layout"
            title="Grid layout"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="2"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="11"
                y="2"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="2"
                y="11"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="11"
                y="11"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <button
            onClick={() => onLayoutChange('list')}
            className={`${styles.layoutButton} ${
              layout === 'list' ? styles.active : ''
            }`}
            aria-label="List layout"
            title="List layout"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="3"
                width="16"
                height="3"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="2"
                y="8.5"
                width="16"
                height="3"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="2"
                y="14"
                width="16"
                height="3"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
