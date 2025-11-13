/**
 * Global Error Handler
 * Centralized error handling and reporting
 */

import { logger } from './logger.js';

class ErrorHandler {
  constructor() {
    this.errors = [];
    this.maxErrors = 50;
    this.setupGlobalHandlers();
  }

  /**
   * Setup global error handlers
   */
  setupGlobalHandlers() {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error,
        timestamp: new Date().toISOString()
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'Unhandled Promise Rejection',
        message: event.reason?.message || event.reason,
        error: event.reason,
        timestamp: new Date().toISOString()
      });
    });

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.handleResourceError({
          type: 'Resource Load Error',
          element: event.target.tagName,
          src: event.target.src || event.target.href,
          timestamp: new Date().toISOString()
        });
      }
    }, true);
  }

  /**
   * Handle JavaScript errors
   */
  handleError(errorInfo) {
    logger.error('Error occurred:', errorInfo);
    
    this.errors.push(errorInfo);
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Report to error tracking service (implement as needed)
    this.reportError(errorInfo);
  }

  /**
   * Handle resource loading errors
   */
  handleResourceError(errorInfo) {
    logger.warn('Resource failed to load:', errorInfo);
    
    // Optionally retry loading or show fallback
    this.reportError(errorInfo);
  }

  /**
   * Report error to tracking service
   */
  reportError(errorInfo) {
    // Implement error reporting here
    // Examples: Sentry, Rollbar, custom endpoint
    
    // For now, just log in development
    if (window.location.hostname === 'localhost') {
      logger.debug('Error report:', errorInfo);
    }
  }

  /**
   * Get error history
   */
  getErrors() {
    return [...this.errors];
  }

  /**
   * Clear error history
   */
  clearErrors() {
    this.errors = [];
  }

  /**
   * Create user-friendly error message
   */
  getUserMessage(error) {
    const messages = {
      'NetworkError': 'Network connection issue. Please check your internet connection.',
      'TypeError': 'An unexpected error occurred. Please refresh the page.',
      'SyntaxError': 'A technical error occurred. Please try again.',
      'default': 'Something went wrong. Please try again or contact support.'
    };

    const errorType = error.constructor.name;
    return messages[errorType] || messages.default;
  }

  /**
   * Show error notification to user
   */
  showErrorNotification(message, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
      <div class="error-notification-content">
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="error-notification-close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f44336;
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 400px;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Close button handler
    const closeBtn = notification.querySelector('.error-notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentElement) {
          notification.style.animation = 'slideOutRight 0.3s ease-out';
          setTimeout(() => notification.remove(), 300);
        }
      }, duration);
    }
  }
}

// Create singleton instance
const errorHandler = new ErrorHandler();

// Export for use in other modules
export { ErrorHandler, errorHandler };
