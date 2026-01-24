import { motion } from 'framer-motion';
import { OptimizedImage } from '@components/Image';
import type { Testimonial } from '@/types';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

/**
 * Star Rating Component
 */
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className={styles.starRating} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${styles.star} ${star <= rating ? styles.filled : ''}`}
          data-testid="star-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10 1L12.9389 6.90983L19.5106 7.90983L14.7553 12.5902L15.8779 19.0902L10 16L4.12215 19.0902L5.24472 12.5902L0.489435 7.90983L7.06107 6.90983L10 1Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
};

/**
 * Quote Icon Component
 */
const QuoteIcon = () => (
  <svg
    className={styles.quoteIcon}
    width="40"
    height="32"
    viewBox="0 0 40 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0 16C0 7.16344 7.16344 0 16 0V8C11.5817 8 8 11.5817 8 16H16V32H0V16Z"
      fill="currentColor"
      opacity="0.1"
    />
    <path
      d="M24 16C24 7.16344 31.1634 0 40 0V8C35.5817 8 32 11.5817 32 16H40V32H24V16Z"
      fill="currentColor"
      opacity="0.1"
    />
  </svg>
);

/**
 * Testimonial Card Component
 * Displays a single testimonial with author info, rating, and text
 */
export const TestimonialCard = ({ testimonial, index = 0 }: TestimonialCardProps) => {
  const { name, role, company, photo, rating, text, linkedinUrl } = testimonial;

  return (
    <motion.article
      className={styles.testimonialCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <QuoteIcon />

      <div className={styles.content}>
        {/* Rating */}
        <StarRating rating={rating} />

        {/* Testimonial Text */}
        <blockquote className={styles.text}>
          <p>{text}</p>
        </blockquote>

        {/* Author Info */}
        <div className={styles.author}>
          <OptimizedImage
            src={photo}
            alt={name}
            className={styles.photo}
            width={56}
            height={56}
            aspectRatio={1}
            objectFit="cover"
          />
          
          <div className={styles.authorInfo}>
            <cite className={styles.name}>
              {linkedinUrl ? (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nameLink}
                  aria-label={`View ${name}'s LinkedIn profile`}
                >
                  {name}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333M10 2H14M14 2V6M14 2L6.66667 9.33333"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                name
              )}
            </cite>
            <p className={styles.position}>
              {role} at {company}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
