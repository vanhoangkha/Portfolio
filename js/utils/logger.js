/**
 * Logger Utility
 * Centralized logging with environment-aware output
 */

const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';

const LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

class Logger {
  constructor(context = 'App') {
    this.context = context;
    this.enabled = isDevelopment;
  }

  error(message, ...args) {
    console.error(`[${this.context}] ${message}`, ...args);
  }

  warn(message, ...args) {
    console.warn(`[${this.context}] ${message}`, ...args);
  }

  info(message, ...args) {
    if (this.enabled) {
      console.info(`[${this.context}] ℹ️ ${message}`, ...args);
    }
  }

  debug(message, ...args) {
    if (this.enabled) {
      console.log(`[${this.context}] ${message}`, ...args);
    }
  }

  success(message, ...args) {
    if (this.enabled) {
      console.log(`%c[${this.context}] ${message}`, 'color: #1EC876', ...args);
    }
  }

  group(label, callback) {
    if (this.enabled) {
      console.group(`[${this.context}] ${label}`);
      callback();
      console.groupEnd();
    }
  }
}

// Create default logger instance
const logger = new Logger('Portfolio');

// Export for use in other modules
export { Logger, logger, LogLevel };
