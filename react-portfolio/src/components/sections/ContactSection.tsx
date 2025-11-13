import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './ContactSection.module.css';

export const ContactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Get In Touch</span>
          <h2 className={styles.title}>Contact Me</h2>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part
            of your visions.
          </p>
          <a href="mailto:khavan.work@gmail.com" className={styles.emailButton}>
            <i className="fas fa-envelope" /> khavan.work@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};
