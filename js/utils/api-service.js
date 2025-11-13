// API Service for Portfolio Data
const API_BASE_URL = 'http://localhost:5000/api/v1';

const FALLBACK_DATA = {
  '/portfolio/skills': [
    { id: 1, category: 'technical', subcategory: 'Cloud Platforms', name: 'Amazon Web Services (AWS)', proficiency: 'expert', icon: 'fab fa-aws', years_experience: 5 },
    { id: 2, category: 'technical', subcategory: 'Cloud Platforms', name: 'Microsoft Azure', proficiency: 'intermediate', icon: 'fab fa-microsoft', years_experience: 3 },
    { id: 3, category: 'technical', subcategory: 'Cloud Platforms', name: 'Google Cloud Platform', proficiency: 'intermediate', icon: 'fab fa-google', years_experience: 3 },
    { id: 4, category: 'technical', subcategory: 'Infrastructure as Code', name: 'Terraform', proficiency: 'expert', icon: 'fas fa-code', years_experience: 5 },
    { id: 5, category: 'technical', subcategory: 'Infrastructure as Code', name: 'AWS CDK', proficiency: 'expert', icon: 'fas fa-cubes', years_experience: 4 },
    { id: 6, category: 'technical', subcategory: 'AI & Machine Learning', name: 'Amazon Bedrock', proficiency: 'expert', icon: 'fas fa-brain', years_experience: 2 },
    { id: 7, category: 'technical', subcategory: 'AI & Machine Learning', name: 'Amazon SageMaker', proficiency: 'intermediate', icon: 'fas fa-robot', years_experience: 3 },
    { id: 8, category: 'technical', subcategory: 'Security & Governance', name: 'Zero Trust Architecture', proficiency: 'expert', icon: 'fas fa-shield-alt', years_experience: 4 },
    { id: 9, category: 'technical', subcategory: 'Security & Governance', name: 'AWS Control Tower', proficiency: 'expert', icon: 'fas fa-university', years_experience: 4 },
    { id: 10, category: 'technical', subcategory: 'Programming & Automation', name: 'Python', proficiency: 'expert', icon: 'fab fa-python', years_experience: 6 },
    { id: 11, category: 'technical', subcategory: 'Programming & Automation', name: 'TypeScript / JavaScript', proficiency: 'intermediate', icon: 'fab fa-js', years_experience: 5 },
    { id: 12, category: 'technical', subcategory: 'DevOps & Observability', name: 'CI/CD (GitHub Actions, CodePipeline)', proficiency: 'expert', icon: 'fas fa-sync-alt', years_experience: 5 },
    { id: 13, category: 'technical', subcategory: 'DevOps & Observability', name: 'Observability (CloudWatch, Grafana, OpenTelemetry)', proficiency: 'expert', icon: 'fas fa-chart-line', years_experience: 4 },
    { id: 14, category: 'soft', subcategory: 'Leadership', name: 'Technical Mentoring & Enablement', proficiency: 'expert', icon: 'fas fa-users', years_experience: 7 },
    { id: 15, category: 'soft', subcategory: 'Leadership', name: 'Executive Stakeholder Management', proficiency: 'expert', icon: 'fas fa-handshake', years_experience: 5 },
    { id: 16, category: 'soft', subcategory: 'Communication', name: 'Public Speaking & Workshops', proficiency: 'expert', icon: 'fas fa-microphone', years_experience: 6 },
    { id: 17, category: 'soft', subcategory: 'Strategy', name: 'Cloud Transformation Strategy', proficiency: 'expert', icon: 'fas fa-compass', years_experience: 6 }
  ],
  '/portfolio/certifications': [
    { id: 1, category: 'Amazon Web Services', name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', issue_date: '2024-03-01', credential_id: 'AWS-CSA-PRO-2024', credential_url: '' },
    { id: 2, category: 'Amazon Web Services', name: 'AWS Certified DevOps Engineer – Professional', issuer: 'Amazon Web Services', issue_date: '2023-11-01', credential_id: 'AWS-DOP-PRO-2023', credential_url: '' },
    { id: 3, category: 'Amazon Web Services', name: 'AWS Certified Security – Specialty', issuer: 'Amazon Web Services', issue_date: '2023-05-01', credential_id: 'AWS-SEC-SPC-2023', credential_url: '' },
    { id: 4, category: 'Amazon Web Services', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', issue_date: '2022-09-01', credential_id: 'AWS-CSA-ASSOC-2022', credential_url: '' },
    { id: 5, category: 'Amazon Web Services', name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services', issue_date: '2024-08-01', credential_id: 'AWS-AI-2024', credential_url: '' }
  ],
  '/portfolio/testimonials': [
    { id: 1, author_name: 'Nguyen Gia Hung', author_role: 'Head of Solutions Architecture', author_company: 'AWS Vietnam', relationship: 'Leadership', rating: 5, content: 'Kha consistently delivers transformative cloud solutions and leads by example. His technical depth across AWS, AI/ML, and security is exceptional.', date: '2025-01-10' },
    { id: 2, author_name: 'Tran Minh Quan', author_role: 'CTO', author_company: 'Renova Cloud', relationship: 'Executive Stakeholder', rating: 5, content: 'Kha architected a zero-downtime banking migration and established the foundation for our DevSecOps transformation.', date: '2024-09-21' },
    { id: 3, author_name: 'Le Thu Trang', author_role: 'Lead Cloud Engineer', author_company: 'Cloud Journey Platform', relationship: 'Mentored Engineer', rating: 5, content: 'Thanks to Kha’s mentorship, I transitioned into a senior cloud role and mastered AWS automation best practices.', date: '2024-12-05' }
  ],
  '/portfolio/community-activities': [
    { id: 1, type: 'workshop', title: 'Vietnam Cloud Journey Bootcamp', description: 'Designed and delivered a multi-week AWS bootcamp enabling 8,000+ learners to obtain cloud certifications.', organization: 'AWS Study Group', date: '2024-07-01', participants_count: 8000, impact_metrics: { graduates: '1,200+', certifications: '650+' } },
    { id: 2, type: 'meetup', title: 'AWS Community Day ASEAN Speaker', description: 'Spoke about applying Generative AI to regulated industries and shared reference architectures.', organization: 'AWS Community', date: '2024-05-15', participants_count: 700, impact_metrics: { countries: '6', sessions: '4' } },
    { id: 3, type: 'mentoring', title: 'Cloud Mentorship Program', description: 'Mentored engineers transitioning into cloud, DevOps, and AI/ML roles with hands-on guidance.', organization: 'Cloud Journey Platform', date: '2023-11-10', participants_count: 150, impact_metrics: { job_offers: '80+', learning_paths: '12' } },
    { id: 4, type: 'open-source', title: 'AWS First GenAI Journey Contributor', description: 'Led architecture design for official AWS Generative AI reference journey adopted region-wide.', organization: 'AWS Samples', date: '2024-01-30', participants_count: 3000, impact_metrics: { github_stars: '1,000+', forks: '3,000+' } }
  ],
  '/portfolio/tech-stack': [
    { id: 1, category: 'cloud', name: 'Amazon Web Services', proficiency: 95, is_primary: true },
    { id: 2, category: 'cloud', name: 'Microsoft Azure', proficiency: 75, is_primary: false },
    { id: 3, category: 'cloud', name: 'Google Cloud Platform', proficiency: 70, is_primary: false },
    { id: 4, category: 'language', name: 'Python', proficiency: 90, is_primary: true },
    { id: 5, category: 'language', name: 'TypeScript', proficiency: 75, is_primary: false },
    { id: 6, category: 'framework', name: 'Terraform', proficiency: 90, is_primary: true },
    { id: 7, category: 'framework', name: 'AWS CDK', proficiency: 88, is_primary: true },
    { id: 8, category: 'tool', name: 'GitHub Actions', proficiency: 85, is_primary: true },
    { id: 9, category: 'tool', name: 'AWS CodePipeline', proficiency: 82, is_primary: true },
    { id: 10, category: 'database', name: 'Amazon DynamoDB', proficiency: 80, is_primary: true }
  ],
  '/portfolio/achievements': [
    { id: 1, category: 'award', title: 'AWS Asia-Pacific and Japan Community Leader', description: 'Recognized for building and scaling Vietnam’s largest AWS learning ecosystem.', issuer: 'Amazon Web Services', date: '2024-08-01' },
    { id: 2, category: 'award', title: 'AWS ASEAN Builder Award – Cloud Automation', description: 'Awarded for architecting multi-cloud automation frameworks that reduced delivery timelines by 30%.', issuer: 'Amazon Web Services', date: '2024-11-15' },
    { id: 3, category: 'recognition', title: 'AWS Community Builder – AI/ML Track', description: 'Selected for four consecutive years for leadership in AI/ML enablement and open-source contributions.', issuer: 'Amazon Web Services', date: '2021-06-01' }
  ],
  '/projects': [
    { id: 1, title: 'CloudThinker - Intelligent Cloud Operations', description: 'Multi-cloud agentic platform using Amazon Bedrock to autonomously remediate incidents and enforce compliance.', category: 'AI Operations', technologies: ['AWS', 'Bedrock', 'Multi-cloud'], featured: true, liveUrl: 'https://www.cloudthinker.io', githubUrl: 'https://github.com/strands-agents' },
    { id: 2, title: 'Chubb AWS Enterprise Migration', description: 'Led migration of 100+ banking workloads to AWS with zero downtime and 20% cost reduction.', category: 'Enterprise Migration', technologies: ['AWS', 'Terraform', 'Control Tower'], featured: true, githubUrl: '', liveUrl: '' },
    { id: 3, title: 'Financial Services Intelligence Automation', description: 'AI-driven KYC/AML automation platform leveraging Amazon Bedrock and Retrieval Augmented Generation.', category: 'Financial Services', technologies: ['AWS', 'Bedrock', 'RAG'], featured: true, githubUrl: 'https://github.com/vanhoangkha/Financial-Services-Intelligence-Automation', liveUrl: '' },
    { id: 4, title: 'Cloud Journey Platform', description: 'Multi-tenant AWS learning ecosystem serving 50,000+ learners with governance blueprints and hands-on labs.', category: 'Education', technologies: ['AWS', 'Serverless', 'Governance'], featured: false, liveUrl: 'https://cloudjourney.awsstudygroup.com', githubUrl: '' }
  ]
};

const getFallbackData = (endpoint) => {
  const key = endpoint.split('?')[0];
  const data = FALLBACK_DATA[endpoint] || FALLBACK_DATA[key];
  return data ? JSON.parse(JSON.stringify(data)) : null;
};

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
      if (data && data.data) {
        return data.data;
      }
      const fallback = getFallbackData(endpoint);
      if (fallback) {
        console.warn(`Using fallback data for ${endpoint}`);
        return fallback;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      const fallback = getFallbackData(endpoint);
      if (fallback) {
        console.warn(`Using fallback data for ${endpoint}`);
        return fallback;
      }
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
