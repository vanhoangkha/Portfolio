import type { BlogPost } from '@/types';

/**
 * Structured Data Utilities
 * Generate JSON-LD structured data for SEO
 */

interface Person {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  description?: string;
}

interface Organization {
  name: string;
  url: string;
  logo?: string;
}

/**
 * Generate Person schema for portfolio owner
 */
export const generatePersonSchema = (person: Person) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: person.url,
    image: person.image,
    jobTitle: person.jobTitle,
    description: person.description,
  };
};

/**
 * Generate BlogPosting schema for blog posts
 */
export const generateBlogPostingSchema = (post: BlogPost, siteUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      image: post.author.avatar,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    wordCount: post.content?.split(/\s+/).length || 0,
    timeRequired: `PT${post.readTime}M`,
  };
};

/**
 * Generate BreadcrumbList schema for navigation
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Generate WebSite schema for homepage
 */
export const generateWebSiteSchema = (siteUrl: string, siteName: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Generate Article schema (alternative to BlogPosting)
 */
export const generateArticleSchema = (post: BlogPost, siteUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };
};

/**
 * Generate Organization schema
 */
export const generateOrganizationSchema = (org: Organization) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
  };
};

/**
 * Inject structured data into page head
 */
export const injectStructuredData = (schema: object) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  
  // Remove existing structured data script if present
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }
  
  document.head.appendChild(script);
};

/**
 * Generate multiple schemas at once
 */
export const generateMultipleSchemas = (schemas: object[]) => {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
};
