import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from '@components/TypeAnimation';
import { reserveSpace } from '@utils/performanceOptimizations';
import styles from './HeroSection.module.css';

export const HeroSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation('home');

  const phrases = t('hero.titles', { returnObjects: true }) as string[];

  // Reserve space to prevent CLS
  useEffect(() => {
    if (sectionRef.current) {
      // Reserve minimum height for hero section to prevent layout shift
      reserveSpace(sectionRef.current, 600);
    }
  }, []);

  // Combined ref callback
  const setRefs = (node: HTMLElement | null) => {
    sectionRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref && node) {
      (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  };

  return (
    <section id="home" className={styles.hero} ref={setRefs}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.greeting}>
            <span className={styles.wave}>👋</span> {t('hero.greeting')}
          </div>

          <h1 className={styles.title}>{t('hero.name')}</h1>

          <div className={styles.subtitle}>
            <TypeAnimation phrases={phrases} />
          </div>

          <p className={styles.description}>
            {t('hero.description')}
          </p>

          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>50K+</span>
              <span className={styles.metricLabel}>{t('hero.metrics.professionals')}</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>100+</span>
              <span className={styles.metricLabel}>{t('hero.metrics.projects')}</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>7</span>
              <span className={styles.metricLabel}>{t('hero.metrics.certifications')}</span>
            </div>
          </div>

          <div className={styles.cta}>
            <a href="/assets/documents/KHA VAN HOANG 2025.pdf" className={styles.btnPrimary} download>
              <i className="fas fa-file-download" /> {t('hero.cta.downloadResume')}
            </a>
            <a href="mailto:khavan.work@gmail.com" className={styles.btnSecondary}>
              <i className="fas fa-paper-plane" /> {t('hero.cta.bookCall')}
            </a>
            <a href="#projects" className={styles.btnSecondary}>
              <i className="fas fa-folder-open" /> {t('hero.cta.viewProjects')}
            </a>
          </div>

          <div className={styles.social}>
            <a
              href="https://github.com/vanhoangkha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://linkedin.com/in/vanhoangkha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a href="mailto:khavan.work@gmail.com" aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
            <a
              href="https://cloudjourney.awsstudygroup.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cloud Journey"
            >
              <i className="fas fa-cloud" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <a href="#about" aria-label={t('hero.scrollDown')}>
          <i className="fas fa-chevron-down" />
        </a>
      </div>
    </section>
  );
};
