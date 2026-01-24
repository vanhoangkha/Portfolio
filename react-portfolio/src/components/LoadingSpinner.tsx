import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ size = 'medium', fullScreen = false }: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 24,
    medium: 48,
    large: 72,
  };

  const spinnerSize = sizeMap[size];

  const spinner = (
    <motion.div
      className={styles.spinner}
      style={{ width: spinnerSize, height: spinnerSize }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="80, 200"
        />
      </svg>
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        {spinner}
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return spinner;
};
