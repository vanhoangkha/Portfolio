// Particle Animation System
class ParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {return;}

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.options = {
      particleCount: options.particleCount || 50,
      particleColor: options.particleColor || '#FF9900',
      lineColor: options.lineColor || 'rgba(255, 153, 0, 0.2)',
      particleSize: options.particleSize || 2,
      lineDistance: options.lineDistance || 150,
      particleSpeed: options.particleSpeed || 0.5,
      interactive: options.interactive !== false
    };

    this.mouse = { x: null, y: null, radius: 150 };
    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resizeCanvas());

    if (this.options.interactive) {
      this.canvas.addEventListener('mousemove', (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.particleSpeed,
        vy: (Math.random() - 0.5) * this.options.particleSpeed,
        size: Math.random() * this.options.particleSize + 1
      });
    }
  }

  drawParticle(particle) {
    this.ctx.fillStyle = this.options.particleColor;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawLine(particle1, particle2, distance) {
    const opacity = 1 - (distance / this.options.lineDistance);
    this.ctx.strokeStyle = this.options.lineColor.replace('0.2', opacity);
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(particle1.x, particle1.y);
    this.ctx.lineTo(particle2.x, particle2.y);
    this.ctx.stroke();
  }

  updateParticle(particle) {
    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Bounce off edges
    if (particle.x < 0 || particle.x > this.canvas.width) {particle.vx *= -1;}
    if (particle.y < 0 || particle.y > this.canvas.height) {particle.vy *= -1;}

    // Mouse interaction
    if (this.mouse.x !== null && this.mouse.y !== null) {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.mouse.radius) {
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const dirX = dx / distance;
        const dirY = dy / distance;

        particle.x -= dirX * force * 2;
        particle.y -= dirY * force * 2;
      }
    }
  }

  connectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.lineDistance) {
          this.drawLine(this.particles[i], this.particles[j], distance);
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });

    this.connectParticles();

    requestAnimationFrame(() => this.animate());
  }
}

// Floating Code Animation
class FloatingCode {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {return;}

    this.codes = [
      'const deploy = async () => {}',
      'kubectl apply -f deployment.yaml',
      'terraform apply -auto-approve',
      'aws s3 sync . s3://bucket',
      'docker build -t app:latest .',
      'git commit -m "feat: new feature"',
      'npm run build --production',
      'python train_model.py',
      'pip install boto3',
      'serverless deploy'
    ];

    this.init();
  }

  init() {
    setInterval(() => this.createFloatingCode(), 3000);
  }

  createFloatingCode() {
    const code = this.codes[Math.floor(Math.random() * this.codes.length)];
    const element = document.createElement('div');
    element.className = 'floating-code';
    element.textContent = code;
    element.style.left = Math.random() * 80 + 10 + '%';
    element.style.animationDuration = (Math.random() * 3 + 5) + 's';

    this.container.appendChild(element);

    setTimeout(() => element.remove(), 8000);
  }
}

// Loading Animation
class LoadingAnimation {
  constructor() {
    this.createLoader();
  }

  createLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading Experience...</div>
                <div class="loader-progress">
                    <div class="loader-progress-bar" id="loaderProgressBar"></div>
                </div>
            </div>
        `;
    document.body.appendChild(loader);

    this.animateProgress();
  }

  animateProgress() {
    const progressBar = document.getElementById('loaderProgressBar');
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => this.hideLoader(), 500);
      }
      if (progressBar) {
        progressBar.style.width = progress + '%';
      }
    }, 200);
  }

  hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
  }
}

// Page Transition Manager
class PageTransition {
  constructor() {
    this.setupTransitions();
  }

  setupTransitions() {
    // Add transition overlay
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    // Intercept navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('href');
        if (target !== '#') {
          this.transition(target);
        }
      });
    });

    // Intercept page links
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigateWithTransition(url);
      });
    });
  }

  transition(target) {
    const overlay = document.getElementById('page-transition-overlay');
    overlay.classList.add('active');

    setTimeout(() => {
      overlay.classList.remove('active');
    }, 600);
  }

  navigateWithTransition(url) {
    const overlay = document.getElementById('page-transition-overlay');
    overlay.classList.add('active');

    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }
}

// Parallax Scroll Effect
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.update());
    this.update();
  }

  update() {
    const scrolled = window.pageYOffset;

    this.elements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// Cursor Trail Effect
class CursorTrail {
  constructor() {
    this.trail = [];
    this.maxTrail = 20;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.addTrailDot(e.clientX, e.clientY);
    });
  }

  addTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    document.body.appendChild(dot);

    this.trail.push(dot);

    setTimeout(() => {
      dot.remove();
      this.trail.shift();
    }, 500);

    // Limit trail length
    if (this.trail.length > this.maxTrail) {
      this.trail[0].remove();
      this.trail.shift();
    }
  }
}

// Reveal on Scroll with Advanced Animations
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('[data-reveal]');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.getAttribute('data-reveal') || 'fade-up';
          const delay = element.getAttribute('data-reveal-delay') || 0;

          setTimeout(() => {
            element.classList.add('revealed', `reveal-${animation}`);
          }, delay);

          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.elements.forEach(element => observer.observe(element));
  }
}

// Text Animation Effects
class TextAnimator {
  static typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  static glitchEffect(element) {
    const originalText = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iterations = 0;

    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iterations) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iterations += 1 / 3;

      if (iterations >= originalText.length) {
        clearInterval(interval);
        element.textContent = originalText;
      }
    }, 30);
  }

  static splitText(element) {
    const text = element.textContent;
    element.innerHTML = '';

    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${index * 0.05}s`;
      span.className = 'split-char';
      element.appendChild(span);
    });
  }
}

// Initialize all animations
function initAdvancedAnimations() {
  // Loading animation
  new LoadingAnimation();

  // Particle system in hero
  const heroCanvas = document.getElementById('particleCanvas');
  if (heroCanvas) {
    new ParticleSystem('particleCanvas', {
      particleCount: 80,
      particleSpeed: 0.3
    });
  }

  // Floating code animation
  const codeContainer = document.getElementById('floatingCodeContainer');
  if (codeContainer) {
    new FloatingCode('floatingCodeContainer');
  }

  // Page transitions
  new PageTransition();

  // Parallax effects
  new ParallaxEffect();

  // Cursor trail (desktop only)
  if (window.innerWidth > 768) {
    new CursorTrail();
  }

  // Scroll reveal
  new ScrollReveal();

  // Text animations
  document.querySelectorAll('[data-text-animation="glitch"]').forEach(element => {
    element.addEventListener('mouseenter', () => {
      TextAnimator.glitchEffect(element);
    });
  });

  // Split text animations
  document.querySelectorAll('[data-text-split]').forEach(element => {
    TextAnimator.splitText(element);
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdvancedAnimations);
} else {
  initAdvancedAnimations();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ParticleSystem,
    FloatingCode,
    LoadingAnimation,
    PageTransition,
    ParallaxEffect,
    CursorTrail,
    ScrollReveal,
    TextAnimator
  };
}
