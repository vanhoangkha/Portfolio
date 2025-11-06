-- Seed data for portfolio database

-- Insert admin user (password: admin123 - hashed with bcrypt)
INSERT INTO users (email, password_hash, name, role) VALUES
('khavan.work@gmail.com', '$2a$10$CwTycUXWue0Thq9StjUM0u7fTh6SnRs8hQJHOFAm.dEq5lFqvlHpS', 'Kha Van Hoang', 'admin');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, author_id, status, published_at) VALUES
('Building Multi-Cloud Architectures: Lessons from the Field', 'building-multi-cloud-architectures',
 'Exploring best practices and real-world challenges when designing solutions that span AWS, Azure, and GCP.',
 'Full content here...', 'Cloud Architecture', ARRAY['Multi-Cloud', 'Architecture', 'Best Practices'],
 (SELECT id FROM users WHERE email = 'khavan.work@gmail.com'), 'published', NOW()),

('Implementing RAG Systems with AWS Bedrock', 'implementing-rag-systems-aws-bedrock',
 'A comprehensive guide to building production-ready Retrieval-Augmented Generation systems.',
 'Full content here...', 'AI & ML', ARRAY['GenAI', 'RAG', 'AWS Bedrock'],
 (SELECT id FROM users WHERE email = 'khavan.work@gmail.com'), 'published', NOW());

-- Insert sample projects
INSERT INTO projects (title, slug, description, short_description, technologies, github_url, live_url, featured, display_order) VALUES
('CloudThinker', 'cloudthinker',
 'Multi-cloud agentic AI platform for cloud operations automation. Increased operational efficiency by 35-40% across AWS/Azure/GCP.',
 'Multi-cloud agentic AI platform',
 ARRAY['AI Agents', 'Multi-Cloud', 'Automation'],
 'https://github.com/strands-agents',
 'https://www.cloudthinker.io',
 true, 1),

('AWS First GenAI Journey', 'aws-first-genai-journey',
 'Bedrock framework with 350+ stars. Published 20+ reference implementations for RAG, chatbots, and knowledge systems.',
 'AWS Bedrock framework',
 ARRAY['AWS Bedrock', 'GenAI', 'RAG'],
 'https://github.com/aws-samples/AWS-First-GenAI-Journey',
 NULL,
 true, 2);
