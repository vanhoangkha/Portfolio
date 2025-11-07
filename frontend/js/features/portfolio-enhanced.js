// Enhanced Portfolio Renderer
class PortfolioRenderer {
    constructor() {
        this.api = portfolioAPI;
    }

    // Render Skills with Proficiency Levels
    renderSkills(skills) {
        if (!skills) return;

        const technicalSkills = skills.filter(s => s.category === 'technical');
        const softSkills = skills.filter(s => s.category === 'soft');

        // Group technical skills by subcategory
        const grouped = {};
        technicalSkills.forEach(skill => {
            const cat = skill.subcategory || 'Other';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(skill);
        });

        const skillsContainer = document.getElementById('skills-matrix');
        if (!skillsContainer) return;

        let html = '<div class="skills-categories">';

        // Technical Skills by Category
        Object.keys(grouped).sort().forEach(category => {
            html += `
                <div class="skill-category" data-aos="fade-up">
                    <h3 class="skill-category-title">
                        <i class="fas fa-code"></i> ${category}
                    </h3>
                    <div class="skills-grid">
            `;

            grouped[category].forEach(skill => {
                const proficiencyLevel = this.getProficiencyPercentage(skill.proficiency);
                const proficiencyColor = this.getProficiencyColor(skill.proficiency);

                html += `
                    <div class="skill-item" data-proficiency="${skill.proficiency}">
                        <div class="skill-header">
                            <i class="${skill.icon || 'fas fa-circle'}"></i>
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-badge ${skill.proficiency}">${skill.proficiency.toUpperCase()}</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: ${proficiencyLevel}%; background: ${proficiencyColor}">
                                <span class="skill-percentage">${proficiencyLevel}%</span>
                            </div>
                        </div>
                        ${skill.years_experience ? `<div class="skill-years">${skill.years_experience} years</div>` : ''}
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        // Soft Skills
        if (softSkills.length > 0) {
            html += `
                <div class="skill-category" data-aos="fade-up">
                    <h3 class="skill-category-title">
                        <i class="fas fa-users"></i> Soft Skills & Leadership
                    </h3>
                    <div class="skills-grid soft-skills">
            `;

            softSkills.forEach(skill => {
                const proficiencyLevel = this.getProficiencyPercentage(skill.proficiency);
                const proficiencyColor = this.getProficiencyColor(skill.proficiency);

                html += `
                    <div class="skill-item soft" data-proficiency="${skill.proficiency}">
                        <div class="skill-header">
                            <i class="${skill.icon || 'fas fa-star'}"></i>
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-badge ${skill.proficiency}">${skill.proficiency.toUpperCase()}</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: ${proficiencyLevel}%; background: ${proficiencyColor}"></div>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        }

        html += '</div>';
        skillsContainer.innerHTML = html;
    }

    getProficiencyPercentage(proficiency) {
        const levels = { basic: 40, intermediate: 70, expert: 95 };
        return levels[proficiency.toLowerCase()] || 50;
    }

    getProficiencyColor(proficiency) {
        const colors = {
            basic: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            intermediate: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            expert: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        };
        return colors[proficiency.toLowerCase()] || colors.intermediate;
    }

    // Render Certifications
    renderCertifications(certifications) {
        if (!certifications) return;

        const container = document.getElementById('certifications-grid');
        if (!container) return;

        let html = '';
        certifications.forEach((cert, index) => {
            const delay = index * 100;
            html += `
                <div class="certification-card" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="cert-header">
                        <div class="cert-icon">
                            <i class="fas fa-certificate"></i>
                        </div>
                        <span class="cert-category">${cert.category}</span>
                    </div>
                    <h3 class="cert-name">${cert.name}</h3>
                    <p class="cert-issuer">
                        <i class="fas fa-building"></i> ${cert.issuer}
                    </p>
                    ${cert.issue_date ? `
                        <p class="cert-date">
                            <i class="fas fa-calendar"></i>
                            ${new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                    ` : ''}
                    ${cert.credential_id ? `
                        <p class="cert-credential">
                            <i class="fas fa-id-card"></i> ${cert.credential_id}
                        </p>
                    ` : ''}
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Render Testimonials
    renderTestimonials(testimonials) {
        if (!testimonials) return;

        const container = document.getElementById('testimonials-slider');
        if (!container) return;

        let html = '<div class="testimonials-wrapper">';

        testimonials.forEach((testimonial, index) => {
            const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
            html += `
                <div class="testimonial-card ${index === 0 ? 'active' : ''}" data-aos="fade-up">
                    <div class="testimonial-quote">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <p class="testimonial-content">${testimonial.content}</p>
                    <div class="testimonial-rating">${stars}</div>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <h4 class="author-name">${testimonial.author_name}</h4>
                            <p class="author-role">${testimonial.author_role}</p>
                            <p class="author-company">
                                <i class="fas fa-building"></i> ${testimonial.author_company}
                            </p>
                        </div>
                    </div>
                    <div class="testimonial-meta">
                        <span class="testimonial-relationship">${testimonial.relationship}</span>
                        <span class="testimonial-date">${new Date(testimonial.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // Add navigation if more than one testimonial
        if (testimonials.length > 1) {
            html += `
                <div class="testimonials-nav">
                    <button class="testimonial-nav-btn prev" onclick="portfolioRenderer.prevTestimonial()">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="testimonial-dots">
                        ${testimonials.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="portfolioRenderer.goToTestimonial(${i})"></span>`).join('')}
                    </div>
                    <button class="testimonial-nav-btn next" onclick="portfolioRenderer.nextTestimonial()">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            `;
        }

        container.innerHTML = html;
        this.currentTestimonial = 0;
        this.totalTestimonials = testimonials.length;
    }

    // Testimonial navigation
    nextTestimonial() {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.totalTestimonials;
        this.updateTestimonialDisplay();
    }

    prevTestimonial() {
        this.currentTestimonial = (this.currentTestimonial - 1 + this.totalTestimonials) % this.totalTestimonials;
        this.updateTestimonialDisplay();
    }

    goToTestimonial(index) {
        this.currentTestimonial = index;
        this.updateTestimonialDisplay();
    }

    updateTestimonialDisplay() {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');

        cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentTestimonial);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentTestimonial);
        });
    }

    // Render Community Activities
    renderCommunityActivities(activities) {
        if (!activities) return;

        const container = document.getElementById('community-timeline');
        if (!container) return;

        let html = '<div class="community-timeline">';

        activities.forEach((activity, index) => {
            const delay = index * 100;
            const iconMap = {
                workshop: 'fa-chalkboard-teacher',
                meetup: 'fa-users',
                mentoring: 'fa-graduation-cap',
                'open-source': 'fa-code-branch'
            };

            html += `
                <div class="community-item" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="community-icon">
                        <i class="fas ${iconMap[activity.type] || 'fa-star'}"></i>
                    </div>
                    <div class="community-content">
                        <span class="community-type">${activity.type.replace('-', ' ').toUpperCase()}</span>
                        <h3 class="community-title">${activity.title}</h3>
                        <p class="community-description">${activity.description}</p>
                        <div class="community-meta">
                            ${activity.organization ? `<span><i class="fas fa-building"></i> ${activity.organization}</span>` : ''}
                            ${activity.date ? `<span><i class="fas fa-calendar"></i> ${new Date(activity.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>` : ''}
                            ${activity.participants_count ? `<span><i class="fas fa-users"></i> ${activity.participants_count}+ participants</span>` : ''}
                        </div>
                        ${activity.impact_metrics ? `
                            <div class="community-metrics">
                                ${Object.entries(activity.impact_metrics).map(([key, value]) =>
                                    `<span class="metric"><strong>${key.replace('_', ' ')}:</strong> ${value}</span>`
                                ).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // Render Tech Stack Visualization
    renderTechStack(techStack) {
        if (!techStack) return;

        const container = document.getElementById('tech-stack-viz');
        if (!container) return;

        // Group by category
        const grouped = {};
        techStack.forEach(tech => {
            if (!grouped[tech.category]) grouped[tech.category] = [];
            grouped[tech.category].push(tech);
        });

        let html = '<div class="tech-stack-grid">';

        const categoryIcons = {
            cloud: 'fa-cloud',
            language: 'fa-code',
            framework: 'fa-layer-group',
            tool: 'fa-wrench',
            database: 'fa-database'
        };

        Object.entries(grouped).forEach(([category, items]) => {
            html += `
                <div class="tech-category" data-aos="fade-up">
                    <h3 class="tech-category-title">
                        <i class="fas ${categoryIcons[category] || 'fa-cube'}"></i>
                        ${category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <div class="tech-items">
            `;

            items.forEach(tech => {
                const isPrimary = tech.is_primary ? 'primary' : '';
                html += `
                    <div class="tech-item ${isPrimary}" title="${tech.name} - ${tech.proficiency}% proficiency">
                        <div class="tech-icon">${tech.name.substring(0, 2).toUpperCase()}</div>
                        <span class="tech-name">${tech.name}</span>
                        <div class="tech-proficiency">
                            <div class="tech-bar" style="width: ${tech.proficiency}%"></div>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // Render Achievements
    renderAchievements(achievements) {
        if (!achievements) return;

        const container = document.getElementById('achievements-grid');
        if (!container) return;

        let html = '';
        achievements.forEach((achievement, index) => {
            const delay = index * 100;
            const categoryIcons = {
                award: 'fa-trophy',
                recognition: 'fa-award',
                competition: 'fa-medal'
            };

            html += `
                <div class="achievement-card" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="achievement-icon">
                        <i class="fas ${categoryIcons[achievement.category] || 'fa-star'}"></i>
                    </div>
                    <h3 class="achievement-title">${achievement.title}</h3>
                    <p class="achievement-description">${achievement.description}</p>
                    <div class="achievement-meta">
                        <span class="achievement-issuer">
                            <i class="fas fa-building"></i> ${achievement.issuer}
                        </span>
                        ${achievement.date ? `
                            <span class="achievement-date">
                                <i class="fas fa-calendar"></i> ${new Date(achievement.date).getFullYear()}
                            </span>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Initialize all sections with loading states
    async initializePortfolio() {
        try {
            console.log('Loading portfolio data...');
            portfolioUtils.performance.startTimer('portfolioLoad');

            // Show loading states
            const sections = [
                'skills-matrix',
                'certifications-grid',
                'testimonials-slider',
                'community-timeline',
                'tech-stack-viz',
                'achievements-grid'
            ];

            sections.forEach(id => {
                portfolioUtils.loading.showLoading(id, 'Loading data...');
            });

            const startTime = performance.now();

            const [skills, certifications, testimonials, activities, techStack, achievements] = await Promise.all([
                this.api.getSkills(),
                this.api.getCertifications(),
                this.api.getTestimonials(true),
                this.api.getCommunityActivities(),
                this.api.getTechStack(),
                this.api.getAchievements()
            ]);

            const apiTime = performance.now() - startTime;
            portfolioUtils.performance.logAPICall('complete-portfolio', apiTime, true);

            // Hide loading and render
            portfolioUtils.loading.hideLoading('skills-matrix');
            this.renderSkills(skills);
            portfolioUtils.search.setData('skills', skills);

            portfolioUtils.loading.hideLoading('certifications-grid');
            this.renderCertifications(certifications);
            portfolioUtils.search.setData('certifications', certifications);

            portfolioUtils.loading.hideLoading('testimonials-slider');
            this.renderTestimonials(testimonials);

            portfolioUtils.loading.hideLoading('community-timeline');
            this.renderCommunityActivities(activities);

            portfolioUtils.loading.hideLoading('tech-stack-viz');
            this.renderTechStack(techStack);

            portfolioUtils.loading.hideLoading('achievements-grid');
            this.renderAchievements(achievements);

            portfolioUtils.performance.endTimer('portfolioLoad');
            console.log('✅ Portfolio loaded successfully!');

            // Cache data for offline access
            portfolioUtils.storage.set('portfolio_data', {
                skills,
                certifications,
                testimonials,
                activities,
                techStack,
                achievements,
                timestamp: new Date()
            });

        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);

            // Show error states
            const sections = [
                'skills-matrix',
                'certifications-grid',
                'testimonials-slider',
                'community-timeline',
                'tech-stack-viz',
                'achievements-grid'
            ];

            sections.forEach(id => {
                portfolioUtils.loading.hideLoading(id);
                portfolioUtils.error.showError(
                    id,
                    'Failed to load data. Please check your connection.',
                    () => this.initializePortfolio()
                );
            });

            portfolioUtils.performance.logAPICall('complete-portfolio', 0, false);

            // Try to load cached data
            const cachedData = portfolioUtils.storage.get('portfolio_data');
            if (cachedData) {
                console.log('📦 Loading from cache...');
                this.renderSkills(cachedData.skills);
                this.renderCertifications(cachedData.certifications);
                this.renderTestimonials(cachedData.testimonials);
                this.renderCommunityActivities(cachedData.activities);
                this.renderTechStack(cachedData.techStack);
                this.renderAchievements(cachedData.achievements);
            }
        }
    }
}

// Create global renderer instance
const portfolioRenderer = new PortfolioRenderer();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    portfolioRenderer.initializePortfolio();
});
