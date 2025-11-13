import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from '@components/TypeAnimation';
import styles from './HeroSection.module.css';

const phrases = [
  'Cloud Solutions Architect',
  'AI/ML Specialist',
  'DevSecOps Expert',
  'Community Leader',
  'Tech Innovator',
];

export const HeroSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="home" className={styles.hero} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.greeting}>
            <span className={styles.wave}>👋</span> Hi, I'm
          </div>

          <h1 className={styles.title}>Kha Van Hoang</h1>

          <div className={styles.subtitle}>
            <TypeAnimation phrases={phrases} />
          </div>

          <p className={styles.description}>
            Solutions Architect with 5 years designing enterprise-scale cloud solutions on Amazon
            Web Services, Microsoft Azure, and Google Cloud Platform. AWS Community Builder
            recognized for establishing Vietnam's premier cloud learning ecosystem serving 50,000
            professionals.
          </p>

          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>50K+</span>
              <span className={styles.metricLabel}>Professionals Enabled</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>100+</span>
              <span className={styles.metricLabel}>Enterprise Projects</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>7</span>
              <span className={styles.metricLabel}>AWS Certifications</span>
            </div>
          </div>

          <div className={styles.cta}>
            <a href="/assets/documents/KHA VAN HOANG 2025.pdf" className={styles.btnPrimary} download>
              <i className="fas fa-file-download" /> Download Resume
            </a>
            <a href="mailto:khavan.work@gmail.com" className={styles.btnSecondary}>
              <i className="fas fa-paper-plane" /> Book a Call
            </a>
            <a href="#projects" className={styles.btnSecondary}>
              <i className="fas fa-folder-open" /> View Projects
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
        <a href="#about" aria-label="Scroll to About section">
          <i className="fas fa-chevron-down" />
        </a>
      </div>
    </section>
  );
};
