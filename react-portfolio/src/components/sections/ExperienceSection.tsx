import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import styles from './ExperienceSection.module.css';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  icon: string;
  achievements: string[];
  tags: string[];
  links?: Array<{ label: string; url: string }>;
}

export const ExperienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation('about');

  const experiences = t('experience.items', { returnObjects: true }) as ExperienceItem[];

  return (
    <section id="experience" className={styles.experience} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t('experience.label')}</span>
          <h2 className={styles.title}>{t('experience.title')}</h2>
        </motion.div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.marker} />
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <div className={styles.companyInfo}>
                    <div className={styles.logo}>
                      <i className={exp.icon} />
                    </div>
                    <div>
                      <h3 className={styles.position}>{exp.position}</h3>
                      <h4 className={styles.company}>{exp.company}</h4>
                    </div>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>

                <ul className={styles.achievements}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {exp.links && (
                  <div className={styles.links}>
                    {exp.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        <i className="fas fa-external-link-alt" /> {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
