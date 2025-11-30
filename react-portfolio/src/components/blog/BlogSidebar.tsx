import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NewsletterForm } from '@components/newsletter/NewsletterForm';
import { OptimizedImage } from '@components/Image';
import type { BlogPost } from '@/types';
import styles from './BlogSidebar.module.css';

interface BlogSidebarProps {
  recentPosts?: BlogPost[];
  popularPosts?: BlogPost[];
  categories?: Array<{ name: string; count: number }>;
  tags?: Array<{ name: string; count: number }>;
}

/**
 * Blog Sidebar Component
 * Displays recent posts, popular posts, categories, and tags
 */
export const BlogSidebar = ({
  recentPosts = [],
  popularPosts = [],
  categories = [],
  tags = [],
}: BlogSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className={styles.sectionTitle}>Recent Posts</h3>
          <div className={styles.postList}>
            {recentPosts.slice(0, 5).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={styles.postItem}
              >
                <div className={styles.postImage}>
                  <OptimizedImage
                    src={post.featuredImage}
                    alt={post.title}
                    aspectRatio={16 / 9}
                    objectFit="cover"
                  />
                </div>
                <div className={styles.postInfo}>
                  <h4 className={styles.postTitle}>{post.title}</h4>
                  <time className={styles.postDate}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className={styles.sectionTitle}>Popular Posts</h3>
          <div className={styles.postList}>
            {popularPosts.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={styles.postItem}
              >
                <span className={styles.postRank}>{index + 1}</span>
                <div className={styles.postInfo}>
                  <h4 className={styles.postTitle}>{post.title}</h4>
                  <div className={styles.postStats}>
                    <span>{post.viewCount?.toLocaleString() || 0} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className={styles.sectionTitle}>Categories</h3>
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/blog?category=${encodeURIComponent(category.name)}`}
                className={styles.categoryItem}
              >
                <span className={styles.categoryName}>{category.name}</span>
                <span className={styles.categoryCount}>{category.count}</span>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className={styles.sectionTitle}>Popular Tags</h3>
          <div className={styles.tagCloud}>
            {tags.slice(0, 20).map((tag) => (
              <Link
                key={tag.name}
                to={`/blog?tag=${encodeURIComponent(tag.name)}`}
                className={styles.tagItem}
                style={{
                  fontSize: `${0.875 + (tag.count / 10) * 0.25}rem`,
                }}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Newsletter Signup */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>Stay Updated</h3>
          <p className={styles.newsletterDescription}>
            Get the latest posts delivered right to your inbox.
          </p>
          <NewsletterForm source="blog" variant="compact" />
        </div>
      </motion.section>
    </aside>
  );
};
