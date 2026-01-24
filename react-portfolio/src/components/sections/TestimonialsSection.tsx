import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TestimonialCarousel } from '@components/testimonials/TestimonialCarousel';
import { getTestimonials, getAverageRating, getTestimonialsCount } from '@/data/testimonialsData';
import styles from './TestimonialsSection.module.css';

/**
 * Testimonials Section Component
 * Displays client testimonials in a carousel format
 */
export const TestimonialsSection = () => {
  const { t } = useTranslation('testimonials');
  const testimonials = getTestimonials();
  const averageRating = getAverageRating();
  const totalCount = getTestimonialsCount();

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="testimonials-heading" className={styles.title}>
            {t('title')}
          </h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{totalCount}+</div>
              <div className={styles.statLabel}>{t('stats.clients')}</div>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <div className={styles.statValue}>
                {averageRating}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.starIcon}
                  aria-hidden="true"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className={styles.statLabel}>{t('stats.rating')}</div>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <div className={styles.statValue}>100%</div>
              <div className={styles.statLabel}>{t('stats.satisfaction')}</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TestimonialCarousel
            testimonials={testimonials}
            autoPlayInterval={5000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className={styles.ctaText}>
            {t('cta.text')}
          </p>
          <a href="#contact" className={styles.ctaButton}>
            {t('cta.button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
