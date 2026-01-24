import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import type { ReferralSource } from '@/types';
import styles from './ReferralSources.module.css';

interface ReferralSourcesProps {
  sources: ReferralSource[];
}

const COLORS = [
  'var(--primary-color)',
  'var(--secondary-color)',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
];

/**
 * Referral Sources Component
 * Displays traffic sources as a pie chart
 */
export const ReferralSources = ({ sources }: ReferralSourcesProps) => {
  const chartData = useMemo(() => {
    return sources.map((source) => ({
      name: source.source,
      value: source.visits,
      percentage: source.percentage,
    }));
  }, [sources]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.title}>Referral Sources</h3>

      <div className={styles.content}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => {
                const source = sources.find(s => s.source === entry.name);
                return `${entry.name}: ${source?.percentage || 0}%`;
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
              }}
              labelStyle={{ color: 'var(--text-primary)' }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.list}>
          {sources.map((source, index) => (
            <div key={source.source} className={styles.sourceItem}>
              <div className={styles.sourceHeader}>
                <div
                  className={styles.colorIndicator}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className={styles.sourceName}>{source.source}</span>
              </div>
              <div className={styles.sourceStats}>
                <span className={styles.visits}>{source.visits.toLocaleString()}</span>
                <span className={styles.percentage}>{source.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

