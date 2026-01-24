import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

const client = generateClient<ClientSchema>({
  authMode: 'apiKey',
});

async function seedData() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Seed Blog Posts
    console.log('📝 Seeding blog posts...');
    const blogPosts = [
      {
        title: 'Getting Started with AWS CDK',
        slug: 'getting-started-with-aws-cdk',
        excerpt: 'Learn how to use AWS CDK to define cloud infrastructure as code',
        content: `# Getting Started with AWS CDK

AWS Cloud Development Kit (CDK) is an open-source software development framework to define cloud infrastructure in code and provision it through AWS CloudFormation.

## Why Use CDK?

- **Familiar Languages**: Write infrastructure code in TypeScript, Python, Java, or C#
- **High-level Constructs**: Use pre-built components to quickly create AWS resources
- **Type Safety**: Catch errors at compile time
- **Reusability**: Create and share custom constructs

## Installation

\`\`\`bash
npm install -g aws-cdk
cdk --version
\`\`\`

## Your First Stack

\`\`\`typescript
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
\`\`\`

Start building your infrastructure as code today!`,
        category: 'Cloud',
        tags: ['AWS', 'CDK', 'Infrastructure as Code', 'CloudFormation'],
        author: 'Kha Van Hoang',
        publishedAt: new Date('2024-01-15').toISOString(),
        viewCount: 245,
        featured: true,
        published: true,
      },
      {
        title: 'Building Scalable APIs with AWS Lambda',
        slug: 'building-scalable-apis-with-aws-lambda',
        excerpt: 'Best practices for building production-ready serverless APIs',
        content: `# Building Scalable APIs with AWS Lambda

Learn how to build high-performance, scalable APIs using AWS Lambda and API Gateway.

## Architecture Overview

1. **API Gateway**: Entry point for all requests
2. **Lambda Functions**: Business logic execution
3. **DynamoDB**: Fast, scalable NoSQL database
4. **CloudWatch**: Monitoring and logging

## Key Benefits

- **Auto-scaling**: Handles traffic spikes automatically
- **Pay per use**: Only pay for actual compute time
- **No server management**: Focus on code, not infrastructure
- **Built-in availability**: Multi-AZ deployment by default

## Sample Lambda Function

\`\`\`python
import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

def lambda_handler(event, context):
    response = table.get_item(Key={'userId': event['userId']})
    return {
        'statusCode': 200,
        'body': json.dumps(response['Item'])
    }
\`\`\`

## Performance Tips

- Use Lambda layers for shared dependencies
- Enable provisioned concurrency for consistent performance
- Implement proper error handling and retries
- Use X-Ray for distributed tracing`,
        category: 'Cloud',
        tags: ['AWS', 'Lambda', 'Serverless', 'API Gateway'],
        author: 'Kha Van Hoang',
        publishedAt: new Date('2024-02-10').toISOString(),
        viewCount: 189,
        featured: true,
        published: true,
      },
      {
        title: 'Mastering Kubernetes StatefulSets',
        slug: 'mastering-kubernetes-statefulsets',
        excerpt: 'Deep dive into StatefulSets for managing stateful applications',
        content: `# Mastering Kubernetes StatefulSets

StatefulSets are essential for running stateful applications like databases and message queues in Kubernetes.

## When to Use StatefulSets

- Stable network identifiers
- Persistent storage
- Ordered deployment and scaling
- Ordered deletion and termination

## Example: MongoDB StatefulSet

\`\`\`yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
spec:
  serviceName: mongodb
  replicas: 3
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:5.0
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: data
          mountPath: /data/db
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
\`\`\`

## Key Features

1. **Stable Network Identity**: Each pod gets a stable hostname
2. **Ordered Operations**: Pods are created/deleted in order
3. **Persistent Storage**: Each pod gets its own PVC
4. **Headless Service**: Direct pod-to-pod communication`,
        category: 'DevOps',
        tags: ['Kubernetes', 'StatefulSets', 'DevOps', 'Containers'],
        author: 'Kha Van Hoang',
        publishedAt: new Date('2024-03-05').toISOString(),
        viewCount: 167,
        featured: false,
        published: true,
      },
      {
        title: 'AI/ML Model Deployment with SageMaker',
        slug: 'ai-ml-model-deployment-with-sagemaker',
        excerpt: 'Production-ready machine learning model deployment on AWS',
        content: `# AI/ML Model Deployment with SageMaker

Amazon SageMaker makes it easy to deploy machine learning models at scale.

## Deployment Options

1. **Real-time Inference**: Low-latency predictions
2. **Batch Transform**: Process large datasets
3. **Serverless Inference**: Auto-scaling endpoints
4. **Multi-model Endpoints**: Host multiple models

## Deploy a Model

\`\`\`python
import sagemaker
from sagemaker.predictor import Predictor

# Create model
model = sagemaker.Model(
    model_data='s3://bucket/model.tar.gz',
    role=role,
    image_uri=image
)

# Deploy to endpoint
predictor = model.deploy(
    initial_instance_count=1,
    instance_type='ml.m5.xlarge',
    endpoint_name='my-endpoint'
)

# Make predictions
result = predictor.predict(data)
\`\`\`

## Best Practices

- Use auto-scaling for variable traffic
- Implement model monitoring
- A/B test new models
- Enable model explainability`,
        category: 'AI/ML',
        tags: ['AWS', 'SageMaker', 'Machine Learning', 'AI'],
        author: 'Kha Van Hoang',
        publishedAt: new Date('2024-04-20').toISOString(),
        viewCount: 203,
        featured: true,
        published: true,
      },
      {
        title: 'DevSecOps Best Practices',
        slug: 'devsecops-best-practices',
        excerpt: 'Integrating security into your DevOps pipeline',
        content: `# DevSecOps Best Practices

Security should be integrated into every phase of the development lifecycle.

## Core Principles

1. **Shift Left**: Identify security issues early
2. **Automate Everything**: Security scanning in CI/CD
3. **Continuous Monitoring**: Real-time threat detection
4. **Compliance as Code**: Automate compliance checks

## Security Scanning Tools

- **SAST**: SonarQube, Checkmarx
- **DAST**: OWASP ZAP, Burp Suite
- **Container Scanning**: Trivy, Clair
- **Dependency Scanning**: Snyk, Dependabot

## Sample Pipeline

\`\`\`yaml
stages:
  - build
  - security-scan
  - test
  - deploy

security-scan:
  stage: security-scan
  script:
    - trivy image myapp:latest
    - sonar-scanner
    - snyk test
  allow_failure: false
\`\`\`

## Key Metrics

- Mean Time to Detect (MTTD)
- Mean Time to Resolve (MTTR)
- Vulnerability density
- False positive rate`,
        category: 'DevSecOps',
        tags: ['Security', 'DevOps', 'CI/CD', 'Best Practices'],
        author: 'Kha Van Hoang',
        publishedAt: new Date('2024-05-15').toISOString(),
        viewCount: 178,
        featured: false,
        published: true,
      },
    ];

    for (const post of blogPosts) {
      await client.models.BlogPost.create(post);
      console.log(`  ✓ Created: ${post.title}`);
    }

    // Seed Projects
    console.log('\n💼 Seeding projects...');
    const projects = [
      {
        title: 'Cloud-Native E-commerce Platform',
        slug: 'cloud-native-ecommerce-platform',
        description: 'Scalable microservices-based e-commerce platform built on AWS',
        longDescription: `<h2>Overview</h2>
<p>Built a fully serverless e-commerce platform handling 100K+ daily transactions using AWS services.</p>

<h3>Key Features</h3>
<ul>
<li>Microservices architecture with API Gateway and Lambda</li>
<li>Real-time inventory management with DynamoDB Streams</li>
<li>Payment processing with Stripe integration</li>
<li>Order tracking with SNS/SQS messaging</li>
<li>Image optimization with S3 and CloudFront</li>
</ul>

<h3>Technical Highlights</h3>
<p>Implemented auto-scaling to handle Black Friday traffic spikes (10x normal load). Used Step Functions for order orchestration and EventBridge for event-driven communication between services.</p>`,
        category: 'Cloud Architecture',
        technologies: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'React', 'TypeScript', 'Stripe'],
        githubUrl: 'https://github.com/vanhoangkha/ecommerce-platform',
        liveUrl: 'https://demo-ecommerce.khavan.com',
        featured: true,
        startDate: '2023-06-01',
        endDate: '2024-01-15',
        status: 'completed',
      },
      {
        title: 'Kubernetes Multi-Cluster Management',
        slug: 'kubernetes-multi-cluster-management',
        description: 'GitOps-based multi-cluster Kubernetes management platform',
        longDescription: `<h2>Project Overview</h2>
<p>Developed a comprehensive platform for managing multiple Kubernetes clusters across different cloud providers and regions.</p>

<h3>Architecture</h3>
<ul>
<li>ArgoCD for GitOps deployments</li>
<li>Flux for progressive delivery</li>
<li>Istio service mesh for traffic management</li>
<li>Prometheus + Grafana for observability</li>
<li>Cert-manager for automatic SSL/TLS</li>
</ul>

<h3>Results</h3>
<p>Reduced deployment time by 75% and improved system reliability to 99.95% uptime. Managed 15+ clusters across AWS EKS, Azure AKS, and GCP GKE.</p>`,
        category: 'DevOps',
        technologies: ['Kubernetes', 'ArgoCD', 'Istio', 'Prometheus', 'Terraform', 'Helm'],
        githubUrl: 'https://github.com/vanhoangkha/k8s-multi-cluster',
        featured: true,
        startDate: '2023-09-01',
        endDate: '2024-03-30',
        status: 'completed',
      },
      {
        title: 'AI-Powered Code Review Assistant',
        slug: 'ai-powered-code-review-assistant',
        description: 'Machine learning model for automated code review and bug detection',
        longDescription: `<h2>AI Code Review Bot</h2>
<p>Built an AI assistant that analyzes pull requests and provides intelligent code review feedback.</p>

<h3>Technology Stack</h3>
<ul>
<li>OpenAI GPT-4 for code analysis</li>
<li>Python + FastAPI backend</li>
<li>GitHub Actions integration</li>
<li>PostgreSQL for storing review history</li>
<li>Redis for caching</li>
</ul>

<h3>Features</h3>
<ul>
<li>Detects potential bugs and security vulnerabilities</li>
<li>Suggests performance improvements</li>
<li>Checks code style and best practices</li>
<li>Provides detailed explanations</li>
<li>Learns from team's code review patterns</li>
</ul>

<h3>Impact</h3>
<p>Reduced code review time by 60% and caught 40% more bugs before production deployment.</p>`,
        category: 'AI/ML',
        technologies: ['Python', 'OpenAI', 'FastAPI', 'PostgreSQL', 'Docker', 'GitHub Actions'],
        githubUrl: 'https://github.com/vanhoangkha/ai-code-reviewer',
        liveUrl: 'https://code-review.khavan.com',
        featured: true,
        startDate: '2024-01-10',
        endDate: '2024-06-20',
        status: 'completed',
      },
      {
        title: 'Real-time Analytics Dashboard',
        slug: 'real-time-analytics-dashboard',
        description: 'Live data visualization platform with millions of events per second',
        longDescription: `<h2>High-Performance Analytics</h2>
<p>Built a real-time analytics platform processing 5M+ events per second with sub-second latency.</p>

<h3>Architecture</h3>
<ul>
<li>Apache Kafka for event streaming</li>
<li>Apache Flink for real-time processing</li>
<li>ClickHouse for analytical queries</li>
<li>Next.js + React for dashboard</li>
<li>WebSocket for live updates</li>
</ul>

<h3>Key Achievements</h3>
<p>Achieved 99.9% data accuracy with <200ms end-to-end latency. Dashboard handles 50K+ concurrent users with smooth real-time updates.</p>`,
        category: 'Data Engineering',
        technologies: ['Kafka', 'Flink', 'ClickHouse', 'Next.js', 'TypeScript', 'Kubernetes'],
        githubUrl: 'https://github.com/vanhoangkha/realtime-analytics',
        liveUrl: 'https://analytics.khavan.com',
        featured: false,
        startDate: '2023-11-01',
        status: 'in-progress',
      },
      {
        title: 'Serverless Blog Platform',
        slug: 'serverless-blog-platform',
        description: 'Modern blogging platform with CMS using AWS Amplify Gen 2',
        longDescription: `<h2>Modern Blog CMS</h2>
<p>This portfolio website with full-featured CMS built using latest AWS technologies.</p>

<h3>Features</h3>
<ul>
<li>Rich text editor with React Quill</li>
<li>Media library with S3 integration</li>
<li>Authentication with Cognito</li>
<li>Real-time data sync with AppSync</li>
<li>Responsive admin dashboard</li>
</ul>

<h3>Tech Stack</h3>
<ul>
<li>Frontend: React, TypeScript, Material-UI</li>
<li>Backend: AWS Amplify Gen 2</li>
<li>Database: DynamoDB</li>
<li>Storage: S3</li>
<li>Hosting: AWS Amplify Hosting</li>
</ul>`,
        category: 'Web Development',
        technologies: ['React', 'AWS Amplify', 'TypeScript', 'Material-UI', 'DynamoDB'],
        githubUrl: 'https://github.com/vanhoangkha/Portfolio',
        liveUrl: 'https://khavan.com',
        featured: true,
        startDate: '2024-11-01',
        status: 'in-progress',
      },
    ];

    for (const project of projects) {
      await client.models.Project.create(project);
      console.log(`  ✓ Created: ${project.title}`);
    }

    // Seed Skills
    console.log('\n🎯 Seeding skills...');
    const skills = [
      { name: 'AWS', category: 'Cloud', level: 95, icon: 'aws', order: 1 },
      { name: 'Kubernetes', category: 'DevOps', level: 90, icon: 'kubernetes', order: 2 },
      { name: 'TypeScript', category: 'Programming', level: 88, icon: 'typescript', order: 3 },
      { name: 'Python', category: 'Programming', level: 85, icon: 'python', order: 4 },
      { name: 'Docker', category: 'DevOps', level: 92, icon: 'docker', order: 5 },
      { name: 'Terraform', category: 'IaC', level: 87, icon: 'terraform', order: 6 },
      { name: 'React', category: 'Frontend', level: 86, icon: 'react', order: 7 },
      { name: 'Node.js', category: 'Backend', level: 84, icon: 'nodejs', order: 8 },
      { name: 'PostgreSQL', category: 'Database', level: 82, icon: 'postgresql', order: 9 },
      { name: 'GraphQL', category: 'API', level: 80, icon: 'graphql', order: 10 },
    ];

    for (const skill of skills) {
      await client.models.Skill.create(skill);
      console.log(`  ✓ Created: ${skill.name}`);
    }

    // Seed Contact Submission (sample)
    console.log('\n💬 Seeding sample contact message...');
    await client.models.ContactSubmission.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Interested in collaboration',
      message: 'Hi Kha,\n\nI came across your portfolio and I\'m impressed with your work on cloud architecture. I\'d like to discuss a potential collaboration opportunity.\n\nBest regards,\nJohn',
      status: 'new',
      submittedAt: new Date().toISOString(),
      ipAddress: '192.168.1.100',
    });
    console.log('  ✓ Created sample contact message');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - Blog Posts: ${blogPosts.length}`);
    console.log(`  - Projects: ${projects.length}`);
    console.log(`  - Skills: ${skills.length}`);
    console.log(`  - Contact Messages: 1`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  }
}

// Run seeding
seedData()
  .then(() => {
    console.log('\n🎉 All done! You can now test the CMS with sample data.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to seed data:', error);
    process.exit(1);
  });
