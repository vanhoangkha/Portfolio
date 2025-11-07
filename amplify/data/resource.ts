import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * Define and configure data models using AWS Amplify Data (DynamoDB)
 *
 * For this portfolio, we'll use:
 * - DynamoDB for blog posts, projects, and portfolio data (fast, scalable)
 * - RDS PostgreSQL can be added separately for complex relational data if needed
 */

const schema = a.schema({
  // Blog Posts
  BlogPost: a
    .model({
      title: a.string().required(),
      slug: a.string().required(),
      excerpt: a.string(),
      content: a.string().required(),
      category: a.string(),
      tags: a.string().array(),
      featuredImage: a.string(),
      author: a.string().required(),
      publishedAt: a.datetime(),
      viewCount: a.integer().default(0),
      featured: a.boolean().default(false),
      published: a.boolean().default(false),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
      allow.guest().to(['read']),
    ]),

  // Projects
  Project: a
    .model({
      title: a.string().required(),
      slug: a.string().required(),
      description: a.string().required(),
      longDescription: a.string(),
      category: a.string(),
      tags: a.string().array(),
      technologies: a.string().array(),
      imageUrl: a.string(),
      githubUrl: a.string(),
      liveUrl: a.string(),
      featured: a.boolean().default(false),
      startDate: a.date(),
      endDate: a.date(),
      status: a.string(), // 'completed', 'in-progress', 'planned'
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
      allow.guest().to(['read']),
    ]),

  // Skills
  Skill: a
    .model({
      name: a.string().required(),
      category: a.string().required(), // 'cloud', 'programming', 'devops', etc.
      level: a.integer(), // 1-5
      icon: a.string(),
      order: a.integer(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
      allow.guest().to(['read']),
    ]),

  // Certifications
  Certification: a
    .model({
      name: a.string().required(),
      issuer: a.string().required(),
      issueDate: a.date().required(),
      expiryDate: a.date(),
      credentialId: a.string(),
      credentialUrl: a.string(),
      imageUrl: a.string(),
      description: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
      allow.guest().to(['read']),
    ]),

  // Achievements
  Achievement: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      date: a.date().required(),
      category: a.string(),
      imageUrl: a.string(),
      link: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
      allow.guest().to(['read']),
    ]),

  // Community Activities
  CommunityActivity: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      type: a.string(), // 'speaking', 'workshop', 'article', 'video', etc.
      date: a.date().required(),
      organization: a.string(),
      url: a.string(),
      imageUrl: a.string(),
      participants: a.integer(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
      allow.guest().to(['read']),
    ]),

  // Contact Form Submissions
  ContactSubmission: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      subject: a.string(),
      message: a.string().required(),
      status: a.string().default('new'), // 'new', 'read', 'replied'
      submittedAt: a.datetime().required(),
      ipAddress: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'update', 'delete']),
      allow.guest().to(['create']),
    ]),

  // Analytics Events
  AnalyticsEvent: a
    .model({
      eventType: a.string().required(), // 'page_view', 'blog_view', 'project_view', etc.
      eventData: a.string(), // JSON string
      userAgent: a.string(),
      ipAddress: a.string(),
      timestamp: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'delete']),
      allow.guest().to(['create']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
