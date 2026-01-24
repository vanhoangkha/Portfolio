import { motion, AnimatePresence } from 'framer-motion';
import type { Certification } from '@/types';
import styles from './CertificationFilter.module.css';

interface CertificationFilterProps {
  selectedCategory: Certification['category'] | 'all';
  onCategoryChange: (category: Certification['category'] | 'all') => void;
  categoryCounts: Record<string, number>;
}

const categories: Array<{ value: Certification['category'] | 'all'; label: string; icon: string }> = [
  { value: 'all', label: 'All Certifications', icon: '📚' },
  { value: 'technical', label: 'Technical', icon: '💻' },
  { value: 'professional', label: 'Professional', icon: '🎯' },
  { value: 'language', label: 'Language', icon: '🌍' },
  { value: 'other', label: 'Other', icon: '📋' },
];

/**
 * Certification Filter Component
 * Allows filtering certifications by category
 */
export const CertificationFilter = ({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
}: CertificationFilterProps) => {
  const getTotalCount = () => {
    return Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
  };

  const getCategoryCount = (category: Certification['category'] | 'all') => {
    if (category === 'all') return getTotalCount();
    return categoryCounts[category] || 0;
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterLabel}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M2 4H18M4 8H16M7 12H13M9 16H11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span>Filter by Category</span>
      </div>

      <div className={styles.filterButtons} role="tablist" aria-label="Certification categories">
        {categories.map((category) => {
          const count = getCategoryCount(category.value);
          const isActive = selectedCategory === category.value;

          return (
            <motion.button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`${styles.filterButton} ${isActive ? styles.active : ''}`}
              role="tab"
              aria-selected={isActive}
              aria-label={`${category.label} (${count} certifications)`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.icon} aria-hidden="true">
                {category.icon}
              </span>
              <span className={styles.label}>{category.label}</span>
              <span className={styles.count}>{count}</span>

              {isActive && (
                <motion.div
                  className={styles.activeIndicator}
                  layoutId="activeCategory"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active Filter Badge */}
      <AnimatePresence>
        {selectedCategory !== 'all' && (
          <motion.div
            className={styles.activeBadge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <span>
              Showing {getCategoryCount(selectedCategory)}{' '}
              {categories.find((c) => c.value === selectedCategory)?.label} certification
              {getCategoryCount(selectedCategory) !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => onCategoryChange('all')}
              className={styles.clearButton}
              aria-label="Clear filter"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
