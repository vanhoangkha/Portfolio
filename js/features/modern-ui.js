/**
 * Modern UI Enhancement JavaScript
 * Handles advanced interactions, animations, and effects
 */

class ModernUIManager {
  constructor() {
    this.scrollRevealObserver = null;
    this.card3DElements = [];
    this.particleSystem = null;
    this.init();
  }

  init() {
    console.log('✨ Modern UI Manager initialized');
    this.initScrollReveal();
    this.init3DCards();
    this.initRippleEffect();
    this.initTooltips();
    this.initSmoothScroll();
    this.initParallaxEffects();
  }

  /**
     * Scroll Reveal Animations
     */
  initScrollReveal() {
    const revealElements = document.querySelectorAll('[class*="reveal"]');

    if ('IntersectionObserver' in window) {
      this.scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Optionally unobserve after revealing
            // this.scrollRevealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => {
        this.scrollRevealObserver.observe(el);
      });

      console.log(`🎭 Scroll reveal initialized for ${revealElements.length} elements`);
    }
  }

  /**
     * 3D Card Effects with Mouse Tracking
     */
  init3DCards() {
    this.card3DElements = document.querySelectorAll('.card-3d');

    this.card3DElements.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handle3DCardMove(e, card));
      card.addEventListener('mouseleave', () => this.handle3DCardLeave(card));
    });

    console.log(`🎴 3D cards initialized: ${this.card3DElements.length}`);
  }

  handle3DCardMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(10px)
        `;

    // Move glow effect
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255, 153, 0, 0.3),
                    transparent 50%
                )
            `;
    }
  }

  handle3DCardLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }

  /**
     * Ripple Effect on Buttons
     */
  initRippleEffect() {
    const rippleElements = document.querySelectorAll('.ripple, .btn, button');

    rippleElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple-effect');

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    console.log('💧 Ripple effect initialized');
  }

  /**
     * Enhanced Tooltips
     */
  initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => this.showTooltip(e, element));
      element.addEventListener('mouseleave', () => this.hideTooltip());
    });

    console.log(`💬 Tooltips initialized: ${tooltipElements.length}`);
  }

  showTooltip(e, element) {
    const text = element.getAttribute('data-tooltip');
    const position = element.getAttribute('data-tooltip-position') || 'top';

    // Remove existing tooltip
    this.hideTooltip();

    const tooltip = document.createElement('div');
    tooltip.className = `modern-tooltip ${position}`;
    tooltip.textContent = text;
    tooltip.id = 'active-tooltip';
    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top, left;

    switch (position) {
      case 'top':
        top = rect.top - tooltipRect.height - 10;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = rect.bottom + 10;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.left - tooltipRect.width - 10;
        break;
      case 'right':
        top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.right + 10;
        break;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // Animate in
    requestAnimationFrame(() => {
      tooltip.classList.add('visible');
    });
  }

  hideTooltip() {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
      setTimeout(() => tooltip.remove(), 200);
    }
  }

  /**
     * Smooth Scroll Enhancement
     */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') {return;}

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
     * Parallax Effects
     */
  initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });

    console.log(`🌊 Parallax effects initialized: ${parallaxElements.length}`);
  }

  /**
     * Add Loading Progress Bar
     */
  showPageTransition() {
    const bar = document.createElement('div');
    bar.className = 'page-transition-bar';
    document.body.appendChild(bar);

    setTimeout(() => {
      bar.style.width = '100%';
      setTimeout(() => bar.remove(), 300);
    }, 50);
  }

  /**
     * Add Floating Particles Background
     */
  initFloatingParticles(containerId = 'particles-container') {
    const container = document.getElementById(containerId);
    if (!container) {
      // Create container
      const newContainer = document.createElement('div');
      newContainer.id = containerId;
      newContainer.className = 'floating-particles';
      document.body.insertBefore(newContainer, document.body.firstChild);
      return this.createParticles(newContainer);
    }
    return this.createParticles(container);
  }

  createParticles(container) {
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random position and animation
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${10 + Math.random() * 20}s`;

      // Random size
      const size = 2 + Math.random() * 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      container.appendChild(particle);
    }

    console.log('✨ Floating particles created');
  }

  /**
     * Progress Circle Animation
     */
  animateProgressCircles() {
    const circles = document.querySelectorAll('.progress-circle');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const percentage = circle.getAttribute('data-percentage');
          const progressBar = circle.querySelector('.progress-bar');

          if (progressBar) {
            // Calculate stroke-dashoffset
            const radius = 54;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;

            progressBar.style.strokeDasharray = circumference;
            progressBar.style.strokeDashoffset = circumference;

            // Animate
            setTimeout(() => {
              progressBar.style.strokeDashoffset = offset;
            }, 100);
          }

          observer.unobserve(circle);
        }
      });
    }, { threshold: 0.5 });

    circles.forEach(circle => observer.observe(circle));

    console.log(`📊 Progress circles animated: ${circles.length}`);
  }

  /**
     * Enhanced Navbar Scroll Effect
     */
  enhanceNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {return;}

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.classList.add('navbar-scrolled', 'navbar-glass');
      } else {
        navbar.classList.remove('navbar-scrolled', 'navbar-glass');
      }

      // Hide on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.classList.add('navbar-hidden');
      } else {
        navbar.classList.remove('navbar-hidden');
      }

      lastScroll = currentScroll;
    });

    console.log('📱 Enhanced navbar scroll effects');
  }

  /**
     * Text Gradient Animation
     */
  animateGradientText() {
    const gradientTexts = document.querySelectorAll('.gradient-text-animated');

    gradientTexts.forEach(text => {
      text.style.backgroundSize = '200% 200%';
    });

    console.log(`🎨 Gradient text animations: ${gradientTexts.length}`);
  }

  /**
     * Initialize All Enhancements
     */
  static initAll() {
    const manager = new ModernUIManager();
    manager.enhanceNavbar();
    manager.animateProgressCircles();
    manager.animateGradientText();

    // Optional: Add floating particles
    // manager.initFloatingParticles();

    return manager;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ModernUIManager.initAll());
} else {
  ModernUIManager.initAll();
}

// Export for manual control
window.ModernUIManager = ModernUIManager;

console.log('🚀 Modern UI JavaScript loaded');
