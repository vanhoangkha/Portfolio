import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';
import { useIsMobile, useIsTablet } from '@hooks/useMediaQuery';
import type { Testimonial } from '@/types';
import styles from './TestimonialCarousel.module.css';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

/**
 * Testimonial Carousel Component
 * Auto-playing carousel with manual navigation controls
 */
export const TestimonialCarousel = ({
  testimonials,
  autoPlayInterval = 5000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
}: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Determine items per view based on screen size
  const getItemsPerView = useCallback(() => {
    if (isMobile) return itemsPerView.mobile;
    if (isTablet) return itemsPerView.tablet;
    return itemsPerView.desktop;
  }, [isMobile, isTablet, itemsPerView]);

  const itemsToShow = getItemsPerView();
  const totalSlides = Math.ceil(testimonials.length / itemsToShow);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, autoPlayInterval]);

  // Navigation handlers
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  // Get testimonials for current slide
  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * itemsToShow;
    return testimonials.slice(startIndex, startIndex + itemsToShow);
  };

  if (testimonials.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No testimonials available</p>
      </div>
    );
  }

  return (
    <div className={styles.carouselContainer}>
      {/* Carousel */}
      <div className={styles.carousel} role="region" aria-label="Testimonials carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className={styles.carouselTrack}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {getCurrentTestimonials().map((testimonial, index) => (
              <div key={testimonial.id} className={styles.carouselItem}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {totalSlides > 1 && (
        <div className={styles.controls}>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className={styles.navButton}
            aria-label="Previous testimonials"
            disabled={totalSlides <= 1}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className={styles.dots} role="tablist" aria-label="Testimonial slides">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className={styles.navButton}
            aria-label="Next testimonials"
            disabled={totalSlides <= 1}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Auto-play Toggle */}
      {totalSlides > 1 && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={styles.autoPlayToggle}
          aria-label={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
          title={isAutoPlaying ? 'Pause' : 'Play'}
        >
          {isAutoPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3H7V13H5V3Z" fill="currentColor" />
              <path d="M9 3H11V13H9V3Z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3L12 8L5 13V3Z" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};
