const isDevelopment = import.meta.env?.DEV ?? false;

export const logger = {
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log('[INFO]', ...args);
    }
  },

  warn: (...args: unknown[]) => {
    console.warn('[WARN]', ...args);
  },

  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args);
  },

  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug('[DEBUG]', ...args);
    }
  },

  success: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log('%c[SUCCESS]', 'color: #1EC876; font-weight: bold', ...args);
    }
  },
};
