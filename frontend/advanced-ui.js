/**
 * Advanced UI JavaScript - Premium Edition
 * Handles ultra-modern interactions and visual effects
 */

class AdvancedUIController {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.followerX = 0;
        this.followerY = 0;
        this.init();
    }

    init() {
        console.log('🚀 Advanced UI Controller initialized');
        this.initCustomCursor();
        this.initScrollProgress();
        this.initMagneticButtons();
        this.initTextScramble();
        this.initBlobMorphing();
        this.initImageEffects();
        this.initFloatingActionButtons();
        this.initPagePreloader();
        this.initNoiseOverlay();
    }

    /**
     * Custom Cursor with Follower
     */
    initCustomCursor() {
        // Skip on touch devices
        if ('ontouchstart' in window) {
            console.log('⏭️  Skipping custom cursor on touch device');
            return;
        }

        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        document.body.appendChild(this.cursorFollower);

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            // Update cursor position immediately
            this.cursor.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
        });

        // Smooth follower animation
        const animateFollower = () => {
            // Smooth lerp
            this.followerX += (this.mouseX - this.followerX) * 0.15;
            this.followerY += (this.mouseY - this.followerY) * 0.15;

            this.cursorFollower.style.transform = `translate(${this.followerX}px, ${this.followerY}px)`;

            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"], input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorFollower.classList.remove('hover');
            });
        });

        console.log('🎯 Custom cursor initialized');
    }

    /**
     * Scroll Progress Indicator
     */
    initScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // Create circular progress with scroll to top
        const progressCircle = document.createElement('div');
        progressCircle.className = 'scroll-progress-circle';
        progressCircle.innerHTML = `
            <svg width="60" height="60">
                <circle cx="30" cy="30" r="26"></circle>
                <circle class="progress" cx="30" cy="30" r="26"></circle>
            </svg>
            <i class="fas fa-arrow-up scroll-to-top-icon"></i>
        `;
        document.body.appendChild(progressCircle);

        const circle = progressCircle.querySelector('.progress');
        const circumference = 2 * Math.PI * 26;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            // Update bar
            progressBar.style.width = `${scrollPercent}%`;

            // Update circle
            const offset = circumference - (scrollPercent / 100) * circumference;
            circle.style.strokeDashoffset = offset;

            // Show/hide circle button
            if (scrollTop > 300) {
                progressCircle.classList.add('visible');
            } else {
                progressCircle.classList.remove('visible');
            }
        });

        // Scroll to top on click
        progressCircle.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        console.log('📊 Scroll progress initialized');
    }

    /**
     * Magnetic Button Effects
     */
    initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.btn-magnetic, .btn-primary, .btn-secondary');

        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Magnetic strength (max 20px pull)
                const strength = 0.3;
                const moveX = x * strength;
                const moveY = y * strength;

                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });

        console.log(`🧲 Magnetic buttons initialized: ${magneticButtons.length}`);
    }

    /**
     * Text Scramble Effect
     */
    initTextScramble() {
        const scrambleElements = document.querySelectorAll('.text-scramble');

        scrambleElements.forEach(element => {
            const originalText = element.textContent;
            const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

            element.addEventListener('mouseenter', () => {
                let iteration = 0;
                const interval = setInterval(() => {
                    element.textContent = originalText
                        .split('')
                        .map((char, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');

                    if (iteration >= originalText.length) {
                        clearInterval(interval);
                    }

                    iteration += 1 / 3;
                }, 30);
            });
        });

        console.log(`🔤 Text scramble initialized: ${scrambleElements.length}`);
    }

    /**
     * Advanced Blob Morphing
     */
    initBlobMorphing() {
        const blobContainer = document.createElement('div');
        blobContainer.className = 'blob-container';
        blobContainer.innerHTML = `
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        `;
        document.body.insertBefore(blobContainer, document.body.firstChild);

        console.log('💧 Blob morphing initialized');
    }

    /**
     * Image Hover Effects
     */
    initImageEffects() {
        // Zoom effect
        const zoomImages = document.querySelectorAll('.image-hover-zoom, .project-image');
        zoomImages.forEach(container => {
            if (!container.classList.contains('image-hover-zoom')) {
                container.classList.add('image-hover-zoom');
            }
        });

        // Parallax effect on images
        const parallaxImages = document.querySelectorAll('.image-hover-parallax img');
        parallaxImages.forEach(img => {
            const container = img.closest('.image-hover-parallax');
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                img.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.1)`;
            });

            container.addEventListener('mouseleave', () => {
                img.style.transform = 'translate(0, 0) scale(1)';
            });
        });

        console.log('🖼️  Image effects initialized');
    }

    /**
     * Floating Action Buttons
     */
    initFloatingActionButtons() {
        const fabContainer = document.createElement('div');
        fabContainer.className = 'fab-container';
        fabContainer.innerHTML = `
            <div class="fab" data-action="theme">
                <i class="fas fa-palette"></i>
                <span class="fab-tooltip">Toggle Theme</span>
            </div>
            <div class="fab" data-action="share">
                <i class="fas fa-share-alt"></i>
                <span class="fab-tooltip">Share Portfolio</span>
            </div>
            <div class="fab" data-action="download">
                <i class="fas fa-download"></i>
                <span class="fab-tooltip">Download Resume</span>
            </div>
        `;
        document.body.appendChild(fabContainer);

        // FAB actions
        fabContainer.querySelectorAll('.fab').forEach(fab => {
            fab.addEventListener('click', () => {
                const action = fab.dataset.action;
                this.handleFABAction(action);
            });
        });

        console.log('🔘 Floating action buttons initialized');
    }

    handleFABAction(action) {
        switch (action) {
            case 'theme':
                // Toggle theme
                const themeToggle = document.getElementById('themeToggle');
                if (themeToggle) {
                    themeToggle.click();
                }
                break;
            case 'share':
                // Share portfolio
                if (navigator.share) {
                    navigator.share({
                        title: 'Kha Van Hoang - Portfolio',
                        text: 'Check out my portfolio!',
                        url: window.location.href
                    }).catch(() => {});
                } else {
                    // Fallback: copy URL
                    navigator.clipboard.writeText(window.location.href);
                    this.showToast('Link copied to clipboard!');
                }
                break;
            case 'download':
                // Download resume
                this.showToast('Resume download coming soon!');
                break;
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            border-radius: 50px;
            color: white;
            z-index: 10000;
            animation: toastSlideUp 0.3s ease;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    /**
     * Page Preloader
     */
    initPagePreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'page-preloader';
        preloader.innerHTML = `
            <div class="preloader-logo">KVH</div>
            <div class="preloader-spinner"></div>
            <div class="preloader-progress">
                <div class="preloader-progress-bar"></div>
            </div>
        `;
        document.body.appendChild(preloader);

        const progressBar = preloader.querySelector('.preloader-progress-bar');

        // Simulate loading progress
        let progress = 0;
        const loadInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadInterval);
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => preloader.remove(), 600);
                }, 300);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);

        console.log('⏳ Page preloader initialized');
    }

    /**
     * Noise Texture Overlay
     */
    initNoiseOverlay() {
        const noise = document.createElement('div');
        noise.className = 'noise-overlay';
        document.body.insertBefore(noise, document.body.firstChild);

        console.log('🔊 Noise overlay initialized');
    }

    /**
     * Text Split Animation
     */
    splitText(element) {
        const text = element.textContent;
        element.innerHTML = '';
        element.classList.add('text-split');

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });
    }

    /**
     * Add Tilt Effect to Element
     */
    addTiltEffect(element) {
        element.classList.add('tilt-card');

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Update light position
            element.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            element.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    /**
     * Create Interactive Particles
     */
    createInteractiveParticles(container, count = 20) {
        const containerEl = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        if (!containerEl) return;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-interactive';

            const size = 2 + Math.random() * 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;

            containerEl.appendChild(particle);
        }

        // Add mouse interaction
        containerEl.addEventListener('mousemove', (e) => {
            const particles = containerEl.querySelectorAll('.particle-interactive');
            const rect = containerEl.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            particles.forEach(particle => {
                const particleRect = particle.getBoundingClientRect();
                const particleX = particleRect.left - rect.left + particleRect.width / 2;
                const particleY = particleRect.top - rect.top + particleRect.height / 2;

                const deltaX = mouseX - particleX;
                const deltaY = mouseY - particleY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                // Repel particles within 100px radius
                if (distance < 100) {
                    const angle = Math.atan2(deltaY, deltaX);
                    const force = (100 - distance) / 100;
                    const repelX = -Math.cos(angle) * force * 50;
                    const repelY = -Math.sin(angle) * force * 50;

                    particle.style.setProperty('--repel-x', `${repelX}px`);
                    particle.style.setProperty('--repel-y', `${repelY}px`);
                    particle.classList.add('repel');

                    setTimeout(() => {
                        particle.classList.remove('repel');
                    }, 500);
                }
            });
        });

        console.log(`✨ Interactive particles created: ${count}`);
    }

    /**
     * Static utility methods
     */
    static initAll() {
        const controller = new AdvancedUIController();

        // Auto-apply effects to certain elements
        setTimeout(() => {
            // Add gradient borders to certain cards
            document.querySelectorAll('.certification-badge, .achievement-card').forEach(card => {
                if (!card.classList.contains('gradient-border')) {
                    card.classList.add('gradient-border');
                }
            });

            // Add float effect to icons
            document.querySelectorAll('.social-link, .category-header i').forEach(icon => {
                if (!icon.classList.contains('float-element')) {
                    icon.classList.add('float-element');
                }
            });
        }, 1000);

        return controller;
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdvancedUIController.initAll());
} else {
    AdvancedUIController.initAll();
}

// Export for manual control
window.AdvancedUIController = AdvancedUIController;

console.log('🎨 Advanced UI JavaScript loaded');

// Add CSS animations for toast
if (!document.getElementById('advanced-ui-animations')) {
    const style = document.createElement('style');
    style.id = 'advanced-ui-animations';
    style.textContent = `
        @keyframes toastSlideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }

        .toast {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}
