/**
 * Ultra Modern UI Interactions
 * Advanced animations and effects
 */

(function() {
    'use strict';

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-delay-100, .reveal-delay-200, .reveal-delay-300, .reveal-delay-400, .reveal-delay-500');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ========================================
    // PARALLAX SCROLL EFFECT
    // ========================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax, .parallax-fast');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.classList.contains('parallax-fast') ? 0.5 : 0.3;
                const yPos = -(scrolled * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }, { passive: true });
    }

    // ========================================
    // MAGNETIC BUTTONS
    // ========================================
    function initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.btn-magnetic');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.2;
                const moveY = y * 0.2;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // ========================================
    // 3D CARD TILT EFFECT
    // ========================================
    function init3DCards() {
        const cards3D = document.querySelectorAll('.card-3d, .card-3d-strong');
        
        cards3D.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // ========================================
    // SMOOTH SCROLL TO SECTION
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // CURSOR TRAIL EFFECT
    // ========================================
    function initCursorTrail() {
        if (window.innerWidth < 768) return; // Skip on mobile

        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll('.cursor-circle');
        
        if (circles.length === 0) {
            // Create cursor circles if they don't exist
            for (let i = 0; i < 20; i++) {
                const circle = document.createElement('div');
                circle.className = 'cursor-circle';
                circle.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--primary-color);
                    pointer-events: none;
                    z-index: 9999;
                    opacity: ${1 - i * 0.05};
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(circle);
            }
        }
        
        const allCircles = document.querySelectorAll('.cursor-circle');
        
        window.addEventListener('mousemove', (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });
        
        function animateCircles() {
            let x = coords.x;
            let y = coords.y;
            
            allCircles.forEach((circle, index) => {
                circle.style.left = x - 5 + 'px';
                circle.style.top = y - 5 + 'px';
                circle.style.scale = (allCircles.length - index) / allCircles.length;
                
                const nextCircle = allCircles[index + 1] || allCircles[0];
                x += (parseInt(nextCircle.style.left) || 0) * 0.1;
                y += (parseInt(nextCircle.style.top) || 0) * 0.1;
            });
            
            requestAnimationFrame(animateCircles);
        }
        
        animateCircles();
    }

    // ========================================
    // FLOATING ELEMENTS
    // ========================================
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-card');
        
        floatingElements.forEach((el, index) => {
            const delay = index * 0.5;
            const duration = 3 + Math.random() * 2;
            
            el.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
        });
    }

    // ========================================
    // GRADIENT MESH BACKGROUND
    // ========================================
    function initGradientMesh() {
        const mesh = document.querySelector('.gradient-mesh');
        if (!mesh) return;
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            mesh.style.background = `
                radial-gradient(at ${mouseX * 100}% ${mouseY * 100}%, rgba(255, 153, 0, 0.2), transparent 50%),
                radial-gradient(at ${(1 - mouseX) * 100}% ${(1 - mouseY) * 100}%, rgba(102, 126, 234, 0.2), transparent 50%),
                radial-gradient(at 50% 50%, rgba(118, 75, 162, 0.1), transparent 70%)
            `;
        });
    }

    // ========================================
    // TEXT TYPING ANIMATION
    // ========================================
    function initTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;
        
        const texts = [
            'Solutions Architect',
            'Cloud Specialist',
            'AI/ML Engineer',
            'DevSecOps Expert',
            'AWS Community Builder'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    let current = 0;
                    const increment = count / 100;
                    const duration = 2000;
                    const stepTime = duration / 100;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= count) {
                            target.textContent = count;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(current);
                        }
                    }, stepTime);
                    
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ========================================
    // ENHANCED NAVBAR ON SCROLL
    // ========================================
    function initEnhancedNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('glass-effect');
                navbar.style.background = 'var(--glass-bg)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.classList.remove('glass-effect');
                navbar.style.background = '';
                navbar.style.backdropFilter = '';
            }
            
            // Hide on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ========================================
    // IMAGE LAZY LOADING WITH BLUR
    // ========================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // INITIALIZE ALL EFFECTS
    // ========================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        console.log('🎨 Initializing Ultra Modern UI...');
        
        initScrollReveal();
        initParallax();
        initMagneticButtons();
        init3DCards();
        initSmoothScroll();
        initFloatingElements();
        initGradientMesh();
        initTypingAnimation();
        initCounters();
        initEnhancedNavbar();
        initLazyLoading();
        
        // Skip cursor trail on mobile or if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion && window.innerWidth >= 768) {
            // initCursorTrail(); // Commented out as it can be distracting
        }
        
        console.log('✨ Ultra Modern UI initialized!');
    }

    // Start initialization
    init();

})();

