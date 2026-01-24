import axios from 'axios';
import { logger } from '@utils/logger';
import type { NewsletterSubscription, NewsletterResponse } from '@/types';
import { API_CONFIG } from '@/constants/timing';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Newsletter Service
 * Handles newsletter subscription
 */

/**
 * Subscribe to newsletter
 */
export const subscribeToNewsletter = async (
  subscription: NewsletterSubscription
): Promise<NewsletterResponse> => {
  try {
    const response = await axios.post<NewsletterResponse>(
      `${API_BASE_URL}/newsletter/subscribe`,
      subscription,
      {
        timeout: API_CONFIG.TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    logger.info('Newsletter subscription successful');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to subscribe to newsletter';
      logger.error('Newsletter subscription failed:', message);
      return {
        success: false,
        message,
      };
    }

    logger.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

