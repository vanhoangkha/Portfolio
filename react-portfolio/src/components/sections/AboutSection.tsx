import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CountUp } from '@components/CountUp';
import styles from './AboutSection.module.css';

const highlights = [
  {
    icon: 'fas fa-award',
    title: '5+ Years Experience',
    description: 'Delivering cloud modernization and enterprise solutions',
  },
  {
    icon: 'fas fa-users',
    title: '50K+ Community Members',
    description: "Co-founded Vietnam's largest AWS learning network",
  },
  {
    icon: 'fas fa-rocket',
    title: 'CloudThinker Founder',
    description: 'Architected multi-agent AI platform for cloud automation',
  },
  {
    icon: 'fas fa-chalkboard-teacher',
    title: '150+ Engineers Mentored',
    description: 'Successfully helped professionals land Cloud/DevOps/AI roles',
  },
];

const stats = [
  { value: 20, label: 'Projects Delivered' },
  { value: 200, label: 'Workshops Conducted' },
  { value: 50, label: 'Community Members (K+)' },
  { value: 6, label: 'AWS Certifications' },
];

export const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>About Me</span>
          <h2 className={styles.title}>Who I Am</h2>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={styles.intro}>
              I'm a Solutions Architect with expertise in designing enterprise-scale cloud solutions
              across AWS, Azure, and GCP. Currently at <strong>Amazon Web Services (AWS)</strong>, I
              specialize in cloud architecture, infrastructure automation, artificial intelligence,
              security governance, and multi-cloud strategy. Proven track record delivering
              transformational solutions for multinational enterprises and financial services
              organizations.
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
                    <i className={item.icon} />
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
                  {inView && <CountUp end={stat.value} duration={2} />}
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
