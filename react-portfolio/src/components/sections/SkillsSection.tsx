import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import styles from './SkillsSection.module.css';

const skillCategories = [
  {
    icon: 'fas fa-brain',
    key: 'aiml',
    skills: ['AWS Bedrock', 'SageMaker', 'Azure OpenAI', 'Vertex AI', 'LangChain', 'RAG', 'Multi-Agent Systems'],
  },
  {
    icon: 'fab fa-aws',
    key: 'cloud',
    skills: ['AWS', 'Azure', 'GCP', 'Multi-Cloud', 'Hybrid Cloud'],
  },
  {
    icon: 'fas fa-dharmachakra',
    key: 'container',
    skills: ['Kubernetes', 'EKS', 'Docker', 'Fargate', 'Step Functions'],
  },
  {
    icon: 'fas fa-code',
    key: 'iac',
    skills: ['Terraform', 'AWS CDK', 'CloudFormation', 'Bicep'],
  },
  {
    icon: 'fas fa-sync-alt',
    key: 'cicd',
    skills: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'AWS CodePipeline'],
  },
  {
    icon: 'fas fa-chart-line',
    key: 'observability',
    skills: ['Prometheus', 'Grafana', 'ELK Stack', 'OpenTelemetry', 'CloudWatch'],
  },
];

export const SkillsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation('skills');

  return (
    <section id="skills" className={styles.skills} ref={ref}>
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
                <h3>{t(`categories.${category.key}`)}</h3>
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
