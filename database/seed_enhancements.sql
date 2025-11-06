-- Seed data for enhanced portfolio sections

-- Skills (Technical)
INSERT INTO skills (name, category, subcategory, proficiency, years_experience, icon, display_order) VALUES
('Python', 'technical', 'Programming', 'expert', 5.0, 'fab fa-python', 1),
('Go', 'technical', 'Programming', 'intermediate', 2.0, 'fas fa-code', 2),
('TypeScript', 'technical', 'Programming', 'expert', 4.0, 'fab fa-js', 3),
('AWS', 'technical', 'Cloud', 'expert', 5.0, 'fab fa-aws', 4),
('Azure', 'technical', 'Cloud', 'intermediate', 2.0, 'fab fa-microsoft', 5),
('GCP', 'technical', 'Cloud', 'intermediate', 2.0, 'fab fa-google', 6),
('Terraform', 'technical', 'IaC', 'expert', 4.0, 'fas fa-layer-group', 7),
('AWS CDK', 'technical', 'IaC', 'expert', 3.0, 'fab fa-aws', 8),
('Docker', 'technical', 'DevOps', 'expert', 5.0, 'fab fa-docker', 9),
('Kubernetes', 'technical', 'DevOps', 'expert', 4.0, 'fas fa-dharmachakra', 10),
('LangChain', 'technical', 'AI/ML', 'expert', 2.0, 'fas fa-robot', 11),
('PyTorch', 'technical', 'AI/ML', 'intermediate', 1.5, 'fas fa-brain', 12),
('AWS Bedrock', 'technical', 'AI/ML', 'expert', 1.5, 'fab fa-aws', 13),
('PostgreSQL', 'technical', 'Database', 'expert', 5.0, 'fas fa-database', 14),
('DynamoDB', 'technical', 'Database', 'expert', 4.0, 'fab fa-aws', 15),
('MySQL', 'technical', 'Database', 'intermediate', 3.0, 'fas fa-database', 16);

-- Skills (Soft)
INSERT INTO skills (name, category, subcategory, proficiency, icon, display_order) VALUES
('Leadership', 'soft', 'Management', 'expert', 'fas fa-users', 17),
('Sprint Planning', 'soft', 'Agile', 'expert', 'fas fa-calendar-alt', 18),
('Stakeholder Management', 'soft', 'Communication', 'expert', 'fas fa-handshake', 19),
('Technical Writing', 'soft', 'Documentation', 'expert', 'fas fa-file-alt', 20),
('Public Speaking', 'soft', 'Presentation', 'expert', 'fas fa-microphone', 21),
('Mentoring', 'soft', 'Leadership', 'expert', 'fas fa-chalkboard-teacher', 22);

-- Certifications
INSERT INTO certifications (name, issuer, credential_id, issue_date, category, display_order) VALUES
('AWS Certified Solutions Architect - Professional', 'AWS', 'AWS-PSA-123456', '2023-01-15', 'cloud', 1),
('AWS Certified DevOps Engineer - Professional', 'AWS', 'AWS-PDO-789012', '2023-06-20', 'cloud', 2),
('AWS Certified Security - Specialty', 'AWS', 'AWS-SEC-345678', '2022-03-10', 'security', 3),
('HashiCorp Certified: Terraform Associate', 'HashiCorp', 'HCP-TF-901234', '2022-11-05', 'devops', 4),
('Certified Kubernetes Administrator (CKA)', 'CNCF', 'CKA-567890', '2021-09-15', 'devops', 5);

-- Achievements
INSERT INTO achievements (title, description, category, issuer, date) VALUES
('AWS Community Builder', 'Selected as AWS Community Builder in Cloud Operations category for contributions to the community', 'recognition', 'AWS', '2023-01-01'),
('AWS APN Ambassador', 'Recognized as AWS APN Ambassador for driving cloud adoption across APAC region', 'recognition', 'AWS', '2024-01-01'),
('Top Contributor', 'Top contributor to AWS Samples repository with 350+ stars on GenAI framework', 'recognition', 'GitHub', '2024-06-01'),
('Hackathon Winner', 'First place in AWS Innovation Challenge for multi-cloud automation solution', 'award', 'AWS', '2023-09-15');

-- Community Activities
INSERT INTO community_activities (title, type, description, organization, date, participants_count, impact_metrics) VALUES
('AWS Workshop: Building GenAI Applications', 'workshop', 'Hosted workshop on building production-ready GenAI applications using AWS Bedrock', 'AWS Vietnam', '2024-10-15', 150, '{"satisfaction": "95%", "projects_built": 45}'),
('Cloud Architecture Meetup Speaker', 'meetup', 'Presented multi-cloud architecture patterns and best practices', 'Vietnam Cloud Community', '2024-09-20', 200, '{"engagement": "high", "questions": 35}'),
('Open Source Contributor', 'open-source', 'Active contributor to AWS CDK and AWS Samples repositories', 'GitHub', '2024-01-01', NULL, '{"repos": 15, "stars": 450, "contributions": 120}'),
('AWS Community Day Organizer', 'workshop', 'Co-organized AWS Community Day Vietnam with 500+ attendees', 'AWS Community', '2023-11-10', 500, '{"tracks": 4, "speakers": 20, "sponsors": 10}'),
('Mentorship Program', 'mentoring', 'Mentored 25+ junior cloud engineers in cloud architecture and AI/ML', 'Personal Initiative', '2024-01-01', 25, '{"success_rate": "90%", "job_placements": 20}');

-- Testimonials
INSERT INTO testimonials (author_name, author_role, author_company, content, rating, relationship, date, featured, display_order) VALUES
('John Smith', 'CTO', 'FinTech Corp', 'Kha delivered exceptional cloud architecture solutions that reduced our infrastructure costs by 40% while improving performance. His expertise in multi-cloud environments is outstanding.', 5, 'client', '2024-09-01', true, 1),
('Sarah Johnson', 'Engineering Manager', 'AWS', 'Working with Kha has been fantastic. His contributions to the GenAI community and ability to explain complex concepts clearly make him an invaluable team member.', 5, 'colleague', '2024-08-15', true, 2),
('Michael Chen', 'DevOps Lead', 'Enterprise Inc', 'Kha''s knowledge of IaC and DevOps practices helped us modernize our entire deployment pipeline. The training he provided was world-class.', 5, 'client', '2024-07-20', true, 3),
('Emily Rodriguez', 'Product Manager', 'Strands', 'Kha''s technical leadership on the CloudThinker platform was instrumental in our success. He balanced technical excellence with business objectives perfectly.', 5, 'colleague', '2024-06-10', true, 4);

-- Tech Stack
INSERT INTO tech_stack (name, category, proficiency, years_used, is_primary, display_order) VALUES
-- Cloud Platforms
('AWS', 'cloud', 95, 5.0, true, 1),
('Azure', 'cloud', 70, 2.0, false, 2),
('GCP', 'cloud', 65, 2.0, false, 3),
-- Languages
('Python', 'language', 95, 5.0, true, 4),
('Go', 'language', 75, 2.0, false, 5),
('TypeScript', 'language', 90, 4.0, true, 6),
('JavaScript', 'language', 90, 5.0, true, 7),
-- Frameworks & Tools
('LangChain', 'framework', 90, 1.5, true, 8),
('FastAPI', 'framework', 85, 3.0, true, 9),
('React', 'framework', 80, 3.0, false, 10),
('Express.js', 'framework', 85, 4.0, true, 11),
-- IaC
('Terraform', 'tool', 95, 4.0, true, 12),
('AWS CDK', 'tool', 90, 3.0, true, 13),
('CloudFormation', 'tool', 85, 5.0, false, 14),
-- Containers & Orchestration
('Docker', 'tool', 95, 5.0, true, 15),
('Kubernetes', 'tool', 90, 4.0, true, 16),
('ECS/Fargate', 'tool', 95, 4.0, true, 17),
-- Databases
('PostgreSQL', 'database', 90, 5.0, true, 18),
('DynamoDB', 'database', 95, 4.0, true, 19),
('Redis', 'database', 85, 3.0, false, 20),
('MongoDB', 'database', 75, 2.0, false, 21),
-- CI/CD
('GitHub Actions', 'tool', 90, 3.0, true, 22),
('GitLab CI', 'tool', 80, 2.0, false, 23),
('Jenkins', 'tool', 75, 3.0, false, 24),
-- Monitoring & Observability
('CloudWatch', 'tool', 95, 5.0, true, 25),
('Prometheus', 'tool', 80, 2.0, false, 26),
('Grafana', 'tool', 80, 2.0, false, 27),
('Datadog', 'tool', 75, 1.5, false, 28);

-- Experience Details (STAR format)
INSERT INTO experience_details (company, position, start_date, end_date, situation, task, action, result, technologies, team_size, kpis) VALUES
('AWS',
 'Cloud Solutions Architect',
 '2022-01-01',
 NULL,
 'AWS Vietnam needed to accelerate GenAI adoption across APAC with limited resources and no standardized frameworks.',
 'Lead GenAI enablement initiatives and create scalable frameworks for enterprise customers transitioning to AI-powered applications.',
 'Designed and published AWS First GenAI Journey framework with 20+ reference implementations. Conducted workshops and POCs across multiple industries. Created multi-agent RAG patterns and cost optimization strategies.',
 'Enabled 45,000+ professionals across APAC. Framework achieved 350+ GitHub stars. Reduced customer time-to-production by 60%. Average cost savings of 40% through optimization patterns.',
 ARRAY['AWS Bedrock', 'LangChain', 'Python', 'Terraform', 'RAG', 'GenAI'],
 5,
 '{"professionals_enabled": 45000, "github_stars": 350, "time_to_production_reduction": "60%", "cost_savings": "40%"}'
),
('Strands',
 'Senior Cloud Architect / TPM',
 '2021-12-01',
 '2023-12-01',
 'Strands required a scalable multi-cloud platform for their AI agent marketplace to serve 10,000+ users with high availability and performance requirements.',
 'Architect and deliver CloudThinker platform - a production-grade multi-cloud AI operations system with enterprise SLAs.',
 'Designed microservices architecture with auto-scaling, implemented IaC with Terraform, established CI/CD pipelines, and integrated monitoring. Led cross-functional team and managed stakeholder expectations.',
 'Delivered platform handling 10,000+ active users with 35-40% operational efficiency improvements. Achieved 99.9% uptime SLA. Reduced infrastructure costs by 30% through optimization.',
 ARRAY['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Python', 'Go'],
 8,
 '{"active_users": 10000, "efficiency_improvement": "35-40%", "uptime": "99.9%", "cost_reduction": "30%"}'
),
('Renova Cloud',
 'Cloud Solutions Architect',
 '2020-01-01',
 '2021-12-01',
 'Enterprise BFSI clients needed zero-downtime cloud migrations with strict security and compliance requirements.',
 'Execute AWS MAP migrations for banking and financial services workloads while maintaining security and compliance.',
 'Designed migration strategies, implemented automated CI/CD pipelines with IaC, conducted Well-Architected Reviews, and established security best practices. Increased release velocity by 70%.',
 'Successfully migrated 15+ enterprise workloads with zero downtime. Improved system reliability by 30% and security posture by 30%. Reduced deployment time from weeks to hours.',
 ARRAY['AWS', 'Terraform', 'CI/CD', 'Security', 'Compliance'],
 6,
 '{"migrations_completed": 15, "zero_downtime": true, "reliability_improvement": "30%", "deployment_time_reduction": "90%"}'
);

-- Project Metrics for existing projects
INSERT INTO project_metrics (project_id, metric_name, metric_value, metric_type, display_order)
SELECT
    id,
    'Active Users',
    '10,000+',
    'scale',
    1
FROM projects WHERE slug = 'cloudthinker'
UNION ALL
SELECT
    id,
    'Efficiency Improvement',
    '35-40%',
    'performance',
    2
FROM projects WHERE slug = 'cloudthinker'
UNION ALL
SELECT
    id,
    'Uptime SLA',
    '99.9%',
    'performance',
    3
FROM projects WHERE slug = 'cloudthinker'
UNION ALL
SELECT
    id,
    'Cost Reduction',
    '30%',
    'cost',
    4
FROM projects WHERE slug = 'cloudthinker';

-- Project Deliverables
INSERT INTO project_deliverables (project_id, type, title, description, display_order)
SELECT
    id,
    'diagram',
    'Multi-Cloud Architecture Diagram',
    'Comprehensive architecture showing AWS/Azure/GCP integration patterns',
    1
FROM projects WHERE slug = 'cloudthinker'
UNION ALL
SELECT
    id,
    'iac',
    'Terraform Infrastructure Code',
    'Complete IaC templates for multi-cloud deployment',
    2
FROM projects WHERE slug = 'cloudthinker'
UNION ALL
SELECT
    id,
    'dashboard',
    'Operations Dashboard',
    'Real-time monitoring and observability dashboard',
    3
FROM projects WHERE slug = 'cloudthinker';
