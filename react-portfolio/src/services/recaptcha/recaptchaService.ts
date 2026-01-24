import { logger } from '@utils/logger';

/**
 * reCAPTCHA Service
 * Handles Google reCAPTCHA v3 integration
 */

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const RECAPTCHA_SCRIPT_ID = 'recaptcha-script';

/**
 * Load reCAPTCHA script
 */
export const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      if (window.grecaptcha) {
        resolve();
        return;
      }
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('reCAPTCHA script timeout'));
      }, 10000);
      return;
    }

    // Create and append script
    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha.ready(() => {
        logger.info('reCAPTCHA loaded successfully');
        resolve();
      });
    };

    script.onerror = () => {
      logger.error('Failed to load reCAPTCHA script');
      reject(new Error('Failed to load reCAPTCHA script'));
    };

    document.head.appendChild(script);
  });
};

/**
 * Execute reCAPTCHA and get token
 */
export const executeRecaptcha = async (action: string): Promise<string | null> => {
  if (!RECAPTCHA_SITE_KEY) {
    logger.warn('reCAPTCHA site key not configured');
    return null;
  }

  try {
    // Ensure script is loaded
    if (!window.grecaptcha) {
      await loadRecaptchaScript();
    }

    // Wait for grecaptcha to be ready
    await new Promise<void>((resolve) => {
      window.grecaptcha.ready(() => {
        resolve();
      });
    });

    // Execute reCAPTCHA
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    logger.debug('reCAPTCHA token generated');
    return token;
  } catch (error) {
    logger.error('reCAPTCHA execution failed:', error);
    return null;
  }
};

/**
 * Check if reCAPTCHA is available
 */
export const isRecaptchaAvailable = (): boolean => {
  return !!RECAPTCHA_SITE_KEY && !!window.grecaptcha;
};

