// Enhanced Smooth Scroll with Easing and Animations
class SmoothScroll {
  constructor(options = {}) {
    this.options = {
      duration: options.duration || 800,
      easing: options.easing || 'easeInOutCubic',
      offset: options.offset || 80, // Navbar height
      updateURL: options.updateURL !== false,
      callback: options.callback || null
    };

    this.easings = {
      linear: (t) => t,
      easeInQuad: (t) => t * t,
      easeOutQuad: (t) => t * (2 - t),
      easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      easeInCubic: (t) => t * t * t,
      easeOutCubic: (t) => (--t) * t * t + 1,
      easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      easeInQuart: (t) => t * t * t * t,
      easeOutQuart: (t) => 1 - (--t) * t * t * t,
      easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    };

    this.init();
  }

  init() {
    // Handle hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          this.scrollTo(target);
          if (this.options.updateURL) {
            history.pushState(null, null, href);
          }
        }
      });
    });

    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          this.scrollTo(target);
        }
      }, 100);
    }

    // Add scroll event for revealing elements
    this.addScrollReveal();
  }

  scrollTo(target, customDuration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - this.options.offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = customDuration || this.options.duration;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      const easingValue = this.easings[this.options.easing](percentage);

      window.scrollTo(0, startPosition + distance * easingValue);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        if (this.options.callback) {
          this.options.callback(target);
        }
        // Trigger animation on target element
        target.classList.add('scroll-target-active');
        setTimeout(() => target.classList.remove('scroll-target-active'), 1000);
      }
    };

    requestAnimationFrame(step);
  }

  addScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-scroll', 'visible');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(section);
    });
  }
}

// Scroll Progress Indicator
class ScrollProgress {
  constructor() {
    this.createProgressBar();
    this.updateProgress();
    window.addEventListener('scroll', () => this.updateProgress());
  }

  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      z-index: 9999;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
  }

  updateProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }
}

// Parallax Scrolling Enhancement
class EnhancedParallax {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax-speed]');
    if (this.elements.length > 0) {
      this.init();
    }
  }

  init() {
    // Use Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', () => this.updateParallax(entry.target));
        }
      });
    });

    this.elements.forEach(element => observer.observe(element));
  }

  updateParallax(element) {
    const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
    const rect = element.getBoundingClientRect();
    const scrolled = window.pageYOffset;

    // Only update if element is in viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }
}

// Scroll Snap Enhancement
class ScrollSnap {
  constructor(sections) {
    this.sections = sections || document.querySelectorAll('section');
    this.currentSection = 0;
    this.isScrolling = false;
    this.init();
  }

  init() {
    // Add scroll snap behavior
    document.documentElement.style.scrollSnapType = 'y proximity';
    this.sections.forEach(section => {
      section.style.scrollSnapAlign = 'start';
      section.style.scrollSnapStop = 'normal';
    });
  }

  snapToSection(index) {
    if (index >= 0 && index < this.sections.length) {
      this.currentSection = index;
      this.sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Smooth Scroll to Top Button Enhancement
class ScrollToTop {
  constructor() {
    this.button = document.getElementById('backToTop') || this.createButton();
    this.init();
  }

  createButton() {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);
    return button;
  }

  init() {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });

    // Smooth scroll to top on click
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Add hover effect
    this.button.addEventListener('mouseenter', () => {
      this.button.style.transform = 'translateY(-5px) scale(1.1)';
    });

    this.button.addEventListener('mouseleave', () => {
      this.button.style.transform = 'translateY(0) scale(1)';
    });
  }
}

// Section Active State Manager
class ActiveSectionTracker {
  constructor() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.updateActiveLink(id);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => observer.observe(section));
  }

  updateActiveLink(activeId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize all scroll enhancements
function initSmoothScroll() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    new SmoothScroll({
      duration: 800,
      easing: 'easeInOutCubic',
      offset: 80
    });

    new ScrollProgress();
    new EnhancedParallax();
    new ScrollToTop();
    new ActiveSectionTracker();
  } else {
    // Simpler scroll for users who prefer reduced motion
    new ScrollToTop();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmoothScroll);
} else {
  initSmoothScroll();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SmoothScroll,
    ScrollProgress,
    EnhancedParallax,
    ScrollSnap,
    ScrollToTop,
    ActiveSectionTracker
  };
}
