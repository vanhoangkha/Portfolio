import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { CountUp } from '@components/CountUp';
import styles from './AboutSection.module.css';

const highlightIcons = [
  'fas fa-award',
  'fas fa-users',
  'fas fa-rocket',
  'fas fa-chalkboard-teacher',
];

const statsValues = [20, 200, 50, 6];

export const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation('about');

  const highlights = t('highlights', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const stats = t('stats', { returnObjects: true }) as Array<{ label: string }>;

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t('label')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={styles.intro}>
              {t('intro')}
            </p>

            <div className={styles.highlights}>
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.highlightItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className={styles.highlightIcon}>
                    <i className={highlightIcons[index]} />
                  </div>
                  <div className={styles.highlightText}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber}>
                  {inView && <CountUp end={statsValues[index]} duration={2} />}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
