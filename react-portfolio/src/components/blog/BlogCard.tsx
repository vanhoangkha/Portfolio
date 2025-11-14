import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBlogTranslation } from '@hooks/useBlogTranslation';
import type { BlogPost } from '@/types';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogPost;
  layout?: 'grid' | 'list';
}

/**
 * Blog Card Component
 * Displays a single blog post card with translation support
 */
export const BlogCard = ({ post, layout = 'grid' }: BlogCardProps) => {
  const { t } = useTranslation('blog');
  const translated = useBlogTranslation(post);
  const { title, excerpt, isTranslated, originalLanguage } = translated;

  return (
    <motion.article
      className={`${styles.card} ${styles[layout]}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/blog/${post.slug}`} className={styles.link}>
        <img src={post.featuredImage} alt={title} className={styles.image} />
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.category}>{post.category}</span>
            {!isTranslated && originalLanguage !== 'en' && (
              <span className={styles.languageBadge} title={t('originalLanguage')}>
                {originalLanguage.toUpperCase()}
              </span>
            )}
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
          <div className={styles.meta}>
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
            <span>{t('readTime', { minutes: post.readTime })}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

