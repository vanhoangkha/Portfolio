import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CertificationCard } from '@components/certifications/CertificationCard';
import { CertificationFilter } from '@components/certifications/CertificationFilter';
import { CertificationModal } from '@components/certifications/CertificationModal';
import {
  getCertifications,
  getCertificationsByCategory,
  getCertificationsCategoryCounts,
} from '@/data/certificationsData';
import type { Certification } from '@/types';
import styles from './CertificationsSection.module.css';

/**
 * Certifications Section Component
 * Displays professional certifications with filtering and modal view
 */
export const CertificationsSection = () => {
  const { t } = useTranslation('certifications');
  const [selectedCategory, setSelectedCategory] = useState<Certification['category'] | 'all'>('all');
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allCertifications = getCertifications();
  const categoryCounts = getCertificationsCategoryCounts();

  // Get filtered certifications
  const filteredCertifications =
    selectedCategory === 'all'
      ? allCertifications
      : getCertificationsByCategory(selectedCategory);

  const handleViewDetails = (certification: Certification) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected certification for smooth exit animation
    setTimeout(() => setSelectedCertification(null), 300);
  };

  return (
    <section id="certifications" className={styles.section} aria-labelledby="certifications-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="certifications-heading" className={styles.title}>
            {t('title')}
          </h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CertificationFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categoryCounts={categoryCounts}
          />
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredCertifications.length > 0 ? (
            filteredCertifications.map((certification, index) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                index={index}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="12" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M20 28H44M20 36H44M20 44H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p>{t('emptyState.description')}</p>
            </div>
          )}
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

      {/* Certification Modal */}
      <CertificationModal
        certification={selectedCertification}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
