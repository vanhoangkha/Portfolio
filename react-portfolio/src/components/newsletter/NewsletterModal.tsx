import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './NewsletterModal.module.css';

interface NewsletterModalProps {
  email: string;
  onClose: () => void;
}

/**
 * Newsletter Success Modal
 * Displays welcome message after successful subscription
 */
export const NewsletterModal = ({ email, onClose }: NewsletterModalProps) => {
  const { t } = useTranslation('contact');

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="fas fa-times" />
          </button>

          <div className={styles.content}>
            <motion.div
              className={styles.icon}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <i className="fas fa-check-circle" />
            </motion.div>

            <h2 className={styles.title}>
              {t('newsletter.success', 'Successfully Subscribed!')}
            </h2>

            <p className={styles.message}>
              {t(
                'newsletter.welcomeMessage',
                'Thank you for subscribing! We\'ve sent a confirmation email to {{email}}',
                { email }
              )}
            </p>

            <div className={styles.socialLinks}>
              <p className={styles.socialTitle}>
                {t('newsletter.connectTitle', 'Connect with me:')}
              </p>
              <div className={styles.links}>
                <a
                  href="https://github.com/vanhoangkha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitHub"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  href="https://linkedin.com/in/vanhoangkha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin" />
                </a>
                <a
                  href="mailto:khavan.work@gmail.com"
                  className={styles.socialLink}
                  aria-label="Email"
                >
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>

            <button className={styles.doneButton} onClick={onClose}>
              {t('common.close', 'Close')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

