import type { AnalyticsData, DateRange } from '@/types';
import { logger } from '@utils/logger';
import { API_DELAYS } from '@/constants/timing';

/**
 * Analytics Service
 * Fetches analytics data from Google Analytics 4 API or mock data
 * TODO: Replace with actual GA4 API integration
 */

/**
 * Fetch analytics overview data
 */
export const fetchAnalyticsOverview = async (
  dateRange?: DateRange
): Promise<AnalyticsData> => {
  // Mock implementation - replace with actual GA4 API call
  await new Promise((resolve) => setTimeout(resolve, API_DELAYS.STANDARD));

  // Generate mock data based on date range
  const days = dateRange
    ? Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24))
    : 30;

  const baseViews = days * 150;
  const variance = Math.floor(Math.random() * 50);

  return {
    pageViews: baseViews + variance,
    uniqueVisitors: Math.floor((baseViews + variance) * 0.65),
    bounceRate: 35.5 + Math.random() * 10,
    avgSessionDuration: 180 + Math.random() * 60,
    topPages: [
      { path: '/', title: 'Home', views: Math.floor(baseViews * 0.4), uniqueViews: Math.floor(baseViews * 0.25), avgTimeOnPage: 120 },
      { path: '/blog', title: 'Blog', views: Math.floor(baseViews * 0.25), uniqueViews: Math.floor(baseViews * 0.18), avgTimeOnPage: 240 },
      { path: '/resume', title: 'Resume', views: Math.floor(baseViews * 0.15), uniqueViews: Math.floor(baseViews * 0.12), avgTimeOnPage: 90 },
      { path: '/#projects', title: 'Projects', views: Math.floor(baseViews * 0.12), uniqueViews: Math.floor(baseViews * 0.08), avgTimeOnPage: 180 },
      { path: '/#about', title: 'About', views: Math.floor(baseViews * 0.08), uniqueViews: Math.floor(baseViews * 0.06), avgTimeOnPage: 150 },
    ],
    referralSources: [
      { source: 'Direct', visits: Math.floor(baseViews * 0.4), percentage: 40 },
      { source: 'Google Search', visits: Math.floor(baseViews * 0.35), percentage: 35 },
      { source: 'LinkedIn', visits: Math.floor(baseViews * 0.15), percentage: 15 },
      { source: 'GitHub', visits: Math.floor(baseViews * 0.07), percentage: 7 },
      { source: 'Other', visits: Math.floor(baseViews * 0.03), percentage: 3 },
    ],
    trafficTrend: generateTrafficTrend(days),
  };
};

/**
 * Generate mock traffic trend data
 */
const generateTrafficTrend = (days: number): AnalyticsData['trafficTrend'] => {
  const trend: AnalyticsData['trafficTrend'] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseViews = 100 + Math.random() * 50;
    const baseVisitors = Math.floor(baseViews * 0.65);

    trend.push({
      date: date.toISOString().split('T')[0],
      views: Math.floor(baseViews),
      visitors: baseVisitors,
    });
  }

  return trend;
};

/**
 * Export analytics data to CSV
 */
export const exportAnalyticsToCSV = (data: AnalyticsData, filename = 'analytics.csv'): void => {
  try {
    // Create CSV content
    const csvRows: string[] = [];

    // Overview metrics
    csvRows.push('Metric,Value');
    csvRows.push(`Page Views,${data.pageViews}`);
    csvRows.push(`Unique Visitors,${data.uniqueVisitors}`);
    csvRows.push(`Bounce Rate,${data.bounceRate.toFixed(2)}%`);
    csvRows.push(`Avg Session Duration,${Math.floor(data.avgSessionDuration)}s`);
    csvRows.push('');

    // Top Pages
    csvRows.push('Top Pages');
    csvRows.push('Path,Title,Views,Unique Views,Avg Time (s)');
    data.topPages.forEach((page) => {
      csvRows.push(`${page.path},${page.title},${page.views},${page.uniqueViews},${Math.floor(page.avgTimeOnPage)}`);
    });
    csvRows.push('');

    // Referral Sources
    csvRows.push('Referral Sources');
    csvRows.push('Source,Visits,Percentage');
    data.referralSources.forEach((source) => {
      csvRows.push(`${source.source},${source.visits},${source.percentage}%`);
    });
    csvRows.push('');

    // Traffic Trend
    csvRows.push('Traffic Trend');
    csvRows.push('Date,Views,Visitors');
    data.trafficTrend.forEach((day) => {
      csvRows.push(`${day.date},${day.views},${day.visitors}`);
    });

    // Create blob and download
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    logger.info('Analytics data exported to CSV');
  } catch (error) {
    logger.error('Failed to export analytics data:', error);
    throw error;
  }
};

