// ===================================
// Skills Chart Visualization
// ===================================
class SkillsChart {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.skills = [
            { name: 'AWS', level: 95, category: 'cloud' },
            { name: 'Kubernetes', level: 90, category: 'containers' },
            { name: 'Terraform', level: 88, category: 'iac' },
            { name: 'Python', level: 85, category: 'programming' },
            { name: 'AI/ML', level: 87, category: 'ai' },
            { name: 'Docker', level: 92, category: 'containers' },
            { name: 'CI/CD', level: 90, category: 'devops' },
            { name: 'Security', level: 85, category: 'security' }
        ];

        this.init();
    }

    init() {
        this.render();
        this.animateSkills();
    }

    render() {
        const html = this.skills.map((skill, index) => `
            <div class="skill-bar-item" data-index="${index}">
                <div class="skill-bar-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-bar-track">
                    <div class="skill-bar-fill" data-level="${skill.level}" style="width: 0%"></div>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = html;
    }

    animateSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.skill-bar-fill');
                    fills.forEach((fill, index) => {
                        setTimeout(() => {
                            const level = fill.getAttribute('data-level');
                            fill.style.width = level + '%';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(this.container);
    }
}

// ===================================
// Testimonials Slider
// ===================================
class TestimonialsSlider {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.testimonials = [
            {
                name: 'Sarah Chen',
                role: 'CTO, FinTech Corp',
                company: 'Major Financial Institution',
                image: '👩‍💼',
                text: 'Kha\'s expertise in cloud architecture was instrumental in our successful migration to AWS. His deep understanding of both technical and business requirements resulted in a solution that exceeded our expectations.',
                rating: 5
            },
            {
                name: 'Michael Rodriguez',
                role: 'VP Engineering',
                company: 'Tech Startup',
                image: '👨‍💻',
                text: 'Working with Kha on our AI/ML implementation was fantastic. He not only delivered a robust RAG system but also trained our team to maintain and improve it. True technical leadership.',
                rating: 5
            },
            {
                name: 'Dr. Nguyen Thi Mai',
                role: 'Head of Infrastructure',
                company: 'Healthcare Provider',
                image: '👩‍⚕️',
                text: 'The zero-downtime migration Kha architected for our regulated healthcare workload was flawless. His attention to security and compliance details gave us complete confidence.',
                rating: 5
            },
            {
                name: 'David Park',
                role: 'Engineering Manager',
                company: 'E-commerce Platform',
                image: '👨‍🔧',
                text: 'Kha\'s DevSecOps practices transformed our deployment pipeline. We went from monthly releases to daily deployments with increased reliability. Game-changer for our team.',
                rating: 5
            },
            {
                name: 'Lisa Thompson',
                role: 'Product Director',
                company: 'SaaS Company',
                image: '👩‍💼',
                text: 'Beyond technical skills, Kha excels at communication. He explained complex cloud concepts to our non-technical stakeholders, ensuring everyone was aligned on our modernization journey.',
                rating: 5
            },
            {
                name: 'Tran Van Duc',
                role: 'AWS Study Group Member',
                company: 'Cloud Engineer',
                image: '👨‍🎓',
                text: 'Kha\'s mentorship helped me transition from traditional IT to cloud engineering. His First Cloud Journey bootcamp and hands-on guidance were invaluable. Now I\'m working at a top tech company!',
                rating: 5
            }
        ];

        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.render();
        this.setupControls();
        this.startAutoPlay();
    }

    render() {
        this.container.innerHTML = `
            <div class="testimonials-slider">
                <div class="testimonials-track" id="testimonialsTrack">
                    ${this.testimonials.map((testimonial, index) => `
                        <div class="testimonial-card ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <div class="testimonial-header">
                                <div class="testimonial-avatar">${testimonial.image}</div>
                                <div class="testimonial-info">
                                    <h4 class="testimonial-name">${testimonial.name}</h4>
                                    <p class="testimonial-role">${testimonial.role}</p>
                                    <p class="testimonial-company">${testimonial.company}</p>
                                </div>
                            </div>
                            <div class="testimonial-rating">
                                ${'⭐'.repeat(testimonial.rating)}
                            </div>
                            <p class="testimonial-text">"${testimonial.text}"</p>
                        </div>
                    `).join('')}
                </div>
                <div class="testimonials-controls">
                    <button class="testimonial-btn testimonial-prev" id="testimonialPrev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="testimonials-dots" id="testimonialsDots">
                        ${this.testimonials.map((_, index) => `
                            <button class="testimonial-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                        `).join('')}
                    </div>
                    <button class="testimonial-btn testimonial-next" id="testimonialNext">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    setupControls() {
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        const dots = document.querySelectorAll('.testimonial-dot');

        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.goTo(index);
            });
        });

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support
        this.setupSwipe();
    }

    setupSwipe() {
        let startX = 0;
        let endX = 0;
        const track = document.getElementById('testimonialsTrack');

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        track.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', () => {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.updateSlider();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.updateSlider();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    updateSlider() {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dot');

        cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Animate transition
        const track = document.getElementById('testimonialsTrack');
        track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ===================================
// Project Filter with Animation
// ===================================
class ProjectFilter {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.projects = Array.from(document.querySelectorAll('.project-card'));
        this.filterButtons = document.querySelectorAll('[data-filter]');

        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveButton(e.target);
            });
        });
    }

    filterProjects(filter) {
        this.projects.forEach((project, index) => {
            const categories = project.getAttribute('data-categories')?.split(',') || [];
            const shouldShow = filter === 'all' || categories.includes(filter);

            if (shouldShow) {
                setTimeout(() => {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 10);
                }, index * 50);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// ===================================
// Stats Counter with Animation
// ===================================
class AnimatedCounter {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.hasAnimated = false;

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animate();
                    this.hasAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }

    animate() {
        const start = 0;
        const increment = this.target / (this.duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= this.target) {
                this.element.textContent = this.target;
                clearInterval(timer);
            } else {
                this.element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ===================================
// Timeline Scroll Animation
// ===================================
class TimelineAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.items = this.container.querySelectorAll('.timeline-item');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-visible');
                }
            });
        }, { threshold: 0.3 });

        this.items.forEach(item => {
            observer.observe(item);
        });
    }
}

// ===================================
// Initialize All Interactive Elements
// ===================================
function initInteractiveElements() {
    // Skills Chart
    if (document.getElementById('skillsChart')) {
        new SkillsChart('skillsChart');
    }

    // Testimonials Slider
    if (document.getElementById('testimonialsSlider')) {
        new TestimonialsSlider('testimonialsSlider');
    }

    // Project Filter
    if (document.getElementById('projectsGrid')) {
        new ProjectFilter('projectsGrid');
    }

    // Animated Counters
    document.querySelectorAll('[data-count-target]').forEach(element => {
        const target = parseInt(element.getAttribute('data-count-target'));
        new AnimatedCounter(element, target);
    });

    // Timeline Animation
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        new TimelineAnimation(timeline.id || 'timeline');
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveElements);
} else {
    initInteractiveElements();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SkillsChart,
        TestimonialsSlider,
        ProjectFilter,
        AnimatedCounter,
        TimelineAnimation
    };
}
