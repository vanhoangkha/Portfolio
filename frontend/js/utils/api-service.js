// API Service for Portfolio Data
const API_BASE_URL = 'http://localhost:5000/api/v1';

class PortfolioAPI {
    constructor(baseUrl = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async fetchJSON(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return null;
        }
    }

    // Skills
    async getSkills(category = null) {
        const query = category ? `?category=${category}` : '';
        return this.fetchJSON(`/portfolio/skills${query}`);
    }

    // Certifications
    async getCertifications() {
        return this.fetchJSON('/portfolio/certifications');
    }

    // Achievements
    async getAchievements() {
        return this.fetchJSON('/portfolio/achievements');
    }

    // Community Activities
    async getCommunityActivities() {
        return this.fetchJSON('/portfolio/community-activities');
    }

    // Testimonials
    async getTestimonials(featured = true) {
        const query = featured ? '?featured=true' : '';
        return this.fetchJSON(`/portfolio/testimonials${query}`);
    }

    // Tech Stack
    async getTechStack() {
        return this.fetchJSON('/portfolio/tech-stack');
    }

    // Experience Details
    async getExperienceDetails() {
        return this.fetchJSON('/portfolio/experience-details');
    }

    // Projects
    async getProjects() {
        return this.fetchJSON('/projects');
    }

    // Blog Posts
    async getBlogPosts() {
        return this.fetchJSON('/blog');
    }

    // Complete Portfolio
    async getCompletePortfolio() {
        return this.fetchJSON('/portfolio/complete');
    }
}

// Create global API instance
const portfolioAPI = new PortfolioAPI();
