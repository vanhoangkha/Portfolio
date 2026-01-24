import { motion } from 'framer-motion';
import { CountUp } from '@components/CountUp';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: string;
  description?: string;
}

/**
 * Metric Card Component
 * Displays a single analytics metric with optional trend indicator
 */
export const MetricCard = ({
  title,
  value,
  unit = '',
  trend,
  icon,
  description,
}: MetricCardProps) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className={styles.header}>
        {icon && (
          <div className={styles.icon}>
            <i className={icon} />
          </div>
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>

      <div className={styles.value}>
        <CountUp end={value} duration={1.5} />
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>

      {trend && (
        <div className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative}`}>
          <i className={`fas fa-arrow-${trend.isPositive ? 'up' : 'down'}`} />
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </motion.div>
  );
};

