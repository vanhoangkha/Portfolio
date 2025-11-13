import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    title: 'CloudThinker',
    description:
      'Multi-cloud agentic AI platform for cloud operations automation. Increased operational efficiency by 35-40% across AWS/Azure/GCP.',
    icon: 'fas fa-robot',
    tags: ['AI Agents', 'Multi-Cloud', 'Automation', '10K+ Users'],
    github: 'https://github.com/strands-agents',
    demo: 'https://www.cloudthinker.io',
  },
  {
    title: 'AWS First GenAI Journey',
    description:
      'Principal architect of AWS official Generative AI reference framework. Designed 20+ enterprise architectures for LLM and RAG systems. 1,000+ GitHub stars.',
    icon: 'fas fa-brain',
    tags: ['AWS Bedrock', 'GenAI', 'RAG', '1K+ Stars'],
    github: 'https://github.com/aws-samples/AWS-First-GenAI-Journey',
  },
  {
    title: 'Enterprise Landing Zone',
    description:
      'Led migration of 100+ banking workloads to AWS. Designed multi-account landing zone with centralized governance. Results: 20% cost reduction, $5M in savings.',
    icon: 'fas fa-building',
    tags: ['AWS', 'Migration', 'Terraform', 'Banking'],
    github: 'https://github.com/vanhoangkha/chubb-aws-migration',
  },
  {
    title: 'Special Force LMS',
    description:
      'Learning management system serving 40K+ users for AWS certification preparation and cloud training.',
    icon: 'fas fa-graduation-cap',
    tags: ['LMS', 'Education', 'AWS', '40K+ Users'],
    demo: 'https://specialforce.awsstudygroup.com',
  },
];

export const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className={styles.projects} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Portfolio</span>
          <h2 className={styles.title}>Featured Projects</h2>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.cardIcon}>
                <i className={project.icon} />
              </div>

              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>

              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.links}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <i className="fab fa-github" /> Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <i className="fas fa-external-link-alt" /> Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
