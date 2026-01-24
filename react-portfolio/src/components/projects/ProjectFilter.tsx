import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProjectFilterStore } from '@store/projectFilterStore';
import styles from './ProjectFilter.module.css';

interface ProjectFilterProps {
  availableTechnologies: string[];
  availableCategories: string[];
  resultCount: number;
  totalCount: number;
}

export const ProjectFilter = ({
  availableTechnologies,
  availableCategories,
  resultCount,
  totalCount,
}: ProjectFilterProps) => {
  const { t } = useTranslation('projects');
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    filters,
    setTechnology,
    setCategory,
    setStatus,
    setSearchQuery,
    clearFilters,
    getActiveFilterCount,
  } = useProjectFilterStore();

  const activeCount = getActiveFilterCount();

  return (
    <motion.div
      className={styles.filterContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.filterHeader}>
        <h3>{t('filter.title')}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.expandButton}
          aria-label={isExpanded ? t('common:collapse') : t('common:expand')}
          aria-expanded={isExpanded}
        >
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`} />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.filterContent}
          >
            {/* Search */}
            <div className={styles.searchBox}>
              <i className="fas fa-search" />
              <input
                type="text"
                placeholder={t('filter.searchPlaceholder')}
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearch}
                  aria-label={t('common:clear')}
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </div>

            {/* Technologies */}
            <div className={styles.filterGroup}>
              <h4>
                {t('filter.technology')}
                {filters.technologies.length > 0 && (
                  <span className={styles.count}>({filters.technologies.length})</span>
                )}
              </h4>
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
              <h4>
                {t('filter.category')}
                {filters.categories.length > 0 && (
                  <span className={styles.count}>({filters.categories.length})</span>
                )}
              </h4>
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
                    {filters.categories.includes(category) && (
                      <i className="fas fa-check" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className={styles.filterGroup}>
              <h4>{t('filter.status')}</h4>
              <select
                value={filters.status}
                onChange={(e) => setStatus(e.target.value as typeof filters.status)}
                className={styles.select}
              >
                <option value="all">{t('filter.all')}</option>
                <option value="completed">{t('status.completed')}</option>
                <option value="ongoing">{t('status.ongoing')}</option>
                <option value="archived">{t('status.archived')}</option>
              </select>
            </div>

            {/* Active Filters */}
            {activeCount > 0 && (
              <div className={styles.activeFilters}>
                <span className={styles.activeLabel}>
                  {t('filter.activeFilters')}: {activeCount}
                </span>
                <button onClick={clearFilters} className={styles.clearAll}>
                  <i className="fas fa-times" /> {t('filter.clearAll')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className={styles.resultCount}>
        {t('filter.resultsCount', { count: resultCount, total: totalCount })}
      </div>
    </motion.div>
  );
};

