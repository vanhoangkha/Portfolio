import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { CommentFormData } from '@/types';
import styles from './CommentForm.module.css';

/**
 * Comment form validation schema
 */
const commentFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  content: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(5000, 'Comment must be less than 5000 characters'),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => Promise<void>;
  onCancel?: () => void;
  parentId?: string;
  isSubmitting?: boolean;
  placeholder?: string;
}

/**
 * Comment Form Component
 * Form for submitting new comments or replies
 */
export const CommentForm = ({
  onSubmit,
  onCancel,
  parentId,
  isSubmitting = false,
  placeholder,
}: CommentFormProps) => {
  const { t } = useTranslation('blog');
  const [showWebsite, setShowWebsite] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    mode: 'onBlur',
  });

  const handleFormSubmit = async (data: CommentFormValues) => {
    const formData: CommentFormData = {
      name: data.name,
      email: data.email,
      website: data.website || undefined,
      content: data.content,
      parentId: parentId || undefined,
    };

    await onSubmit(formData);
    reset();
    onCancel?.();
  };

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder={t('comments.name', 'Your Name')}
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className={styles.error} role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder={t('comments.email', 'Your Email')}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className={styles.error} role="alert">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      {showWebsite && (
        <motion.div
          className={styles.formGroup}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <input
            type="url"
            className={`${styles.input} ${errors.website ? styles.inputError : ''}`}
            placeholder={t('comments.website', 'Website (optional)')}
            {...register('website')}
            aria-invalid={errors.website ? 'true' : 'false'}
            disabled={isSubmitting}
          />
          {errors.website && (
            <span className={styles.error} role="alert">
              {errors.website.message}
            </span>
          )}
        </motion.div>
      )}

      <div className={styles.formGroup}>
        <textarea
          className={`${styles.textarea} ${errors.content ? styles.inputError : ''}`}
          placeholder={placeholder || t('comments.writeComment', 'Write a comment...')}
          rows={5}
          {...register('content')}
          aria-invalid={errors.content ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.content && (
          <span className={styles.error} role="alert">
            {errors.content.message}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => setShowWebsite(!showWebsite)}
          disabled={isSubmitting}
        >
          {showWebsite ? t('comments.hideWebsite', 'Hide Website') : t('comments.addWebsite', 'Add Website')}
        </button>

        <div className={styles.submitActions}>
          {onCancel && (
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('comments.cancel', 'Cancel')}
            </button>
          )}
          <motion.button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                {t('comments.submitting', 'Submitting...')}
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane" />
                {t('comments.submit', 'Post Comment')}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

