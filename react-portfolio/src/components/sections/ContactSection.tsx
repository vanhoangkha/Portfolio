import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { ContactForm } from '@components/contact/ContactForm';
import styles from './ContactSection.module.css';

export const ContactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation('contact');

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t('title')}</span>
          <h2 className={styles.title}>{t('subtitle')}</h2>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className={styles.description}>{t('description')}</p>
          
          <div className={styles.formWrapper}>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
