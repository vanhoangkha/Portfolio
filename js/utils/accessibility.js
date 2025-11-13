/**
 * Accessibility Utilities
 * WCAG 2.1 Level AA compliance helpers
 */

import { logger } from './logger.js';

class AccessibilityManager {
  constructor() {
    this.focusableElements = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
  }

  /**
   * Initialize accessibility features
   */
  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupAriaLiveRegions();
    this.setupSkipLinks();
    logger.success('Accessibility features initialized');
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    // Escape key to close modals/menus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
        this.closeMobileMenu();
      }
    });

    // Tab trap for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal.active, [role="dialog"][aria-hidden="false"]');
        if (modal) {
          this.trapFocus(e, modal);
        }
      }
    });
  }

  /**
   * Trap focus within an element
   */
  trapFocus(event, element) {
    const focusable = element.querySelectorAll(this.focusableElements);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  /**
   * Setup focus management
   */
  setupFocusManagement() {
    // Add visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });

    // Restore focus after modal close
    this.lastFocusedElement = null;
  }

  /**
   * Setup ARIA live regions
   */
  setupAriaLiveRegions() {
    if (!document.getElementById('aria-live-region')) {
      const liveRegion = document.createElement('div');
      liveRegion.id = 'aria-live-region';
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
  }

  /**
   * Announce message to screen readers
   */
  announce(message, priority = 'polite') {
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  /**
   * Setup skip links
   */
  setupSkipLinks() {
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.addEventListener('blur', () => {
            target.removeAttribute('tabindex');
          }, { once: true });
        }
      });
    }
  }

  /**
   * Close all modals
   */
  closeAllModals() {
    const modals = document.querySelectorAll('.modal.active, [role="dialog"][aria-hidden="false"]');
    modals.forEach(modal => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });

    // Restore focus
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('mobileMenuToggle');
    
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      
      const icon = menuToggle?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  }

  /**
   * Check color contrast ratio
   */
  checkContrast(foreground, background) {
    const getLuminance = (color) => {
      const rgb = color.match(/\d+/g).map(Number);
      const [r, g, b] = rgb.map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      ratio: ratio.toFixed(2),
      passAA: ratio >= 4.5,
      passAAA: ratio >= 7
    };
  }

  /**
   * Add ARIA labels to elements missing them
   */
  auditAriaLabels() {
    const issues = [];

    // Check buttons without labels
    document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(btn => {
      if (!btn.textContent.trim()) {
        issues.push({ element: btn, issue: 'Button without accessible label' });
      }
    });

    // Check images without alt text
    document.querySelectorAll('img:not([alt])').forEach(img => {
      issues.push({ element: img, issue: 'Image without alt text' });
    });

    // Check form inputs without labels
    document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(input => {
      const id = input.id;
      if (!id || !document.querySelector(`label[for="${id}"]`)) {
        issues.push({ element: input, issue: 'Input without associated label' });
      }
    });

    if (issues.length > 0) {
      logger.warn('Accessibility issues found:', issues);
    } else {
      logger.success('No accessibility issues found');
    }

    return issues;
  }

  /**
   * Enable high contrast mode
   */
  enableHighContrast() {
    document.body.classList.add('high-contrast');
    localStorage.setItem('highContrast', 'true');
    this.announce('High contrast mode enabled');
  }

  /**
   * Disable high contrast mode
   */
  disableHighContrast() {
    document.body.classList.remove('high-contrast');
    localStorage.setItem('highContrast', 'false');
    this.announce('High contrast mode disabled');
  }

  /**
   * Toggle high contrast mode
   */
  toggleHighContrast() {
    if (document.body.classList.contains('high-contrast')) {
      this.disableHighContrast();
    } else {
      this.enableHighContrast();
    }
  }
}

// Create singleton instance
const accessibilityManager = new AccessibilityManager();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => accessibilityManager.init());
} else {
  accessibilityManager.init();
}

export { AccessibilityManager, accessibilityManager };
