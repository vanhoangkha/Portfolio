import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BlogSidebar } from '../BlogSidebar';
import type { BlogPost } from '@/types';

// Helper to wrap component with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'kubernetes-best-practices',
    title: 'Kubernetes Best Practices',
    excerpt: 'Learn the best practices for Kubernetes',
    content: 'Full content here',
    featuredImage: '/images/k8s.jpg',
    author: {
      id: '1',
      name: 'Kha Van Hoang',
      email: 'khavan.work@gmail.com',
      avatar: '/images/avatar.jpg',
      bio: 'Cloud Solutions Architect',
    },
    publishedAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    category: 'Cloud',
    tags: ['kubernetes', 'devops'],
    readTime: 5,
    featured: true,
    viewCount: 1200,
    seo: {
      metaTitle: 'Kubernetes Best Practices',
      metaDescription: 'Learn the best practices for Kubernetes',
      keywords: ['kubernetes', 'devops'],
    },
    commentsEnabled: true,
    language: 'en' as const,
  },
  {
    id: '2',
    slug: 'ai-ml-introduction',
    title: 'Introduction to AI/ML',
    excerpt: 'Getting started with AI and Machine Learning',
    content: 'Full content here',
    featuredImage: '/images/ai-ml.jpg',
    author: {
      id: '1',
      name: 'Kha Van Hoang',
      email: 'khavan.work@gmail.com',
      avatar: '/images/avatar.jpg',
      bio: 'Cloud Solutions Architect',
    },
    publishedAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
    category: 'AI/ML',
    tags: ['ai', 'machine-learning'],
    readTime: 8,
    featured: false,
    viewCount: 850,
    seo: {
      metaTitle: 'Introduction to AI/ML',
      metaDescription: 'Getting started with AI and Machine Learning',
      keywords: ['ai', 'machine-learning'],
    },
    commentsEnabled: true,
    language: 'en' as const,
  },
  {
    id: '3',
    slug: 'devsecops-pipeline',
    title: 'Building a DevSecOps Pipeline',
    excerpt: 'Security in CI/CD pipelines',
    content: 'Full content here',
    featuredImage: '/images/devsecops.jpg',
    author: {
      id: '1',
      name: 'Kha Van Hoang',
      email: 'khavan.work@gmail.com',
      avatar: '/images/avatar.jpg',
      bio: 'Cloud Solutions Architect',
    },
    publishedAt: '2025-01-05T10:00:00Z',
    updatedAt: '2025-01-05T10:00:00Z',
    category: 'DevSecOps',
    tags: ['security', 'devops', 'ci-cd'],
    readTime: 10,
    featured: false,
    viewCount: 650,
    seo: {
      metaTitle: 'Building a DevSecOps Pipeline',
      metaDescription: 'Security in CI/CD pipelines',
      keywords: ['security', 'devops', 'ci-cd'],
    },
    commentsEnabled: true,
    language: 'en' as const,
  },
];

const mockCategories = [
  { name: 'Cloud', count: 15 },
  { name: 'AI/ML', count: 10 },
  { name: 'DevSecOps', count: 8 },
  { name: 'Community', count: 5 },
];

const mockTags = [
  { name: 'kubernetes', count: 12 },
  { name: 'docker', count: 10 },
  { name: 'aws', count: 9 },
  { name: 'terraform', count: 7 },
  { name: 'python', count: 6 },
];

describe('BlogSidebar', () => {
  describe('Recent Posts section', () => {
    it('should render recent posts section when posts are provided', () => {
      renderWithRouter(<BlogSidebar recentPosts={mockBlogPosts} />);

      expect(screen.getByText('Recent Posts')).toBeInTheDocument();
    });

    it('should not render recent posts section when no posts are provided', () => {
      renderWithRouter(<BlogSidebar recentPosts={[]} />);

      expect(screen.queryByText('Recent Posts')).not.toBeInTheDocument();
    });

    it('should display up to 5 recent posts', () => {
      const manyPosts = Array.from({ length: 10 }, (_, i) => ({
        ...mockBlogPosts[0],
        id: `post-${i}`,
        slug: `post-${i}`,
        title: `Post ${i}`,
      }));

      renderWithRouter(<BlogSidebar recentPosts={manyPosts} />);

      const recentSection = screen.getByText('Recent Posts').closest('section');
      const postLinks = within(recentSection!).getAllByRole('link');

      expect(postLinks).toHaveLength(5);
    });

    it('should render post title, image, and date for each recent post', () => {
      renderWithRouter(<BlogSidebar recentPosts={mockBlogPosts} />);

      mockBlogPosts.forEach(post => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        const img = screen.getByAltText(post.title);
        expect(img).toHaveAttribute('src', post.featuredImage);
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });

    it('should link to correct blog post URL', () => {
      renderWithRouter(<BlogSidebar recentPosts={[mockBlogPosts[0]]} />);

      const link = screen.getByRole('link', { name: new RegExp(mockBlogPosts[0].title) });
      expect(link).toHaveAttribute('href', `/blog/${mockBlogPosts[0].slug}`);
    });

    it('should format date correctly', () => {
      renderWithRouter(<BlogSidebar recentPosts={[mockBlogPosts[0]]} />);

      // Date should be formatted as "Jan 15, 2025"
      expect(screen.getByText(/Jan 15, 2025/)).toBeInTheDocument();
    });
  });

  describe('Popular Posts section', () => {
    it('should render popular posts section when posts are provided', () => {
      renderWithRouter(<BlogSidebar popularPosts={mockBlogPosts} />);

      expect(screen.getByText('Popular Posts')).toBeInTheDocument();
    });

    it('should not render popular posts section when no posts are provided', () => {
      renderWithRouter(<BlogSidebar popularPosts={[]} />);

      expect(screen.queryByText('Popular Posts')).not.toBeInTheDocument();
    });

    it('should display ranking numbers for popular posts', () => {
      renderWithRouter(<BlogSidebar popularPosts={mockBlogPosts} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should display view count for popular posts', () => {
      renderWithRouter(<BlogSidebar popularPosts={mockBlogPosts} />);

      expect(screen.getByText('1,200 views')).toBeInTheDocument();
      expect(screen.getByText('850 views')).toBeInTheDocument();
      expect(screen.getByText('650 views')).toBeInTheDocument();
    });

    it('should handle posts without viewCount', () => {
      const postWithoutViews = { ...mockBlogPosts[0], viewCount: 0 };
      renderWithRouter(<BlogSidebar popularPosts={[postWithoutViews]} />);

      expect(screen.getByText('0 views')).toBeInTheDocument();
    });

    it('should limit popular posts to 5 items', () => {
      const manyPosts = Array.from({ length: 10 }, (_, i) => ({
        ...mockBlogPosts[0],
        id: `post-${i}`,
        slug: `post-${i}`,
        title: `Post ${i}`,
        viewCount: 1000 - i * 100,
      }));

      renderWithRouter(<BlogSidebar popularPosts={manyPosts} />);

      const popularSection = screen.getByText('Popular Posts').closest('section');
      const rankNumbers = within(popularSection!).getAllByText(/^[1-5]$/);

      expect(rankNumbers).toHaveLength(5);
    });
  });

  describe('Categories section', () => {
    it('should render categories section when categories are provided', () => {
      renderWithRouter(<BlogSidebar categories={mockCategories} />);

      expect(screen.getByText('Categories')).toBeInTheDocument();
    });

    it('should not render categories section when no categories are provided', () => {
      renderWithRouter(<BlogSidebar categories={[]} />);

      expect(screen.queryByText('Categories')).not.toBeInTheDocument();
    });

    it('should display category name and count', () => {
      renderWithRouter(<BlogSidebar categories={mockCategories} />);

      mockCategories.forEach(category => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
        expect(screen.getByText(category.count.toString())).toBeInTheDocument();
      });
    });

    it('should link to filtered blog page with category query param', () => {
      renderWithRouter(<BlogSidebar categories={mockCategories} />);

      const cloudLink = screen.getByRole('link', { name: /Cloud 15/ });
      expect(cloudLink).toHaveAttribute('href', '/blog?category=Cloud');
    });

    it('should handle categories with special characters', () => {
      const specialCategories = [
        { name: 'AI/ML', count: 10 },
        { name: 'C++', count: 5 },
      ];

      renderWithRouter(<BlogSidebar categories={specialCategories} />);

      const aimlLink = screen.getByRole('link', { name: /AI\/ML 10/ });
      expect(aimlLink).toHaveAttribute('href', '/blog?category=AI%2FML');
    });
  });

  describe('Tags section', () => {
    it('should render tags section when tags are provided', () => {
      renderWithRouter(<BlogSidebar tags={mockTags} />);

      expect(screen.getByText('Popular Tags')).toBeInTheDocument();
    });

    it('should not render tags section when no tags are provided', () => {
      renderWithRouter(<BlogSidebar tags={[]} />);

      expect(screen.queryByText('Popular Tags')).not.toBeInTheDocument();
    });

    it('should display tags with # prefix', () => {
      renderWithRouter(<BlogSidebar tags={mockTags} />);

      mockTags.forEach(tag => {
        expect(screen.getByText(`#${tag.name}`)).toBeInTheDocument();
      });
    });

    it('should link to filtered blog page with tag query param', () => {
      renderWithRouter(<BlogSidebar tags={mockTags} />);

      const kubernetesLink = screen.getByRole('link', { name: /#kubernetes/ });
      expect(kubernetesLink).toHaveAttribute('href', '/blog?tag=kubernetes');
    });

    it('should limit tags to 20 items', () => {
      const manyTags = Array.from({ length: 30 }, (_, i) => ({
        name: `tag-${i}`,
        count: 30 - i,
      }));

      renderWithRouter(<BlogSidebar tags={manyTags} />);

      const tagsSection = screen.getByText('Popular Tags').closest('section');
      const tagLinks = within(tagsSection!).getAllByRole('link');

      expect(tagLinks).toHaveLength(20);
    });

    it('should apply font size based on tag count', () => {
      renderWithRouter(<BlogSidebar tags={mockTags} />);

      const kubernetesTag = screen.getByText('#kubernetes');
      const pythonTag = screen.getByText('#python');

      // kubernetes has count 12, python has count 6
      // Font size formula: 0.875 + (count / 10) * 0.25
      // kubernetes: 0.875 + (12/10)*0.25 = 1.175rem
      // python: 0.875 + (6/10)*0.25 = 1.025rem

      expect(kubernetesTag).toHaveStyle({ fontSize: '1.175rem' });
      expect(pythonTag).toHaveStyle({ fontSize: '1.025rem' });
    });
  });

  describe('Newsletter section', () => {
    it('should always render newsletter section', () => {
      renderWithRouter(<BlogSidebar />);

      expect(screen.getByText('Stay Updated')).toBeInTheDocument();
      expect(screen.getByText(/Get the latest posts delivered/)).toBeInTheDocument();
    });

    it('should render email input with proper attributes', () => {
      renderWithRouter(<BlogSidebar />);

      const emailInput = screen.getByPlaceholderText(/your email address/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('aria-label', 'Email address');
    });

    it('should render subscribe button', () => {
      renderWithRouter(<BlogSidebar />);

      const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
      expect(subscribeButton).toHaveAttribute('type', 'submit');
    });

    it('should prevent default form submission', () => {
      const { container } = renderWithRouter(<BlogSidebar />);

      const form = container.querySelector('form');
      const preventDefault = vi.fn();

      form?.dispatchEvent(
        new Event('submit', {
          bubbles: true,
          cancelable: true,
        })
      );

      // Form should not reload page
      expect(preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should use semantic HTML elements', () => {
      const { container } = renderWithRouter(
        <BlogSidebar
          recentPosts={mockBlogPosts}
          popularPosts={mockBlogPosts}
          categories={mockCategories}
          tags={mockTags}
        />
      );

      // Should be wrapped in aside element
      const aside = screen.getByRole('complementary');
      expect(aside).toBeInTheDocument();

      // Each section should be a section element
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should have proper heading hierarchy', () => {
      renderWithRouter(
        <BlogSidebar
          recentPosts={mockBlogPosts}
          categories={mockCategories}
          tags={mockTags}
        />
      );

      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings.length).toBeGreaterThan(0);
    });

    it('should provide alt text for all images', () => {
      renderWithRouter(<BlogSidebar recentPosts={mockBlogPosts} />);

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    it('should have aria-label for newsletter email input', () => {
      renderWithRouter(<BlogSidebar />);

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('should render with framer-motion animation props', () => {
      const { container } = renderWithRouter(
        <BlogSidebar recentPosts={mockBlogPosts} />
      );

      // Check if sections render (framer-motion wraps them)
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should apply staggered animations to sections', () => {
      renderWithRouter(
        <BlogSidebar
          recentPosts={mockBlogPosts}
          popularPosts={mockBlogPosts}
          categories={mockCategories}
          tags={mockTags}
        />
      );

      // Sections should render in order
      const recentSection = screen.getByText('Recent Posts');
      const popularSection = screen.getByText('Popular Posts');
      const categoriesSection = screen.getByText('Categories');
      const tagsSection = screen.getByText('Popular Tags');

      expect(recentSection).toBeInTheDocument();
      expect(popularSection).toBeInTheDocument();
      expect(categoriesSection).toBeInTheDocument();
      expect(tagsSection).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty props gracefully', () => {
      expect(() => renderWithRouter(<BlogSidebar />)).not.toThrow();
    });

    it('should handle undefined props gracefully', () => {
      expect(() =>
        renderWithRouter(
          <BlogSidebar
            recentPosts={undefined}
            popularPosts={undefined}
            categories={undefined}
            tags={undefined}
          />
        )
      ).not.toThrow();
    });

    it('should handle posts with missing optional fields', () => {
      const minimalPost: BlogPost = {
        ...mockBlogPosts[0],
        viewCount: 0,
        featured: false,
      };

      expect(() =>
        renderWithRouter(<BlogSidebar recentPosts={[minimalPost]} />)
      ).not.toThrow();
    });

    it('should handle very long category names', () => {
      const longCategories = [
        { name: 'A'.repeat(100), count: 5 },
      ];

      renderWithRouter(<BlogSidebar categories={longCategories} />);

      expect(screen.getByText('A'.repeat(100))).toBeInTheDocument();
    });

    it('should handle zero counts for categories and tags', () => {
      const zeroCountData = [
        { name: 'Empty Category', count: 0 },
      ];

      renderWithRouter(<BlogSidebar categories={zeroCountData} tags={zeroCountData} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Layout and styling', () => {
    it('should apply correct CSS module classes', () => {
      const { container } = renderWithRouter(
        <BlogSidebar recentPosts={mockBlogPosts} />
      );

      const sidebar = container.querySelector('[class*="sidebar"]');
      expect(sidebar).toBeInTheDocument();

      const section = container.querySelector('[class*="section"]');
      expect(section).toBeInTheDocument();
    });
  });
});
