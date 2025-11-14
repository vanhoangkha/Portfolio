import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useProjectFilterStore } from '@store/projectFilterStore';
import { ProjectFilter } from '@components/projects/ProjectFilter';
import type { Project } from '@/types';
import styles from './ProjectsSection.module.css';

interface ProjectItem {
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { t } = useTranslation('projects');
  const { getFilteredProjects } = useProjectFilterStore();

  const projectItems = t('items', { returnObjects: true }) as ProjectItem[];
  const links = t('links', { returnObjects: true }) as Record<string, string>;

  // Convert translated items to Project objects with required fields
  const projectsData: Project[] = projectItems.map((item, index) => ({
    id: `project-${index}`,
    title: item.title,
    description: item.description,
    icon: item.icon,
    tags: item.tags,
    category: index === 0 ? 'AI/ML' : index === 1 ? 'AI/ML' : index === 2 ? 'Cloud Infrastructure' : 'Education',
    completedAt: new Date().toISOString(),
    status: 'completed' as const,
    images: [],
    technologies: item.tags,
    ...(index === 0 ? { demo: links.demo } : {}),
    ...(index === 1 ? { github: links.github } : {}),
    ...(index === 3 ? { demo: links.lms } : {}),
  }));

  const filteredProjects = getFilteredProjects(projectsData);

  // Extract unique technologies and categories
  const availableTechnologies = Array.from(
    new Set(projectsData.flatMap((p) => p.technologies || []))
  ).sort();

  const availableCategories = Array.from(
    new Set(projectsData.map((p) => p.category))
  ).sort();

  const getProjectLinks = (project: Project) => {
    return {
      github: project.github,
      demo: project.demo,
    };
  };

  return (
    <section id="projects" className={styles.projects} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t('label')}</span>
          <h2 className={styles.title}>{t('featured')}</h2>
        </motion.div>

        {/* Filters */}
        <ProjectFilter
          availableTechnologies={availableTechnologies}
          availableCategories={availableCategories}
          resultCount={filteredProjects.length}
          totalCount={projectsData.length}
        />

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="grid"
              className={styles.grid}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => {
                const projectLinks = getProjectLinks(project);
                return (
                  <motion.div
                    key={project.id}
                    layout
                    className={styles.card}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
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
                      {projectLinks.github && (
                        <a
                          href={projectLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          <i className="fab fa-github" /> {t('card.viewCode')}
                        </a>
                      )}
                      {projectLinks.demo && (
                        <a
                          href={projectLinks.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          <i className="fas fa-external-link-alt" /> {t('card.viewDemo')}
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className={styles.emptyState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-search" />
              <h3>{t('filter.noResults')}</h3>
              <p>{t('filter.noResults')}</p>
              <button
                onClick={() => useProjectFilterStore.getState().clearFilters()}
                className={styles.resetButton}
              >
                <i className="fas fa-redo" /> {t('filter.clearAll')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
