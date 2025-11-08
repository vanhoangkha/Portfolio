// Portfolio Utility Functions and Enhancements

// Loading State Manager
class LoadingManager {
  constructor() {
    this.loadingStates = new Map();
  }

  showLoading(elementId, message = 'Loading...') {
    const element = document.getElementById(elementId);
    if (!element) {return;}

    const loadingHTML = `
            <div class="loading-container" data-loading="${elementId}">
                <div class="loading-spinner">
                    <div class="spinner"></div>
                </div>
                <p class="loading-message">${message}</p>
            </div>
        `;

    element.innerHTML = loadingHTML;
    this.loadingStates.set(elementId, true);
  }

  hideLoading(elementId) {
    const loadingElement = document.querySelector(`[data-loading="${elementId}"]`);
    if (loadingElement) {
      loadingElement.remove();
    }
    this.loadingStates.set(elementId, false);
  }

  isLoading(elementId) {
    return this.loadingStates.get(elementId) || false;
  }
}

// Error Handler
class ErrorHandler {
  constructor() {
    this.errors = [];
  }

  showError(elementId, message, retryCallback = null) {
    const element = document.getElementById(elementId);
    if (!element) {return;}

    const errorHTML = `
            <div class="error-container" data-error="${elementId}">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <p class="error-message">${message}</p>
                ${retryCallback ? `
                    <button class="btn btn-secondary retry-btn" onclick="portfolioUtils.retry('${elementId}')">
                        <i class="fas fa-redo"></i> Retry
                    </button>
                ` : ''}
            </div>
        `;

    element.innerHTML = errorHTML;
    this.errors.push({ elementId, message, timestamp: new Date() });

    // Store retry callback
    if (retryCallback) {
      this.retryCallbacks = this.retryCallbacks || {};
      this.retryCallbacks[elementId] = retryCallback;
    }
  }

  clearError(elementId) {
    const errorElement = document.querySelector(`[data-error="${elementId}"]`);
    if (errorElement) {
      errorElement.remove();
    }
  }

  retry(elementId) {
    if (this.retryCallbacks && this.retryCallbacks[elementId]) {
      this.clearError(elementId);
      this.retryCallbacks[elementId]();
    }
  }
}

// Smooth Scroll Handler
class SmoothScrollHandler {
  constructor() {
    this.initSmoothScroll();
    this.initScrollSpy();
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') {return;}

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
}

// Search and Filter Manager
class SearchFilterManager {
  constructor() {
    this.data = {
      skills: [],
      projects: [],
      blog: [],
      certifications: []
    };
  }

  setData(type, data) {
    this.data[type] = data;
  }

  search(query, type = 'all') {
    if (!query) {return this.data;}

    const searchLower = query.toLowerCase();
    const results = {};

    if (type === 'all' || type === 'skills') {
      results.skills = this.data.skills.filter(skill =>
        skill.name.toLowerCase().includes(searchLower) ||
                (skill.subcategory && skill.subcategory.toLowerCase().includes(searchLower))
      );
    }

    if (type === 'all' || type === 'projects') {
      results.projects = this.data.projects.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
                project.description.toLowerCase().includes(searchLower) ||
                (project.technologies && project.technologies.some(tech =>
                  tech.toLowerCase().includes(searchLower)
                ))
      );
    }

    if (type === 'all' || type === 'blog') {
      results.blog = this.data.blog.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
                post.excerpt.toLowerCase().includes(searchLower) ||
                (post.category && post.category.toLowerCase().includes(searchLower))
      );
    }

    return results;
  }

  filter(type, criteria) {
    if (!this.data[type]) {return [];}

    return this.data[type].filter(item => {
      return Object.entries(criteria).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.includes(item[key]);
        }
        return item[key] === value;
      });
    });
  }
}

// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.initAnimations();
  }

  initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // Optional: unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('[data-animate]').forEach(element => {
      observer.observe(element);
    });
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      loadTime: 0,
      renderTime: 0,
      apiCalls: []
    };
  }

  startTimer(name) {
    this.timers = this.timers || {};
    this.timers[name] = performance.now();
  }

  endTimer(name) {
    if (this.timers && this.timers[name]) {
      const duration = performance.now() - this.timers[name];
      this.metrics[name] = duration;
      console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  }

  logAPICall(endpoint, duration, success) {
    this.metrics.apiCalls.push({
      endpoint,
      duration,
      success,
      timestamp: new Date()
    });
  }

  getMetrics() {
    return this.metrics;
  }
}

// Local Storage Manager
class StorageManager {
  constructor() {
    this.prefix = 'portfolio_';
  }

  set(key, value) {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, data);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }

  get(key) {
    try {
      const data = localStorage.getItem(this.prefix + key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  }

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  clear() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format date utility
function formatDate(date, format = 'short') {
  const d = new Date(date);
  const options = format === 'short'
    ? { month: 'short', year: 'numeric' }
    : { month: 'long', day: 'numeric', year: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Copy failed:', error);
    return false;
  }
}

// Share functionality
async function shareContent(title, text, url) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (error) {
      console.error('Share failed:', error);
      return false;
    }
  }
  return false;
}

// Initialize global utilities
const portfolioUtils = {
  loading: new LoadingManager(),
  error: new ErrorHandler(),
  scroll: new SmoothScrollHandler(),
  search: new SearchFilterManager(),
  animation: new AnimationObserver(),
  performance: new PerformanceMonitor(),
  storage: new StorageManager(),
  debounce,
  throttle,
  formatDate,
  copyToClipboard,
  shareContent,
  retry: function (elementId) {
    this.error.retry(elementId);
  }
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.portfolioUtils = portfolioUtils;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Portfolio utilities initialized');
  portfolioUtils.performance.startTimer('pageLoad');
});

window.addEventListener('load', () => {
  portfolioUtils.performance.endTimer('pageLoad');
});
