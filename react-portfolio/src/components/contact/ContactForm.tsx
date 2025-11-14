import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@store/toastStore';
import { submitContactForm } from '@/services/api/contactService';
import { executeRecaptcha, loadRecaptchaScript } from '@/services/recaptcha/recaptchaService';
import { logger } from '@utils/logger';
import type { ContactFormData } from '@/types';
import styles from './ContactForm.module.css';

/**
 * Contact form validation schema
 */
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

/**
 * Contact Form Component
 * Form with validation, reCAPTCHA, and backend integration
 */
export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const { t } = useTranslation('contact');
  const { addToast } = useToastStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  });

  // Load reCAPTCHA on mount
  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
        await loadRecaptchaScript();
        setRecaptchaLoaded(true);
      } catch (error) {
        logger.warn('reCAPTCHA not available, continuing without it:', error);
        setRecaptchaLoaded(false);
      }
    };

    loadRecaptcha();
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Get reCAPTCHA token if available
      let recaptchaToken: string | null = null;
      if (recaptchaLoaded) {
        recaptchaToken = await executeRecaptcha('contact_form_submit');
      }

      // Submit form
      const formData: ContactFormData = {
        ...data,
        recaptchaToken: recaptchaToken || undefined,
      };

      const response = await submitContactForm(formData);

      if (response.success) {
        addToast(t('form.success'), 'success');
        reset();
        onSuccess?.();
      } else {
        addToast(response.message || t('form.error'), 'error');
      }
    } catch (error) {
      logger.error('Contact form submission error:', error);
      addToast(t('form.error'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          {t('form.name.label')}
        </label>
        <input
          id="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder={t('form.name.placeholder')}
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.error} role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          {t('form.email.label')}
        </label>
        <input
          id="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder={t('form.email.placeholder')}
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className={styles.error} role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="subject" className={styles.label}>
          {t('form.subject.label')}
        </label>
        <input
          id="subject"
          type="text"
          className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
          placeholder={t('form.subject.placeholder')}
          {...register('subject')}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <span id="subject-error" className={styles.error} role="alert">
            {errors.subject.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          {t('form.message.label')}
        </label>
        <textarea
          id="message"
          rows={6}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          placeholder={t('form.message.placeholder')}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className={styles.error} role="alert">
            {errors.message.message}
          </span>
        )}
      </div>

      <motion.button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting || !isDirty}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <i className="fas fa-spinner fa-spin" />
            {t('form.sending')}
          </>
        ) : (
          <>
            <i className="fas fa-paper-plane" />
            {t('form.submit')}
          </>
        )}
      </motion.button>

      {!recaptchaLoaded && (
        <p className={styles.recaptchaNote}>
          <i className="fas fa-info-circle" />
          reCAPTCHA protection is not available. Form will still work.
        </p>
      )}
    </motion.form>
  );
};

