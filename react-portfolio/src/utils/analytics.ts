import { logger } from './logger';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const analytics = {
  pageView: (path: string) => {
    logger.debug('Page view:', path);
    // Implement your analytics provider here
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: path });
  },

  event: ({ category, action, label, value }: AnalyticsEvent) => {
    logger.debug('Analytics event:', { category, action, label, value });
    // Implement your analytics provider here
    // Example: gtag('event', action, { event_category: category, event_label: label, value });
  },

  trackDownload: (fileName: string) => {
    analytics.event({
      category: 'Download',
      action: 'Click',
      label: fileName,
    });
  },

  trackExternalLink: (url: string) => {
    analytics.event({
      category: 'External Link',
      action: 'Click',
      label: url,
    });
  },

  trackFormSubmit: (formName: string) => {
    analytics.event({
      category: 'Form',
      action: 'Submit',
      label: formName,
    });
  },
};
