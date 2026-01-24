import type { BlogPost } from '@/types';

/**
 * Mock Blog Posts Data
 * Replace with actual CMS data
 */
export const blogPostsData: BlogPost[] = [
  {
    id: '1',
    slug: 'aws-serverless-architecture-best-practices',
    title: 'AWS Serverless Architecture: Best Practices for Production',
    excerpt: 'Learn the essential best practices for building production-ready serverless applications on AWS, including Lambda optimization, API Gateway configuration, and cost management strategies.',
    content: `# AWS Serverless Architecture: Best Practices for Production

Serverless architecture has revolutionized how we build and deploy applications. In this comprehensive guide, we'll explore the best practices for building production-ready serverless applications on AWS.

## Why Serverless?

Serverless computing allows you to build and run applications without managing servers. AWS handles the infrastructure, scaling, and maintenance, letting you focus on code.

### Key Benefits

- **Automatic Scaling**: Handle any load without manual intervention
- **Pay-per-use**: Only pay for actual compute time
- **Reduced Operational Overhead**: No server management
- **Built-in High Availability**: Across multiple availability zones

## Lambda Best Practices

### 1. Optimize Cold Starts

\`\`\`typescript
// Bad: Heavy imports at module level
import * as AWS from 'aws-sdk';
import * as _ from 'lodash';

// Good: Import only what you need
import { DynamoDB } from 'aws-sdk';
import { get } from 'lodash';
\`\`\`

### 2. Use Environment Variables

\`\`\`typescript
const TABLE_NAME = process.env.TABLE_NAME;
const REGION = process.env.AWS_REGION;
\`\`\`

## API Gateway Configuration

Configure API Gateway for optimal performance and security.

## Conclusion

Following these best practices will help you build robust, scalable serverless applications on AWS.`,
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    author: {
      id: '1',
      name: 'Kha Van Hoang',
      email: 'khavan.work@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Kha+Van+Hoang&background=0D8ABC&color=fff',
      bio: 'Cloud & AI Solution Architect, AWS Community Builder',
    },
    category: 'Cloud Architecture',
    tags: ['AWS', 'Serverless', 'Lambda', 'Best Practices'],
    publishedAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
    readTime: 8,
    featured: true,
    seo: {
      metaTitle: 'AWS Serverless Architecture Best Practices | Kha Van Hoang',
      metaDescription: 'Essential best practices for building production-ready serverless applications on AWS',
      keywords: ['AWS', 'Serverless', 'Lambda', 'Cloud Architecture', 'Best Practices'],
    },
    commentsEnabled: true,
    language: 'en' as const,
    viewCount: 1250,
  },
  {
    id: '2',
    slug: 'kubernetes-production-deployment-guide',
    title: 'Kubernetes in Production: A Complete Deployment Guide',
    excerpt: 'A comprehensive guide to deploying and managing Kubernetes clusters in production environments, covering security, monitoring, and scaling strategies.',
    content: `# Kubernetes in Production: A Complete Deployment Guide

Deploying Kubernetes in production requires careful planning and implementation. This guide covers everything you need to know.

## Cluster Setup

### Infrastructure Considerations

- **Node Sizing**: Choose appropriate instance types
- **Networking**: Configure VPC and subnets properly
- **Storage**: Set up persistent volume claims

## Security Best Practices

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
\`\`\`

## Monitoring and Logging

Implement comprehensive monitoring with Prometheus and Grafana.

## Conclusion

Production Kubernetes requires attention to detail and continuous monitoring.`,
    featuredImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    author: {
      id: '1',
      name: 'Kha Van Hoang',
      email: 'khavan.work@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Kha+Van+Hoang&background=0D8ABC&color=fff',
      bio: 'Cloud & AI Solution Architect, AWS Community Builder',
    },
    category: 'DevOps',
    tags: ['Kubernetes', 'DevOps', 'Container Orchestration', 'Production'],
    publishedAt: '2024-10-28T14:30:00Z',
    updatedAt: '2024-10-28T14:30:00Z',
    readTime: 12,
    featured: true,
    seo: {
      metaTitle: 'Kubernetes Production Deployment Guide | Kha Van Hoang',
      metaDescription: 'Complete guide to deploying Kubernetes in production environments',
      keywords: ['Kubernetes', 'DevOps', 'Container', 'Production', 'Deployment'],
    },
    commentsEnabled: true,
    language: 'en' as const,
    viewCount: 980,
  },
  {
    id: '3',
    slug: 'machine-learning-aws-sagemaker',
    title: 'Getting Started with Machine Learning on AWS SageMaker',
    excerpt: 'Learn how to build, train, and deploy machine learning models using AWS SageMaker, from data preparation to model deployment.',
    content: `# Getting Started with Machine Learning on AWS SageMaker

AWS SageMaker simplifies the machine learning workflow. Let's explore how to use it effectively.

## What is SageMaker?

SageMaker is a fully managed service for building, training, and deploying ML models at scale.

## Building Your First Model

\`\`\`python
import sagemaker
from sagemaker import get_execution_role

role = get_execution_role()
sess = sagemaker.Session()
\`\`\`

## Training and Deployment

Deploy your model with just a few lines of code.

## Conclusion

SageMaker accelerates ML development significantly.`,
    featuredImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    author: {
      id: '1',
      name: 'Kha Van Hoang',
      email: 'khavan.work@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Kha+Van+Hoang&background=0D8ABC&color=fff',
      bio: 'Cloud & AI Solution Architect, AWS Community Builder',
    },
    category: 'Machine Learning',
    tags: ['AWS', 'SageMaker', 'Machine Learning', 'AI'],
    publishedAt: '2024-10-20T09:00:00Z',
    updatedAt: '2024-10-20T09:00:00Z',
    readTime: 10,
    featured: false,
    seo: {
      metaTitle: 'Machine Learning with AWS SageMaker Tutorial',
      metaDescription: 'Learn to build and deploy ML models using AWS SageMaker',
      keywords: ['AWS', 'SageMaker', 'Machine Learning', 'AI', 'Tutorial'],
    },
    commentsEnabled: true,
    language: 'en' as const,
    viewCount: 756,
  },
];

/**
 * Get all blog posts
 */
export const getBlogPosts = (): BlogPost[] => {
  return blogPostsData.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

/**
 * Get featured blog posts
 */
export const getFeaturedBlogPosts = (): BlogPost[] => {
  return blogPostsData.filter(post => post.featured);
};

/**
 * Get blog post by slug
 */
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPostsData.find(post => post.slug === slug);
};

/**
 * Get blog posts by category
 */
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPostsData.filter(post => post.category === category);
};

/**
 * Get blog posts by tag
 */
export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return blogPostsData.filter(post => post.tags.includes(tag));
};

/**
 * Get all categories
 */
export const getBlogCategories = (): string[] => {
  return Array.from(new Set(blogPostsData.map(post => post.category)));
};

/**
 * Get all tags
 */
export const getBlogTags = (): string[] => {
  const allTags = blogPostsData.flatMap(post => post.tags);
  return Array.from(new Set(allTags));
};
