import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '@hooks/useAnalytics';
import { exportAnalyticsToCSV } from '@/services/api/analyticsService';
import { MetricCard } from '@components/analytics/MetricCard';
import { TrafficChart } from '@components/analytics/TrafficChart';
import { TopPagesTable } from '@components/analytics/TopPagesTable';
import { ReferralSources } from '@components/analytics/ReferralSources';
import { DateRangePicker } from '@components/analytics/DateRangePicker';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { SEO } from '@components/SEO';
import type { DateRange } from '@/types';
import styles from './DashboardPage.module.css';

/**
 * Dashboard Page Component
 * Displays analytics overview with metrics, charts, and tables
 * Protected route - requires admin authentication
 */
export const DashboardPage = () => {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end, preset: '30d' };
  });

  const { data: analyticsData, isLoading, error } = useAnalytics(dateRange);

  const handleExport = () => {
    if (analyticsData) {
      const filename = `analytics-${dateRange.start.toISOString().split('T')[0]}-${dateRange.end.toISOString().split('T')[0]}.csv`;
      exportAnalyticsToCSV(analyticsData, filename);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className={styles.errorContainer}>
        <i className="fas fa-exclamation-triangle" />
        <h2>Failed to load analytics</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Analytics Dashboard"
        description="Portfolio analytics and visitor insights"
        noindex
      />

      <div className={styles.dashboard}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className={styles.title}>Analytics Dashboard</h1>
            <p className={styles.subtitle}>Visitor insights and engagement metrics</p>
          </div>
          <div className={styles.actions}>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <button
              className={styles.exportButton}
              onClick={handleExport}
              aria-label="Export to CSV"
            >
              <i className="fas fa-download" />
              Export CSV
            </button>
          </div>
        </motion.header>

        {/* Key Metrics */}
        <div className={styles.metricsGrid}>
          <MetricCard
            title="Page Views"
            value={analyticsData.pageViews}
            icon="fas fa-eye"
            description="Total page views in selected period"
          />
          <MetricCard
            title="Unique Visitors"
            value={analyticsData.uniqueVisitors}
            icon="fas fa-users"
            description="Distinct visitors"
          />
          <MetricCard
            title="Bounce Rate"
            value={analyticsData.bounceRate}
            unit="%"
            icon="fas fa-chart-line"
            description="Single-page sessions"
          />
          <MetricCard
            title="Avg Session"
            value={Math.floor(analyticsData.avgSessionDuration)}
            unit="s"
            icon="fas fa-clock"
            description="Average session duration"
          />
        </div>

        {/* Charts and Tables */}
        <div className={styles.contentGrid}>
          <motion.div
            className={styles.chartSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TrafficChart data={analyticsData.trafficTrend} dateRange={dateRange} />
          </motion.div>

          <motion.div
            className={styles.sourcesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ReferralSources sources={analyticsData.referralSources} />
          </motion.div>
        </div>

        <motion.div
          className={styles.tableSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TopPagesTable pages={analyticsData.topPages} />
        </motion.div>
      </div>
    </>
  );
};

