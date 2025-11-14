import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Certification } from '@/types';
import { formatDate } from '@utils/i18n';
import styles from './CertificationCard.module.css';

interface CertificationCardProps {
  certification: Certification;
  index?: number;
  onViewDetails?: (certification: Certification) => void;
}

/**
 * Category Badge Component
 */
const CategoryBadge = ({ category }: { category: Certification['category'] }) => {
  const categoryLabels = {
    technical: 'Technical',
    professional: 'Professional',
    language: 'Language',
    other: 'Other',
  };

  const categoryColors = {
    technical: '#3b82f6', // Blue
    professional: '#8b5cf6', // Purple
    language: '#10b981', // Green
    other: '#6b7280', // Gray
  };

  return (
    <span
      className={styles.categoryBadge}
      style={{ backgroundColor: categoryColors[category] }}
    >
      {categoryLabels[category]}
    </span>
  );
};

/**
 * Expiry Warning Component
 */
const ExpiryWarning = ({ expiryDate }: { expiryDate?: string }) => {
  if (!expiryDate) return null;

  const now = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry < 0) {
    return (
      <div className={`${styles.expiryWarning} ${styles.expired}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1L1 15H15L8 1Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="12" r="0.5" fill="currentColor" />
        </svg>
        Expired
      </div>
    );
  }

  if (daysUntilExpiry <= 30) {
    return (
      <div className={`${styles.expiryWarning} ${styles.expiringSoon}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Expires in {daysUntilExpiry} days
      </div>
    );
  }

  return null;
};

/**
 * Certification Card Component
 */
export const CertificationCard = ({
  certification,
  index = 0,
  onViewDetails,
}: CertificationCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { name, issuer, issueDate, expiryDate, category, skills, credentialUrl } = certification;

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(certification);
    }
  };

  return (
    <motion.article
      className={styles.certificationCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      {/* Category Badge */}
      <CategoryBadge category={category} />

      {/* Certificate Image */}
      <div className={styles.imageContainer}>
        {!imageError ? (
          <img
            src={certification.certificateImage}
            alt={`${name} certificate`}
            className={styles.image}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="12" width="48" height="40" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M20 28H44M20 36H44M20 44H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="32" cy="20" r="4" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.issuer}>{issuer}</p>

        {/* Dates */}
        <div className={styles.dates}>
          <div className={styles.date}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 6H14M5 1V3M11 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Issued: {formatDate(issueDate, { year: 'numeric', month: 'short' })}</span>
          </div>
          {expiryDate && (
            <div className={styles.date}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Expires: {formatDate(expiryDate, { year: 'numeric', month: 'short' })}</span>
            </div>
          )}
        </div>

        {/* Expiry Warning */}
        <ExpiryWarning expiryDate={expiryDate} />

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className={styles.skills}>
            {skills.slice(0, 3).map((skill) => (
              <span key={skill} className={styles.skill}>
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className={styles.skill}>+{skills.length - 3}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button onClick={handleViewDetails} className={styles.viewButton}>
            View Details
          </button>
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.verifyLink}
              aria-label="Verify credential"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L10 5L14.5 5.5L11 9L12 14L8 11.5L4 14L5 9L1.5 5.5L6 5L8 1Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              Verify
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
