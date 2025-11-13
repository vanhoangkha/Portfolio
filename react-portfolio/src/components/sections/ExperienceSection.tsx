import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './ExperienceSection.module.css';

const experiences = [
  {
    company: 'Amazon Web Services (AWS)',
    position: 'Cloud and AI Solution Architect',
    period: 'December 2021 - Present',
    icon: 'fab fa-aws',
    achievements: [
      'Designed standardized AWS landing zones and Infrastructure as Code frameworks using Terraform and AWS CDK for 60+ enterprise organizations, reducing deployment time by 30%',
      'Architected Generative AI solutions utilizing Amazon Bedrock and Amazon SageMaker for compliance automation and intelligent audit workflows, achieving 45% reduction in review cycles and $2M in annual savings',
      'Implemented Zero Trust security architectures with comprehensive observability using Amazon CloudWatch, OpenTelemetry, and Grafana, reducing security incidents by 40%',
      'Delivered 200+ technical workshops training 150+ engineers, establishing cloud competency across 45,000+ professionals',
      'Led multi-cloud transformation initiatives for 20+ enterprise clients across banking, financial services, and manufacturing sectors',
    ],
    tags: ['AWS', 'GenAI', 'Zero Trust', 'IaC', 'Multi-Cloud'],
  },
  {
    company: 'CloudThinker',
    position: 'Co-Founder and Architect',
    period: '2025 - Present',
    icon: 'fas fa-robot',
    achievements: [
      'Architected multi-agent orchestration platform leveraging Amazon Bedrock for autonomous cloud operations and compliance monitoring across AWS, Azure, and GCP',
      'Results: 35-40% operational efficiency improvement; 50% reduction in mean time to recovery',
    ],
    tags: ['AI Agents', 'Multi-Cloud', 'Automation'],
    links: [
      { label: 'Platform', url: 'https://www.cloudthinker.io' },
      { label: 'Docs', url: 'https://cloudthinker.mintlify.app' },
    ],
  },
  {
    company: 'Renova Cloud (AWS Advanced Consulting Partner)',
    position: 'Cloud Solution Architect',
    period: 'January 2020 - December 2021',
    icon: 'fas fa-cloud',
    achievements: [
      'Executed AWS Migration Acceleration Program engagements for financial services clients, delivering zero-downtime migrations of mission-critical banking systems',
      'Designed CI/CD pipelines using Terraform and AWS CodePipeline, increasing deployment velocity by 70%',
      'Conducted AWS Well-Architected Framework Reviews for 15 organizations, achieving 30% improvement in reliability, security, and cost efficiency',
    ],
    tags: ['AWS MAP', 'Migration', 'CI/CD', 'Well-Architected'],
  },
  {
    company: 'PTIT IOT Innovation Lab',
    position: 'Head of Laboratory',
    period: 'December 2019 - December 2020',
    icon: 'fas fa-university',
    achievements: [
      'Established IoT and AI research laboratory, mentoring 30+ students',
      'Architected edge computing solutions using AWS IoT Core and Amazon SageMaker Edge Manager, reducing inference latency by 40%',
      'Research Excellence Award: 2021 - 2023',
    ],
    tags: ['IoT', 'Edge Computing', 'AI/ML', 'Research'],
  },
];

export const ExperienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className={styles.experience} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Career Journey</span>
          <h2 className={styles.title}>Professional Experience</h2>
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
