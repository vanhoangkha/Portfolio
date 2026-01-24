import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAuthStore } from '@store/authStore';
import { useToastStore } from '@store/toastStore';
import { logger } from '@utils/logger';
import { SEO } from '@components/SEO';
import styles from './LoginPage.module.css';

/**
 * Login form validation schema
 */
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Admin Login Page
 * Authentication page for admin access
 */
export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuthStore();
  const { addToast } = useToastStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = (location.state as { from?: string })?.from || '/admin/dashboard';
    navigate(from, { replace: true });
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      await login({ email: data.email, password: data.password });
      const from = (location.state as { from?: string })?.from || '/admin/dashboard';
      addToast('Login successful!', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      logger.error('Login failed:', error);
      addToast(
        error instanceof Error ? error.message : 'Login failed. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Admin authentication" noindex />
      
      <div className={styles.container}>
        <motion.div
          className={styles.loginCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.header}>
            <div className={styles.logo}>
              <i className="fas fa-shield-alt" />
            </div>
            <h1 className={styles.title}>Admin Login</h1>
            <p className={styles.subtitle}>Sign in to access the admin panel</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="admin@example.com"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                autoComplete="email"
                autoFocus
              />
              {errors.email && (
                <span className={styles.error} role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder="Enter your password"
                {...register('password')}
                aria-invalid={errors.password ? 'true' : 'false'}
                autoComplete="current-password"
              />
              {errors.password && (
                <span className={styles.error} role="alert">
                  {errors.password.message}
                </span>
              )}
            </div>

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
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          <div className={styles.footer}>
            <p className={styles.securityNote}>
              <i className="fas fa-lock" />
              Secure admin access
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

