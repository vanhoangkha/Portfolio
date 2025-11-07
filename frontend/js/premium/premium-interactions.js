// ===================================
// PREMIUM INTERACTIONS & ANIMATIONS
// Advanced JavaScript Features
// ===================================

// ===================================
// Toast Notification System
// ===================================
class ToastManager {
    constructor() {
        this.container = this.createContainer();
        this.toasts = [];
    }

    createContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };

        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${titles[type]}</div>
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
        `;

        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.remove(toast));

        // Auto remove
        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }

        return toast;
    }

    remove(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            toast.remove();
            this.toasts = this.toasts.filter(t => t !== toast);
        }, 300);
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// Initialize Toast Manager
const toast = new ToastManager();

// Make toast available globally
window.toast = toast;

// ===================================
// Advanced Form Validation
// ===================================
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.fields = [];
        this.setupValidation();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            this.fields.push({
                element: input,
                rules: this.getValidationRules(input)
            });

            // Real-time validation
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    this.validateField(input);
                }
            });
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.handleSubmit();
            }
        });
    }

    getValidationRules(input) {
        const rules = [];

        if (input.hasAttribute('required')) {
            rules.push({
                type: 'required',
                message: 'This field is required'
            });
        }

        if (input.type === 'email') {
            rules.push({
                type: 'email',
                message: 'Please enter a valid email address'
            });
        }

        if (input.hasAttribute('minlength')) {
            rules.push({
                type: 'minlength',
                value: input.getAttribute('minlength'),
                message: `Minimum ${input.getAttribute('minlength')} characters required`
            });
        }

        return rules;
    }

    validateField(input) {
        const field = this.fields.find(f => f.element === input);
        let isValid = true;
        let errorMessage = '';

        for (const rule of field.rules) {
            if (rule.type === 'required' && !input.value.trim()) {
                isValid = false;
                errorMessage = rule.message;
                break;
            }

            if (rule.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    errorMessage = rule.message;
                    break;
                }
            }

            if (rule.type === 'minlength' && input.value.length > 0) {
                if (input.value.length < rule.value) {
                    isValid = false;
                    errorMessage = rule.message;
                    break;
                }
            }
        }

        this.updateFieldUI(input, isValid, errorMessage);
        return isValid;
    }

    updateFieldUI(input, isValid, errorMessage) {
        input.classList.remove('valid', 'invalid');
        input.classList.add(isValid ? 'valid' : 'invalid');

        // Update or create error message
        let errorElement = input.parentElement.querySelector('.form-error-message');
        if (!errorElement && !isValid) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error-message';
            input.parentElement.appendChild(errorElement);
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
        }

        // Add validation icons
        this.addValidationIcon(input, isValid);
    }

    addValidationIcon(input, isValid) {
        // Remove existing icons
        const existingIcons = input.parentElement.querySelectorAll('.form-validation-icon');
        existingIcons.forEach(icon => icon.remove());

        // Add new icon
        const icon = document.createElement('i');
        icon.className = `form-validation-icon ${isValid ? 'success fas fa-check-circle' : 'error fas fa-times-circle'}`;
        input.parentElement.appendChild(icon);
    }

    validateForm() {
        let isValid = true;

        this.fields.forEach(field => {
            if (!this.validateField(field.element)) {
                isValid = false;
            }
        });

        return isValid;
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate API call
        setTimeout(() => {
            // Create mailto link
            const subject = encodeURIComponent(data.subject || 'Contact Form Submission');
            const body = encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
            );
            const mailtoLink = `mailto:khavan.work@gmail.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;

            // Reset form
            this.form.reset();
            this.fields.forEach(field => {
                field.element.classList.remove('valid', 'invalid');
                const icons = field.element.parentElement.querySelectorAll('.form-validation-icon');
                icons.forEach(icon => icon.remove());
            });

            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Show success toast
            toast.success('Message sent successfully! Your email client will open.', 5000);
        }, 1000);
    }
}

// Initialize form validation for contact form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormValidator(contactForm);
    }
});

// ===================================
// 3D Card Tilt Effect
// ===================================
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.card-3d-tilt');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

// ===================================
// Spotlight Effect
// ===================================
function initSpotlightEffect() {
    const containers = document.querySelectorAll('.spotlight-container');

    containers.forEach(container => {
        let spotlight = container.querySelector('.spotlight-effect');

        if (!spotlight) {
            spotlight = document.createElement('div');
            spotlight.className = 'spotlight-effect';
            container.appendChild(spotlight);
        }

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            spotlight.style.left = `${x}px`;
            spotlight.style.top = `${y}px`;
        });
    });
}

// ===================================
// Ripple Effect
// ===================================
function createRipple(event) {
    const button = event.currentTarget;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn, .ripple-container');
    rippleElements.forEach(element => {
        if (!element.classList.contains('ripple-container')) {
            element.classList.add('ripple-container');
        }
        element.addEventListener('click', createRipple);
    });
}

// ===================================
// Scroll Reveal Animations
// ===================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===================================
// Custom Cursor (Desktop Only)
// ===================================
function initCustomCursor() {
    if (window.innerWidth < 768) return;

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth follow for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Expand on hover
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, input, textarea');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('expanded');
        });
        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('expanded');
        });
    });
}

// ===================================
// Floating Action Button (FAB)
// ===================================
function initFloatingActionButton() {
    const fabHTML = `
        <div class="fab-container">
            <button class="fab-main" aria-label="Actions">
                <i class="fas fa-plus"></i>
            </button>
            <div class="fab-actions">
                <button class="fab-action" aria-label="Back to top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="fab-action" aria-label="Share" onclick="sharePortfolio()">
                    <i class="fas fa-share-alt"></i>
                </button>
                <button class="fab-action" aria-label="Contact" onclick="document.querySelector('#contact').scrollIntoView({behavior: 'smooth'})">
                    <i class="fas fa-envelope"></i>
                </button>
            </div>
        </div>
    `;

    const fabContainer = document.createElement('div');
    fabContainer.innerHTML = fabHTML;
    document.body.appendChild(fabContainer.firstElementChild);

    const fabMain = document.querySelector('.fab-main');
    const fabContainerEl = document.querySelector('.fab-container');

    fabMain.addEventListener('click', () => {
        fabContainerEl.classList.toggle('active');
        const icon = fabMain.querySelector('i');
        if (fabContainerEl.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-plus');
        }
    });

    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabContainerEl.contains(e.target)) {
            fabContainerEl.classList.remove('active');
            const icon = fabMain.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-plus');
        }
    });
}

// ===================================
// Share Portfolio Function
// ===================================
function sharePortfolio() {
    if (navigator.share) {
        navigator.share({
            title: 'Kha Van Hoang - Cloud Solutions Architect',
            text: 'Check out my portfolio showcasing cloud architecture, AI/ML, and DevSecOps expertise.',
            url: window.location.href
        }).then(() => {
            toast.success('Thanks for sharing!');
        }).catch(() => {
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        toast.success('Link copied to clipboard!');
    });
}

// ===================================
// Enhanced Card Interactions
// ===================================
function enhanceCards() {
    const cards = document.querySelectorAll('.project-card, .blog-card, .skill-category');

    cards.forEach(card => {
        // Add glass effect
        card.classList.add('glass-card-enhanced');

        // Add 3D tilt
        card.classList.add('card-3d-tilt');

        // Add spotlight container
        if (!card.classList.contains('spotlight-container')) {
            card.classList.add('spotlight-container');
        }
    });
}

// ===================================
// Smooth Scroll Progress Indicator
// ===================================
function initScrollProgress() {
    const progressRing = document.createElement('div');
    progressRing.className = 'progress-ring';
    progressRing.innerHTML = `
        <svg width="60" height="60">
            <circle
                class="progress-ring-circle"
                stroke="var(--primary-color)"
                stroke-width="4"
                fill="transparent"
                r="26"
                cx="30"
                cy="30"
            />
        </svg>
    `;

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        progressRing.style.display = 'none';
        backToTop.parentElement.appendChild(progressRing);

        const circle = progressRing.querySelector('.progress-ring-circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            const offset = circumference - (scrollPercent * circumference);

            circle.style.strokeDashoffset = offset;

            if (scrollTop > 300) {
                progressRing.style.display = 'block';
            } else {
                progressRing.style.display = 'none';
            }
        });

        progressRing.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        progressRing.style.cursor = 'pointer';
    }
}

// ===================================
// Performance Optimization
// ===================================
function optimizeAnimations() {
    // Add will-change property to animated elements
    const animatedElements = document.querySelectorAll(
        '.floating-card, .project-card, .blog-card, .skill-category, .timeline-item'
    );

    animatedElements.forEach(element => {
        element.classList.add('gpu-accelerated');
    });
}

// ===================================
// Initialize All Premium Features
// ===================================
function initPremiumFeatures() {
    console.log('%c✨ Initializing Premium Features...', 'color: #FF9900; font-size: 14px; font-weight: bold;');

    // Initialize features
    init3DTiltEffect();
    initSpotlightEffect();
    initRippleEffect();
    initScrollReveal();
    initCustomCursor();
    initFloatingActionButton();
    initScrollProgress();
    enhanceCards();
    optimizeAnimations();

    // Add gradient mesh to hero
    const hero = document.querySelector('.hero-background');
    if (hero && !hero.querySelector('.gradient-mesh-animated')) {
        const mesh = document.createElement('div');
        mesh.className = 'gradient-mesh-animated';
        hero.appendChild(mesh);
    }

    console.log('%c✅ Premium Features Initialized!', 'color: #1EC876; font-size: 14px; font-weight: bold;');

    // Show welcome toast
    setTimeout(() => {
        toast.info('Welcome! Press "T" to toggle theme, or use the FAB menu for quick actions.', 5000);
    }, 1000);
}

// ===================================
// Page Load Handler
// ===================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumFeatures);
} else {
    initPremiumFeatures();
}

// Export functions for global use
window.toast = toast;
window.sharePortfolio = sharePortfolio;
