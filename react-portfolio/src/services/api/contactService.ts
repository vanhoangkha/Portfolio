import axios from 'axios';
import { logger } from '@utils/logger';
import type { ContactFormData, ContactFormResponse } from '@/types';
import { API_CONFIG } from '@/constants/timing';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Contact Service
 * Handles contact form submissions
 */

/**
 * Submit contact form
 */
export const submitContactForm = async (
  data: ContactFormData
): Promise<ContactFormResponse> => {
  try {
    const response = await axios.post<ContactFormResponse>(
      `${API_BASE_URL}/contact`,
      data,
      {
        timeout: API_CONFIG.TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    logger.info('Contact form submitted successfully');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to submit contact form';
      logger.error('Contact form submission failed:', message);
      return {
        success: false,
        message,
      };
    }

    logger.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

