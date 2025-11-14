import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@hooks/useSearch';
import { SearchResults } from './SearchResults';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  variant?: 'header' | 'modal';
  onResultClick?: () => void;
}

/**
 * Search Bar Component
 * Global search with keyboard shortcuts and results dropdown
 */
export const SearchBar = ({ variant = 'header', onResultClick }: SearchBarProps) => {
  const { t } = useTranslation('common');
  const {
    query,
    results,
    suggestions,
    isLoading,
    isOpen,
    handleSearch,
    clearSearch,
    toggleSearch,
    setIsOpen,
  } = useSearch();

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
        setTimeout(() => inputRef.current?.focus(), 100);
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleSearch, setIsOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setIsOpen]);

  // Sync input value with search query
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);
    if (value.length > 0) {
      setIsOpen(true);
    }
  };

  const handleClear = () => {
    setInputValue('');
    clearSearch();
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (inputValue.length > 0 || results.length > 0) {
      setIsOpen(true);
    }
  };

  if (variant === 'modal') {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)} />
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className={styles.modalHeader}>
            <i className="fas fa-search" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              placeholder={t('search.placeholder', 'Search projects, blog posts, skills...')}
              className={styles.modalInput}
              autoFocus
            />
            {inputValue && (
              <button
                onClick={handleClear}
                className={styles.clearButton}
                aria-label={t('search.clear', 'Clear search')}
              >
                <i className="fas fa-times" />
              </button>
            )}
          </div>
          {isOpen && (
            <SearchResults
              results={results}
              suggestions={suggestions}
              isLoading={isLoading}
              query={inputValue}
              onResultClick={() => {
                setIsOpen(false);
                onResultClick?.();
              }}
            />
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.searchInputWrapper}>
        <i className="fas fa-search" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={t('search.placeholder', 'Search...')}
          className={styles.input}
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className={styles.clearButton}
            aria-label={t('search.clear', 'Clear')}
          >
            <i className="fas fa-times" />
          </button>
        )}
        <kbd className={styles.shortcut}>⌘K</kbd>
      </div>

      <AnimatePresence>
        {isOpen && (
          <SearchResults
            results={results}
            suggestions={suggestions}
            isLoading={isLoading}
            query={inputValue}
            onResultClick={() => {
              setIsOpen(false);
              onResultClick?.();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

