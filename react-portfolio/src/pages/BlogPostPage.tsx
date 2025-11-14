import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from 'react-i18next';
import { useBlogPost } from '@hooks/useBlog';
import { useBlogTranslation } from '@hooks/useBlogTranslation';
import { useThemeStore } from '@store/themeStore';
import { SEO } from '@components/SEO';
import { StructuredData } from '@components/StructuredData';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { CommentsSection } from '@components/comments/CommentsSection';
import { formatDate, getRelativeTime } from '@utils/i18n';
import { generateBlogPostingSchema, generateBreadcrumbSchema } from '@utils/structuredData';
import { incrementViewCount } from '@/services/api/cmsService';
import { useEffect } from 'react';
import styles from './BlogPostPage.module.css';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://yourportfolio.com';

/**
 * Blog Post Page Component
 * Displays a single blog post with markdown content, SEO, and structured data
 */
export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug!);
  const { t } = useTranslation('blog');
  const theme = useThemeStore((state) => state.theme);
  const translated = post ? useBlogTranslation(post) : null;

  // Increment view count when post loads
  useEffect(() => {
    if (post) {
      incrementViewCount(post.id);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error || !post || !translated) {
    return <Navigate to="/blog" replace />;
  }

  const {
    featuredImage,
    author,
    category,
    tags,
    publishedAt,
    updatedAt,
    readTime,
    viewCount,
    seo,
  } = post;

  const { title, excerpt, content, isTranslated, originalLanguage } = translated;

  // Generate structured data
  const blogPostSchema = generateBlogPostingSchema(post, SITE_URL);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  // Generate Open Graph image URL
  const ogImage = featuredImage || `${SITE_URL}/og-default.jpg`;
  const postUrl = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={seo?.metaTitle || title}
        description={seo?.metaDescription || excerpt}
        keywords={seo?.keywords || tags?.join(', ')}
        image={ogImage}
        type="article"
        article={true}
        publishedTime={publishedAt}
        modifiedTime={updatedAt}
        author={author.name}
        url={postUrl}
      />

      {/* Structured Data */}
      <StructuredData data={[blogPostSchema, breadcrumbSchema]} />

      <article className={styles.blogPost}>
        <div className={styles.container}>
          {/* Header */}
          <motion.header
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category */}
            <span className={styles.category}>{category}</span>

            {/* Translation Notice */}
            {!isTranslated && originalLanguage !== 'en' && (
              <motion.div
                className={styles.translationNotice}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-info-circle" />
                <span>
                  {t('translationNotAvailable', { language: originalLanguage.toUpperCase() })}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <h1 className={styles.title}>{title}</h1>

            {/* Metadata */}
            <div className={styles.metadata}>
              {/* Author */}
              <div className={styles.author}>
                <img
                  src={author.avatar}
                  alt={author.name}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{author.name}</span>
                  <span className={styles.authorBio}>{author.bio}</span>
                </div>
              </div>

              {/* Stats */}
              <div className={styles.stats}>
                <time className={styles.date} dateTime={publishedAt}>
                  {formatDate(publishedAt, { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span className={styles.separator}>•</span>
                <span className={styles.readTime}>{readTime} min read</span>
                {viewCount && (
                  <>
                    <span className={styles.separator}>•</span>
                    <span className={styles.views}>{viewCount.toLocaleString()} views</span>
                  </>
                )}
              </div>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.header>

          {/* Featured Image */}
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={featuredImage}
              alt={title}
              className={styles.featuredImage}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { className?: string }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !className;
                  return !isInline && match ? (
                    <SyntaxHighlighter
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      style={(theme === 'dark' ? oneDark : oneLight) as any}
                      language={match[1]}
                      PreTag="div"
                      className={styles.codeBlock}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={styles.inlineCode} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
                h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
                h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
                h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
                p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
                ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
                ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
                li: ({ children }) => <li className={styles.listItem}>{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className={styles.blockquote}>{children}</blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className={styles.link}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>{children}</table>
                  </div>
                ),
                th: ({ children }) => <th className={styles.tableHeader}>{children}</th>,
                td: ({ children }) => <td className={styles.tableCell}>{children}</td>,
              }}
            >
              {content}
            </ReactMarkdown>
          </motion.div>

          {/* Footer */}
          <motion.footer
            className={styles.footer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {updatedAt !== publishedAt && (
              <p className={styles.updatedDate}>
                Last updated: {getRelativeTime(new Date(updatedAt))}
              </p>
            )}
            
            <div className={styles.shareSection}>
              <span className={styles.shareLabel}>Share this post:</span>
              <div className={styles.shareButtons}>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareButton}
                  aria-label="Share on Twitter"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareButton}
                  aria-label="Share on LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shareButton}
                  aria-label="Share on Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* Comments Section */}
        <CommentsSection postId={post.id} />
      </article>
    </>
  );
};
