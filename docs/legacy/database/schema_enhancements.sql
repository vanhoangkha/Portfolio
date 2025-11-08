-- Enhanced Portfolio Database Schema
-- Additional tables for comprehensive portfolio features

-- Skills table with proficiency levels
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'technical' or 'soft'
    subcategory VARCHAR(100), -- e.g., 'Programming', 'Cloud', 'AI/ML', 'Leadership'
    proficiency VARCHAR(20) NOT NULL, -- 'basic', 'intermediate', 'expert'
    years_experience DECIMAL(3,1),
    display_order INTEGER DEFAULT 0,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(100) NOT NULL,
    credential_id VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    credential_url VARCHAR(500),
    badge_image VARCHAR(500),
    category VARCHAR(50), -- 'cloud', 'security', 'ai', 'devops'
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Awards and achievements
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- 'award', 'recognition', 'competition'
    issuer VARCHAR(100),
    date DATE,
    proof_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Community activities
CREATE TABLE IF NOT EXISTS community_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'workshop', 'meetup', 'mentoring', 'open-source'
    description TEXT,
    organization VARCHAR(100),
    date DATE,
    participants_count INTEGER,
    url VARCHAR(500),
    impact_metrics JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name VARCHAR(100) NOT NULL,
    author_role VARCHAR(100),
    author_company VARCHAR(100),
    author_image VARCHAR(500),
    content TEXT NOT NULL,
    rating INTEGER, -- 1-5
    relationship VARCHAR(50), -- 'colleague', 'client', 'manager', 'mentee'
    date DATE,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced project metrics
CREATE TABLE IF NOT EXISTS project_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL,
    metric_value VARCHAR(100) NOT NULL,
    metric_type VARCHAR(50), -- 'performance', 'cost', 'efficiency', 'scale'
    display_order INTEGER DEFAULT 0
);

-- Project deliverables
CREATE TABLE IF NOT EXISTS project_deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'diagram', 'spec', 'demo', 'iac', 'dashboard'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(500),
    file_path VARCHAR(500),
    thumbnail VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tech stack (for visualization)
CREATE TABLE IF NOT EXISTS tech_stack (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'cloud', 'language', 'framework', 'tool', 'database'
    logo_url VARCHAR(500),
    proficiency INTEGER, -- 1-100
    years_used DECIMAL(3,1),
    last_used DATE,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Work experience enhancements (STAR format)
CREATE TABLE IF NOT EXISTS experience_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    situation TEXT, -- STAR: Situation
    task TEXT, -- STAR: Task
    action TEXT, -- STAR: Action
    result TEXT, -- STAR: Result
    technologies TEXT[],
    team_size INTEGER,
    kpis JSONB,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_proficiency ON skills(proficiency);
CREATE INDEX idx_certifications_category ON certifications(category);
CREATE INDEX idx_certifications_expiry ON certifications(expiry_date);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_project_metrics_project ON project_metrics(project_id);
CREATE INDEX idx_project_deliverables_project ON project_deliverables(project_id);
CREATE INDEX idx_tech_stack_category ON tech_stack(category);
CREATE INDEX idx_community_activities_type ON community_activities(type);

-- Add triggers for updated_at
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
