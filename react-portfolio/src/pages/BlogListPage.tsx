import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBlogPosts } from '@hooks/useBlog';
import { SEO } from '@components/SEO';
import { StructuredData } from '@components/StructuredData';
import { BlogList, BlogFilters, BlogSidebar } from '@components/blog';
import { generateWebSiteSchema, generateBreadcrumbSchema } from '@utils/structuredData';
import styles from './BlogListPage.module.css';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://yourportfolio.com';

/**
 * Blog List Page Component
 * Displays all blog posts with filtering, search, and sidebar
 */
export const BlogListPage = () => {
  const { data: posts = [], isLoading, error } = useBlogPosts();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'oldest'>('latest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Extract categories and tags
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    posts.forEach((post) => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
  }, [posts]);

  const tags = useMemo(() => {
    const tagMap = new Map<string, number>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        const count = tagMap.get(tag) || 0;
        tagMap.set(tag, count + 1);
      });
    });
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return (b.viewCount || 0) - (a.viewCount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchQuery, selectedCategory, sortBy]);

  // Get recent and popular posts for sidebar
  const recentPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5);
  }, [posts]);

  const popularPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 5);
  }, [posts]);

  // Generate structured data
  const websiteSchema = generateWebSiteSchema(SITE_URL, 'Kha Van Hoang Portfolio');
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ]);

  return (
    <>
      {/* SEO */}
      <SEO
        title="Blog"
        description="Read articles about web development, programming, and technology. Learn from tutorials, guides, and insights."
        keywords={['blog', 'web development', 'programming', 'tutorials', 'technology']}
        url={`${SITE_URL}/blog`}
        type="website"
      />

      {/* Structured Data */}
      <StructuredData data={[websiteSchema, breadcrumbSchema]} />

      <div className={styles.blogPage}>
        <div className={styles.container}>
          {/* Header */}
          <motion.header
            className={styles.header}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.title}>Blog</h1>
            <p className={styles.subtitle}>
              Thoughts, tutorials, and insights about web development and technology
            </p>
          </motion.header>

          <div className={styles.content}>
            {/* Main Content */}
            <main className={styles.main}>
              {/* Filters */}
              <BlogFilters
                categories={['all', ...categories.map((c) => c.name)]}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                layout={layout}
                onLayoutChange={setLayout}
              />

              {/* Results Count */}
              {!isLoading && (
                <motion.div
                  className={styles.resultsCount}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </motion.div>
              )}

              {/* Blog List */}
              <BlogList
                posts={filteredPosts}
                loading={isLoading}
                error={error?.message}
                layout={layout}
                showFeatured={selectedCategory === 'all' && !searchQuery}
              />
            </main>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <BlogSidebar
                recentPosts={recentPosts}
                popularPosts={popularPosts}
                categories={categories}
                tags={tags}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};
