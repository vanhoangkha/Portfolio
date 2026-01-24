import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchResultItem } from './SearchResultItem';
import type { SearchResult } from '@/types';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  results: SearchResult[];
  suggestions?: string[];
  isLoading: boolean;
  query: string;
  onResultClick?: () => void;
}

/**
 * Search Results Component
 * Displays search results with keyboard navigation
 */
export const SearchResults = ({
  results,
  suggestions = [],
  isLoading,
  query,
  onResultClick,
}: SearchResultsProps) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            navigate(results[selectedIndex].url);
            onResultClick?.();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, navigate, onResultClick]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedItem = itemRefs.current[selectedIndex];
    if (selectedItem && resultsRef.current) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  if (isLoading) {
    return (
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className={styles.loading}>
          <i className="fas fa-spinner fa-spin" />
          <span>Searching...</span>
        </div>
      </motion.div>
    );
  }

  if (query.length < 2) {
    if (suggestions.length > 0) {
      return (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className={styles.suggestions}>
            <h4 className={styles.sectionTitle}>Suggestions</h4>
            <div className={styles.suggestionList}>
              {suggestions.map((suggestion, index) => (
                <div key={index} className={styles.suggestionItem}>
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  }

  if (results.length === 0) {
    return (
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className={styles.empty}>
          <i className="fas fa-search" />
          <p>No results found for &quot;{query}&quot;</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={resultsRef}
      className={styles.container}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className={styles.header}>
        <span className={styles.count}>
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </span>
      </div>

      <div className={styles.results}>
        {results.map((result, index) => (
          <div
            key={result.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
          >
            <SearchResultItem
              result={result}
              query={query}
              isSelected={index === selectedIndex}
              onClick={() => {
                navigate(result.url);
                onResultClick?.();
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

