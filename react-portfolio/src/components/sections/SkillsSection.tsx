import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './SkillsSection.module.css';

const skillCategories = [
  {
    icon: 'fas fa-brain',
    title: 'AI/ML & GenAI',
    skills: ['AWS Bedrock', 'SageMaker', 'Azure OpenAI', 'Vertex AI', 'LangChain', 'RAG', 'Multi-Agent Systems'],
  },
  {
    icon: 'fab fa-aws',
    title: 'Cloud Platforms',
    skills: ['AWS', 'Azure', 'GCP', 'Multi-Cloud', 'Hybrid Cloud'],
  },
  {
    icon: 'fas fa-dharmachakra',
    title: 'Container & Orchestration',
    skills: ['Kubernetes', 'EKS', 'Docker', 'Fargate', 'Step Functions'],
  },
  {
    icon: 'fas fa-code',
    title: 'Infrastructure as Code',
    skills: ['Terraform', 'AWS CDK', 'CloudFormation', 'Bicep'],
  },
  {
    icon: 'fas fa-sync-alt',
    title: 'CI/CD & Automation',
    skills: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'AWS CodePipeline'],
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Observability',
    skills: ['Prometheus', 'Grafana', 'ELK Stack', 'OpenTelemetry', 'CloudWatch'],
  },
];

export const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className={styles.skills} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Expertise</span>
          <h2 className={styles.title}>Skills Matrix</h2>
        </motion.div>

        <div className={styles.grid}>
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className={styles.category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.categoryHeader}>
                <i className={category.icon} />
                <h3>{category.title}</h3>
              </div>
              <div className={styles.skillTags}>
                {category.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
