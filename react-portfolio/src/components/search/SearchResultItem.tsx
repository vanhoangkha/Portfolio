import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { SearchResult } from '@/types';
import styles from './SearchResultItem.module.css';

interface SearchResultItemProps {
  result: SearchResult;
  query: string;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Highlight matching text in search results
 */
const highlightMatch = (text: string, query: string): React.ReactNode => {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className={styles.highlight}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

/**
 * Get icon for result type
 */
const getTypeIcon = (type: SearchResult['type']): string => {
  switch (type) {
    case 'project':
      return 'fas fa-code';
    case 'blog':
      return 'fas fa-blog';
    case 'skill':
      return 'fas fa-star';
    case 'experience':
      return 'fas fa-briefcase';
    default:
      return 'fas fa-file';
  }
};

/**
 * Get type label
 */
const getTypeLabel = (type: SearchResult['type']): string => {
  switch (type) {
    case 'project':
      return 'Project';
    case 'blog':
      return 'Blog';
    case 'skill':
      return 'Skill';
    case 'experience':
      return 'Experience';
    default:
      return 'Item';
  }
};

/**
 * Search Result Item Component
 * Displays a single search result with highlighting
 */
export const SearchResultItem = ({
  result,
  query,
  isSelected,
  onClick,
}: SearchResultItemProps) => {
  return (
    <motion.div
      className={`${styles.item} ${isSelected ? styles.selected : ''}`}
      whileHover={{ backgroundColor: 'var(--bg-secondary)' }}
      transition={{ duration: 0.2 }}
    >
      <Link to={result.url} onClick={onClick} className={styles.link}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.typeBadge} data-type={result.type}>
              <i className={getTypeIcon(result.type)} />
              <span>{getTypeLabel(result.type)}</span>
            </div>
            {result.score < 0.3 && (
              <span className={styles.exactMatch}>Exact Match</span>
            )}
          </div>

          <h4 className={styles.title}>{highlightMatch(result.title, query)}</h4>

          {result.excerpt && (
            <p className={styles.excerpt}>{highlightMatch(result.excerpt, query)}</p>
          )}

          {result.tags && result.tags.length > 0 && (
            <div className={styles.tags}>
              {result.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.arrow}>
          <i className="fas fa-chevron-right" />
        </div>
      </Link>
    </motion.div>
  );
};

