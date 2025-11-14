import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@store/toastStore';
import { subscribeToNewsletter } from '@/services/api/newsletterService';
import { logger } from '@utils/logger';
import { NewsletterModal } from './NewsletterModal';
import type { NewsletterSubscription } from '@/types';
import styles from './NewsletterForm.module.css';

/**
 * Newsletter form validation schema
 */
const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy to subscribe',
  }),
});

type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

interface NewsletterFormProps {
  source?: NewsletterSubscription['source'];
  variant?: 'inline' | 'compact';
  onSuccess?: () => void;
}

/**
 * Newsletter Form Component
 * Email subscription form with GDPR consent
 */
export const NewsletterForm = ({
  source = 'footer',
  variant = 'inline',
  onSuccess,
}: NewsletterFormProps) => {
  const { t } = useTranslation('contact');
  const { addToast } = useToastStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    mode: 'onBlur',
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);

    try {
      const subscription: NewsletterSubscription = {
        email: data.email,
        consent: data.consent,
        source,
      };

      const response = await subscribeToNewsletter(subscription);

      if (response.success) {
        setSubscribedEmail(data.email);
        setShowModal(true);
        reset();
        onSuccess?.();
      } else {
        // Handle duplicate subscription
        if (response.message.toLowerCase().includes('already subscribed')) {
          addToast(t('newsletter.alreadySubscribed', 'You are already subscribed!'), 'info');
        } else {
          addToast(response.message || t('newsletter.error'), 'error');
        }
      }
    } catch (error) {
      logger.error('Newsletter subscription error:', error);
      addToast(t('newsletter.error'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.form
        className={`${styles.form} ${styles[variant]}`}
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.inputGroup}>
          <input
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder={t('newsletter.placeholder', 'Enter your email')}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
            aria-label={t('newsletter.subscribe', 'Subscribe')}
          >
            {isSubmitting ? (
              <i className="fas fa-spinner fa-spin" />
            ) : (
              <i className="fas fa-paper-plane" />
            )}
            {variant === 'inline' && (
              <span>{t('newsletter.subscribe', 'Subscribe')}</span>
            )}
          </button>
        </div>

        {errors.email && (
          <span id="email-error" className={styles.error} role="alert">
            {errors.email.message}
          </span>
        )}

        <div className={styles.consentGroup}>
          <label className={styles.consentLabel}>
            <input
              type="checkbox"
              {...register('consent')}
              className={styles.checkbox}
              aria-invalid={errors.consent ? 'true' : 'false'}
            />
            <span className={styles.consentText}>
              {t('newsletter.consent', 'I agree to the')}{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.privacyLink}
              >
                {t('newsletter.privacyPolicy', 'Privacy Policy')}
              </a>
            </span>
          </label>
          {errors.consent && (
            <span className={styles.error} role="alert">
              {errors.consent.message}
            </span>
          )}
        </div>

        <p className={styles.privacyNote}>
          <i className="fas fa-shield-alt" />
          {t('newsletter.privacy', 'We respect your privacy. Unsubscribe anytime.')}
        </p>
      </motion.form>

      {showModal && (
        <NewsletterModal
          email={subscribedEmail}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

