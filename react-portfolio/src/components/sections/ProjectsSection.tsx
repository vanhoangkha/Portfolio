import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    title: 'CloudThinker - Intelligent Cloud Operations',
    description:
      'Co-Founder and Architect. Multi-agent orchestration platform leveraging Amazon Bedrock for autonomous cloud operations and compliance monitoring across AWS, Azure, and GCP. Results: 35-40% operational efficiency improvement; 50% reduction in mean time to recovery.',
    icon: 'fas fa-robot',
    tags: ['AI Agents', 'Multi-Cloud', 'Amazon Bedrock', 'Automation'],
    demo: 'https://www.cloudthinker.io',
  },
  {
    title: 'AWS First GenAI Journey',
    description:
      'Lead Technical Contributor. Principal architect of AWS official Generative AI reference framework. Designed 20+ enterprise architectures for LLM and RAG systems using Amazon Bedrock, SageMaker, Lambda, and OpenSearch. Results: 1,000+ GitHub stars; 3,000+ forks; adopted as regional reference by AWS Partner Network.',
    icon: 'fas fa-brain',
    tags: ['AWS Bedrock', 'GenAI', 'RAG', 'LLM', '1K+ Stars'],
    github: 'https://github.com/aws-samples/AWS-First-GenAI-Journey',
  },
  {
    title: 'Chubb AWS Enterprise Migration',
    description:
      'Migration Architect. Led migration of 100+ banking workloads to AWS using MAP methodology. Designed multi-account landing zone with centralized governance using Terraform IaC. Results: 20% cost reduction; 30% compliance efficiency improvement; zero-downtime execution; $5M in operational savings.',
    icon: 'fas fa-building',
    tags: ['AWS MAP', 'Migration', 'Terraform', 'Banking', 'Landing Zone'],
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
