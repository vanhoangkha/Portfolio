import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import type { TrafficData } from '@/types';
import styles from './TrafficChart.module.css';

interface TrafficChartProps {
  data: TrafficData[];
  dateRange?: { start: Date; end: Date };
}

/**
 * Traffic Chart Component
 * Displays traffic trends over time using Recharts
 */
export const TrafficChart = ({ data, dateRange }: TrafficChartProps) => {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: formatDate(item.date),
      views: item.views,
      visitors: item.visitors,
    }));
  }, [data]);

  return (
    <motion.div
      className={styles.chartContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>Traffic Trend</h3>
        {dateRange && (
          <span className={styles.dateRange}>
            {formatDateRange(dateRange.start, dateRange.end)}
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis
            dataKey="date"
            stroke="var(--text-secondary)"
            style={{ fontSize: '0.75rem' }}
            tick={{ fill: 'var(--text-tertiary)' }}
          />
          <YAxis
            stroke="var(--text-secondary)"
            style={{ fontSize: '0.75rem' }}
            tick={{ fill: 'var(--text-tertiary)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
            }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '1rem' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="var(--primary-color)"
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--primary-color)' }}
            name="Page Views"
          />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="var(--secondary-color)"
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--secondary-color)' }}
            name="Unique Visitors"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

/**
 * Format date for display
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/**
 * Format date range for display
 */
const formatDateRange = (start: Date, end: Date): string => {
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
};

