import Fuse from 'fuse.js';
import type { SearchResult, SearchQuery } from '@/types';
import { getBlogPosts } from '@/data/blogData';
import { resumeData } from '@/data/resumeData';
import { logger } from '@utils/logger';
import i18n from '@/i18n/config';

/**
 * Search Service
 * Provides full-text search across projects, blog posts, skills, and experience
 * Uses Fuse.js for fuzzy matching
 */

interface SearchableItem {
  id: string;
  type: SearchResult['type'];
  title: string;
  excerpt: string;
  url: string;
  tags?: string[];
  content?: string;
}

/**
 * Build searchable index from all content
 */
const buildSearchIndex = (): SearchableItem[] => {
  const items: SearchableItem[] = [];

  // Add projects from translations
  try {
    const projectItems = i18n.t('projects:items', { returnObjects: true }) as Array<{
      title: string;
      description: string;
      tags: string[];
    }>;
    
    projectItems.forEach((item, index) => {
      items.push({
        id: `project-${index}`,
        type: 'project',
        title: item.title,
        excerpt: item.description,
        url: `/#projects`,
        tags: item.tags,
        content: item.description,
      });
    });
  } catch (error) {
    logger.warn('Failed to load projects for search index:', error);
  }

  // Add blog posts
  try {
    const blogPosts = getBlogPosts();
    blogPosts.forEach((post) => {
      items.push({
        id: post.id,
        type: 'blog',
        title: post.title,
        excerpt: post.excerpt,
        url: `/blog/${post.slug}`,
        tags: post.tags,
        content: post.content,
      });
    });
  } catch (error) {
    logger.warn('Failed to load blog posts for search index:', error);
  }

  // Add experience entries
  try {
    resumeData.experience.forEach((exp, index) => {
      items.push({
        id: `experience-${index}`,
        type: 'experience',
        title: `${exp.title} at ${exp.company}`,
        excerpt: exp.period,
        url: `/#experience`,
        content: exp.responsibilities.join(' '),
      });
    });
  } catch (error) {
    logger.warn('Failed to load experience for search index:', error);
  }

  // Add skills from SkillsSection categories
  try {
    const skillCategories = [
      { key: 'aiml', skills: ['AWS Bedrock', 'SageMaker', 'Azure OpenAI', 'Vertex AI', 'LangChain', 'RAG', 'Multi-Agent Systems'] },
      { key: 'cloud', skills: ['AWS', 'Azure', 'GCP', 'Multi-Cloud', 'Hybrid Cloud'] },
      { key: 'container', skills: ['Kubernetes', 'EKS', 'Docker', 'Fargate', 'Step Functions'] },
      { key: 'iac', skills: ['Terraform', 'AWS CDK', 'CloudFormation', 'Bicep'] },
      { key: 'cicd', skills: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'AWS CodePipeline'] },
      { key: 'observability', skills: ['Prometheus', 'Grafana', 'ELK Stack', 'OpenTelemetry', 'CloudWatch'] },
    ];

    skillCategories.forEach((category) => {
      const categoryName = i18n.t(`skills:categories.${category.key}`, category.key);
      category.skills.forEach((skill, index) => {
        items.push({
          id: `skill-${category.key}-${index}`,
          type: 'skill',
          title: skill,
          excerpt: `${categoryName} skill`,
          url: `/#skills`,
          tags: [categoryName, skill],
        });
      });
    });
  } catch (error) {
    logger.warn('Failed to load skills for search index:', error);
  }

  return items;
};

/**
 * Initialize Fuse.js search instance
 */
let fuseInstance: Fuse<SearchableItem> | null = null;

const getFuseInstance = (): Fuse<SearchableItem> => {
  if (!fuseInstance) {
    const index = buildSearchIndex();
    fuseInstance = new Fuse(index, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'content', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
      ],
      threshold: 0.3, // 0.0 = exact match, 1.0 = match anything
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      findAllMatches: true,
    });
  }
  return fuseInstance;
};

/**
 * Search across all content types
 */
export const search = (query: SearchQuery): SearchResult[] => {
  if (!query.query || query.query.trim().length < 2) {
    return [];
  }

  try {
    const fuse = getFuseInstance();
    const results = fuse.search(query.query.trim(), {
      limit: query.limit || 20,
    });

    // Filter by type if specified
    let filteredResults = results;
    if (query.filters?.type && query.filters.type.length > 0) {
      filteredResults = results.filter((result) =>
        query.filters!.type!.includes(result.item.type)
      );
    }

    // Filter by tags if specified
    if (query.filters?.tags && query.filters.tags.length > 0) {
      filteredResults = filteredResults.filter((result) =>
        result.item.tags?.some((tag) =>
          query.filters!.tags!.some((filterTag) =>
            tag.toLowerCase().includes(filterTag.toLowerCase())
          )
        )
      );
    }

    return filteredResults.map((result) => ({
      id: result.item.id,
      type: result.item.type,
      title: result.item.title,
      excerpt: result.item.excerpt,
      url: result.item.url,
      tags: result.item.tags,
      score: result.score || 0,
    }));
  } catch (error) {
    logger.error('Search failed:', error);
    return [];
  }
};

/**
 * Search by content type
 */
export const searchByType = (
  type: SearchResult['type'],
  query: string,
  limit = 10
): SearchResult[] => {
  return search({
    query,
    filters: { type: [type] },
    limit,
  });
};

/**
 * Get search suggestions (for autocomplete)
 */
export const getSearchSuggestions = (query: string, limit = 5): string[] => {
  if (!query || query.length < 2) {
    return [];
  }

  const results = search({ query, limit });
  const suggestions = new Set<string>();

  results.forEach((result) => {
    // Extract matching words from title
    const words = result.title
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.includes(query.toLowerCase()));
    words.forEach((word) => suggestions.add(word));

    // Add tags that match
    result.tags?.forEach((tag) => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(tag);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
};

/**
 * Clear search index (useful for testing or rebuilding)
 */
export const clearSearchIndex = (): void => {
  fuseInstance = null;
};

/**
 * Get search statistics
 */
export const getSearchStats = (): {
  totalItems: number;
  byType: Record<SearchResult['type'], number>;
} => {
  const index = buildSearchIndex();
  const byType: Record<SearchResult['type'], number> = {
    project: 0,
    blog: 0,
    skill: 0,
    experience: 0,
  };

  index.forEach((item) => {
    byType[item.type]++;
  });

  return {
    totalItems: index.length,
    byType,
  };
};

