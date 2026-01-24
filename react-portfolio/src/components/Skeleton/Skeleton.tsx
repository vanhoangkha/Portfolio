import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton Loader Component
 * Provides loading placeholders for better UX
 */
export const Skeleton = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) => {
  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || '1rem',
  };

  return (
    <motion.div
      className={clsx(
        styles.skeleton,
        styles[variant],
        styles[animation],
        className
      )}
      style={style}
      animate={
        animation === 'pulse'
          ? {
              opacity: [0.6, 1, 0.6],
            }
          : animation === 'wave'
          ? {
              backgroundPosition: ['200% 0', '-200% 0'],
            }
          : {}
      }
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

/**
 * Skeleton Text Component
 * For loading text content
 */
export const SkeletonText = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => {
  return (
    <div className={clsx(styles.textContainer, className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '60%' : '100%'}
          className={styles.textLine}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton Card Component
 * For loading card components
 */
export const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(styles.card, className)}>
      <Skeleton variant="rectangular" height="200px" className={styles.image} />
      <div className={styles.content}>
        <Skeleton width="40%" height="12px" className={styles.category} />
        <Skeleton width="80%" height="20px" className={styles.title} />
        <SkeletonText lines={2} className={styles.description} />
        <div className={styles.meta}>
          <Skeleton width="100px" height="12px" />
          <Skeleton width="80px" height="12px" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton Project Card Component
 * For loading project cards
 */
export const SkeletonProjectCard = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(styles.projectCard, className)}>
      <Skeleton variant="circular" width="60px" height="60px" className={styles.icon} />
      <Skeleton width="70%" height="24px" className={styles.title} />
      <SkeletonText lines={2} className={styles.description} />
      <div className={styles.tags}>
        <Skeleton width="80px" height="24px" />
        <Skeleton width="100px" height="24px" />
        <Skeleton width="70px" height="24px" />
      </div>
      <div className={styles.actions}>
        <Skeleton width="100px" height="36px" />
        <Skeleton width="100px" height="36px" />
      </div>
    </div>
  );
};

