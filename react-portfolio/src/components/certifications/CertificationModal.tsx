import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedImage } from '@components/Image';
import type { Certification } from '@/types';
import { formatDate } from '@utils/i18n';
import styles from './CertificationModal.module.css';

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Certification Modal Component
 * Displays full certificate details with image zoom
 */
export const CertificationModal = ({
  certification,
  isOpen,
  onClose,
}: CertificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus close button for accessibility
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!certification) return null;

  const {
    name,
    issuer,
    issueDate,
    expiryDate,
    credentialId,
    credentialUrl,
    certificateImage,
    category,
    skills,
    description,
  } = certification;

  const categoryLabels = {
    technical: 'Technical',
    professional: 'Professional',
    language: 'Language',
    other: 'Other',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className={styles.content}>
              {/* Certificate Image */}
              <div className={styles.imageSection}>
                <OptimizedImage
                  src={certificateImage}
                  alt={`${name} certificate`}
                  className={styles.image}
                  objectFit="contain"
                  priority
                />
              </div>

              {/* Details Section */}
              <div className={styles.detailsSection}>
                {/* Category Badge */}
                <span className={styles.categoryBadge}>
                  {categoryLabels[category]}
                </span>

                {/* Title */}
                <h2 id="modal-title" className={styles.title}>
                  {name}
                </h2>

                {/* Issuer */}
                <p className={styles.issuer}>{issuer}</p>

                {/* Description */}
                {description && (
                  <p className={styles.description}>{description}</p>
                )}

                {/* Info Grid */}
                <div className={styles.infoGrid}>
                  {/* Issue Date */}
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="3" y="4" width="14" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M3 7H17M6 2V4M14 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Issue Date
                    </div>
                    <div className={styles.infoValue}>
                      {formatDate(issueDate, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>

                  {/* Expiry Date */}
                  {expiryDate && (
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Expiry Date
                      </div>
                      <div className={styles.infoValue}>
                        {formatDate(expiryDate, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  )}

                  {/* Credential ID */}
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2L12 7L17 7.5L13 11L14 17L10 14L6 17L7 11L3 7.5L8 7L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                      Credential ID
                    </div>
                    <div className={styles.infoValue}>{credentialId}</div>
                  </div>
                </div>

                {/* Skills */}
                {skills && skills.length > 0 && (
                  <div className={styles.skillsSection}>
                    <h3 className={styles.skillsTitle}>Skills Covered</h3>
                    <div className={styles.skills}>
                      {skills.map((skill) => (
                        <span key={skill} className={styles.skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                  {credentialUrl && (
                    <a
                      href={credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.verifyButton}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2L12 7L17 7.5L13 11L14 17L10 14L6 17L7 11L3 7.5L8 7L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                      Verify Credential
                    </a>
                  )}
                  <button onClick={onClose} className={styles.closeButtonBottom}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
