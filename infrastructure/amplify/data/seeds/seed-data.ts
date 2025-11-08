/**
 * Seed Data for Portfolio Database
 * Run this to populate initial data
 */

export const blogPosts = [
  {
    title: "Building Scalable AWS Architectures: Best Practices for 2024",
    slug: "scalable-aws-architectures-2024",
    excerpt: "Learn how to design and implement scalable cloud architectures using AWS services with real-world examples.",
    content: `# Building Scalable AWS Architectures

In this comprehensive guide, we'll explore the key principles and best practices for building scalable architectures on AWS...

## Key Components
- Auto Scaling Groups
- Elastic Load Balancing
- Amazon RDS with Multi-AZ
- CloudFront for content delivery
- ElastiCache for caching

## Architecture Patterns
1. **Microservices Architecture**
2. **Event-Driven Architecture**
3. **Serverless Architecture**

## Conclusion
Building scalable architectures requires careful planning and the right combination of AWS services.`,
    category: "Cloud",
    tags: ["AWS", "Architecture", "Scalability", "Best Practices"],
    author: "Kha Van Hoang",
    publishedAt: new Date("2024-10-15").toISOString(),
    viewCount: 1250,
    featured: true,
    published: true,
  },
  {
    title: "Generative AI Integration in Enterprise Applications",
    slug: "generative-ai-enterprise-applications",
    excerpt: "A practical guide to integrating GenAI capabilities into existing enterprise systems.",
    content: `# Generative AI in Enterprise

Discover how to leverage GenAI to transform your enterprise applications...`,
    category: "AI/ML",
    tags: ["AI", "GenAI", "Enterprise", "Integration"],
    author: "Kha Van Hoang",
    publishedAt: new Date("2024-09-28").toISOString(),
    viewCount: 980,
    featured: true,
    published: true,
  },
  {
    title: "DevSecOps: Security in CI/CD Pipelines",
    slug: "devsecops-security-cicd",
    excerpt: "Implement security best practices in your CI/CD pipelines with automated testing and compliance checks.",
    content: `# DevSecOps Implementation

Learn how to integrate security into every stage of your development pipeline...`,
    category: "DevSecOps",
    tags: ["DevOps", "Security", "CI/CD", "Automation"],
    author: "Kha Van Hoang",
    publishedAt: new Date("2024-08-20").toISOString(),
    viewCount: 756,
    featured: false,
    published: true,
  },
  {
    title: "Multi-Cloud Strategy: AWS, Azure, and GCP",
    slug: "multi-cloud-strategy-aws-azure-gcp",
    excerpt: "Navigate the complexities of multi-cloud environments with practical strategies.",
    content: `# Multi-Cloud Strategy

Explore how to design and manage applications across multiple cloud providers...`,
    category: "Cloud",
    tags: ["Multi-Cloud", "AWS", "Azure", "GCP"],
    author: "Kha Van Hoang",
    publishedAt: new Date("2024-07-12").toISOString(),
    viewCount: 643,
    featured: false,
    published: true,
  },
  {
    title: "Building Community: My Journey with AWS User Group",
    slug: "building-aws-community",
    excerpt: "Lessons learned from building and leading a 50K+ member tech community.",
    content: `# Community Building Journey

Sharing my experience in growing and managing a large technical community...`,
    category: "Community",
    tags: ["Community", "Leadership", "AWS", "Events"],
    author: "Kha Van Hoang",
    publishedAt: new Date("2024-06-05").toISOString(),
    viewCount: 521,
    featured: false,
    published: true,
  },
  {
    title: "Career Growth: From Developer to Solutions Architect",
    slug: "career-growth-solutions-architect",
    excerpt: "My career journey and advice for aspiring cloud architects.",
    content: `# Career Journey

Insights and lessons from 5+ years in cloud computing and solution architecture...`,
    category: "Career",
    tags: ["Career", "Cloud", "Architecture", "Growth"],
    author: "Kha Van Hoang",
    publishedAt: new Date("2024-05-18").toISOString(),
    viewCount: 892,
    featured: false,
    published: true,
  },
];

export const projects = [
  {
    title: "CloudThinker Platform",
    slug: "cloudthinker-platform",
    description: "Enterprise cloud management platform serving 100+ customers",
    longDescription: "A comprehensive cloud management solution that helps enterprises optimize their multi-cloud infrastructure, reduce costs, and improve operational efficiency. The platform provides real-time monitoring, cost optimization, security compliance, and automated resource management across AWS, Azure, and GCP.",
    category: "Cloud Platform",
    tags: ["AWS", "Azure", "GCP", "Multi-Cloud"],
    technologies: ["AWS", "React", "Node.js", "Python", "Terraform"],
    liveUrl: "https://cloudthinker.io",
    featured: true,
    startDate: "2022-01-15",
    endDate: "2024-11-01",
    status: "completed",
  },
  {
    title: "AWS GenAI Solutions",
    slug: "aws-genai-solutions",
    description: "5+ enterprise GenAI implementations with AWS Bedrock",
    longDescription: "Led the design and implementation of generative AI solutions for enterprise clients using AWS Bedrock, SageMaker, and Lambda. Solutions include intelligent chatbots, document analysis, content generation, and custom AI models tailored to specific business needs.",
    category: "AI/ML",
    tags: ["AWS", "GenAI", "Bedrock", "SageMaker"],
    technologies: ["AWS Bedrock", "Lambda", "Python", "LangChain"],
    featured: true,
    startDate: "2023-06-01",
    status: "in-progress",
  },
  {
    title: "Enterprise LMS Platform",
    slug: "enterprise-lms",
    description: "Learning management system for 10,000+ users",
    longDescription: "Scalable learning management platform built on AWS with features including course management, video streaming, assessments, certifications, and analytics. Supports 10,000+ concurrent users with 99.9% uptime.",
    category: "Education",
    tags: ["AWS", "Education", "LMS", "Video Streaming"],
    technologies: ["AWS", "React", "GraphQL", "DynamoDB", "S3"],
    featured: true,
    startDate: "2021-09-01",
    endDate: "2023-03-15",
    status: "completed",
  },
  {
    title: "Hybrid Cloud Migration",
    slug: "hybrid-cloud-migration",
    description: "300+ VMs migrated to hybrid cloud architecture",
    longDescription: "Led a large-scale migration project moving 300+ VMs from on-premises to a hybrid cloud architecture. Implemented disaster recovery, high availability, and cost optimization strategies resulting in 40% infrastructure cost reduction.",
    category: "Cloud Migration",
    tags: ["Migration", "Hybrid Cloud", "VMware", "AWS"],
    technologies: ["AWS", "VMware", "Terraform", "Ansible"],
    featured: false,
    startDate: "2020-03-01",
    endDate: "2021-08-30",
    status: "completed",
  },
  {
    title: "DevSecOps Pipeline",
    slug: "devsecops-pipeline",
    description: "Automated CI/CD with integrated security scanning",
    longDescription: "Designed and implemented a comprehensive DevSecOps pipeline integrating security at every stage. Includes automated testing, vulnerability scanning, compliance checks, and deployment automation across multiple environments.",
    category: "DevOps",
    tags: ["CI/CD", "Security", "Automation", "Jenkins"],
    technologies: ["Jenkins", "Docker", "Kubernetes", "SonarQube", "AWS"],
    featured: false,
    startDate: "2021-01-15",
    endDate: "2021-12-30",
    status: "completed",
  },
  {
    title: "Multi-Cloud Cost Optimizer",
    slug: "multi-cloud-cost-optimizer",
    description: "Automated cost optimization across cloud providers",
    longDescription: "Developed an intelligent cost optimization tool that analyzes usage patterns across AWS, Azure, and GCP to provide recommendations for resource rightsizing, reserved instances, and automated shutdown policies. Achieved average 30% cost reduction for clients.",
    category: "FinOps",
    tags: ["Cost Optimization", "Multi-Cloud", "Automation"],
    technologies: ["Python", "AWS", "Azure", "GCP", "Terraform"],
    githubUrl: "https://github.com/vanhoangkha/cloud-cost-optimizer",
    featured: false,
    startDate: "2022-06-01",
    status: "in-progress",
  },
];

export const skills = [
  // Cloud Platforms
  { name: "AWS", category: "Cloud", level: 5, order: 1 },
  { name: "Azure", category: "Cloud", level: 4, order: 2 },
  { name: "Google Cloud", category: "Cloud", level: 3, order: 3 },

  // Architecture
  { name: "Solution Architecture", category: "Architecture", level: 5, order: 1 },
  { name: "Microservices", category: "Architecture", level: 5, order: 2 },
  { name: "Serverless", category: "Architecture", level: 5, order: 3 },
  { name: "Event-Driven Architecture", category: "Architecture", level: 4, order: 4 },

  // AI/ML
  { name: "AWS Bedrock", category: "AI/ML", level: 5, order: 1 },
  { name: "SageMaker", category: "AI/ML", level: 4, order: 2 },
  { name: "Machine Learning", category: "AI/ML", level: 4, order: 3 },
  { name: "LangChain", category: "AI/ML", level: 4, order: 4 },

  // DevOps
  { name: "Terraform", category: "DevOps", level: 5, order: 1 },
  { name: "Docker", category: "DevOps", level: 5, order: 2 },
  { name: "Kubernetes", category: "DevOps", level: 4, order: 3 },
  { name: "CI/CD", category: "DevOps", level: 5, order: 4 },
  { name: "Jenkins", category: "DevOps", level: 4, order: 5 },

  // Programming
  { name: "Python", category: "Programming", level: 5, order: 1 },
  { name: "JavaScript/TypeScript", category: "Programming", level: 4, order: 2 },
  { name: "Node.js", category: "Programming", level: 4, order: 3 },
  { name: "Go", category: "Programming", level: 3, order: 4 },

  // Databases
  { name: "DynamoDB", category: "Database", level: 5, order: 1 },
  { name: "PostgreSQL", category: "Database", level: 4, order: 2 },
  { name: "MongoDB", category: "Database", level: 4, order: 3 },
  { name: "Redis", category: "Database", level: 4, order: 4 },
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    issueDate: "2023-01-15",
    expiryDate: "2026-01-15",
    credentialId: "AWS-SAP-2023-001234",
    description: "Professional-level certification demonstrating advanced technical skills and experience in designing distributed systems on AWS.",
  },
  {
    name: "AWS Certified DevOps Engineer - Professional",
    issuer: "Amazon Web Services",
    issueDate: "2022-08-20",
    expiryDate: "2025-08-20",
    credentialId: "AWS-DOP-2022-005678",
    description: "Professional-level certification for DevOps engineers with expertise in provisioning, operating, and managing distributed systems on AWS.",
  },
  {
    name: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    issueDate: "2023-05-10",
    expiryDate: "2026-05-10",
    credentialId: "AWS-SCS-2023-009012",
    description: "Specialty certification validating expertise in securing AWS workloads and applications.",
  },
  {
    name: "Terraform Associate",
    issuer: "HashiCorp",
    issueDate: "2022-03-12",
    expiryDate: "2025-03-12",
    credentialId: "HCTA-2022-003456",
    description: "Certification demonstrating knowledge of basic Terraform concepts and skills.",
  },
  {
    name: "Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "2021-11-05",
    expiryDate: "2024-11-05",
    credentialId: "CKA-2021-007890",
    description: "Certification for Kubernetes administrators with skills in installation, configuration, and management of Kubernetes clusters.",
  },
];

export const achievements = [
  {
    title: "AWS Community Builder",
    description: "Selected as AWS Community Builder for Solutions Architecture category, representing Vietnam in the global AWS community.",
    date: "2023-03-15",
    category: "Recognition",
  },
  {
    title: "Speaker at AWS re:Invent",
    description: "Invited speaker at AWS re:Invent 2023, presenting on 'Scaling GenAI Solutions in Enterprise'.",
    date: "2023-11-28",
    category: "Speaking",
  },
  {
    title: "CloudThinker Founder",
    description: "Founded CloudThinker, a cloud consulting firm serving 100+ enterprise clients across Southeast Asia.",
    date: "2022-01-15",
    category: "Entrepreneurship",
  },
  {
    title: "AWS User Group Leader",
    description: "Leading AWS User Group Vietnam with 50,000+ members, organizing 100+ technical events and workshops.",
    date: "2020-06-01",
    category: "Community",
  },
  {
    title: "Published Author",
    description: "Published 50+ technical articles on cloud architecture, DevOps, and AI/ML, reaching 100K+ readers globally.",
    date: "2021-01-01",
    category: "Content",
  },
];

export const communityActivities = [
  {
    title: "AWS Summit Singapore 2024",
    description: "Keynote speaker on 'Hybrid Cloud Strategies for Modern Enterprises'",
    type: "speaking",
    date: "2024-10-15",
    organization: "AWS",
    participants: 2000,
  },
  {
    title: "GenAI Workshop Series",
    description: "6-week hands-on workshop series on building GenAI applications with AWS Bedrock",
    type: "workshop",
    date: "2024-08-01",
    organization: "AWS User Group Vietnam",
    participants: 500,
  },
  {
    title: "Cloud Architecture Masterclass",
    description: "2-day intensive training on AWS Well-Architected Framework",
    type: "workshop",
    date: "2024-06-15",
    organization: "CloudThinker",
    participants: 150,
  },
  {
    title: "DevOps Vietnam Conference",
    description: "Panel discussion on 'DevSecOps in 2024: Trends and Best Practices'",
    type: "speaking",
    date: "2024-05-20",
    organization: "DevOps Vietnam",
    participants: 800,
  },
  {
    title: "Tech Talk: Serverless at Scale",
    description: "Monthly tech talk series on serverless architecture patterns",
    type: "speaking",
    date: "2024-04-10",
    organization: "AWS User Group Vietnam",
    participants: 300,
  },
];
