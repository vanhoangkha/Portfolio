import { motion } from 'framer-motion';
import type { BlogPost } from '@/types';
import styles from './BlogList.module.css';

interface BlogListProps {
  posts: BlogPost[];
  loading?: boolean;
  error?: string | null;
  layout?: 'grid' | 'list';
  showFeatured?: boolean;
}

/**
 * Blog List Component
 * Displays a list of blog posts in grid or list layout
 */
export const BlogList = ({
  posts,
  loading = false,
  error = null,
  layout = 'grid',
  showFeatured: _showFeatured = false,
}: BlogListProps) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No posts found</p>
      </div>
    );
  }

  return (
    <div className={`${styles.list} ${styles[layout]}`}>
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          className={styles.post}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </motion.article>
      ))}
    </div>
  );
};

