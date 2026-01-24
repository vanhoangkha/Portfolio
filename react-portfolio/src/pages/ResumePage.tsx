import { Helmet } from 'react-helmet-async';
import { resumeData } from '../data/resumeData';
import styles from './ResumePage.module.css';

export const ResumePage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Resume - Kha Van Hoang</title>
        <meta name="description" content="Professional resume of Kha Van Hoang - Solutions Architect" />
      </Helmet>

      <section className={styles.resumePage}>
        <div className={styles.container}>
          {/* Resume Actions */}
          <div className={styles.resumeActions}>
            <button onClick={handlePrint} className={styles.btnPrimary}>
              <i className="fas fa-print" /> Print Resume
            </button>
            <a
              href="/assets/documents/KHA VAN HOANG 2025.pdf"
              download
              className={styles.btnSecondary}
            >
              <i className="fas fa-download" /> Download PDF
            </a>
          </div>

          {/* Resume Container */}
          <div className={styles.resumeContainer}>
            {/* Header */}
            <div className={styles.resumeHeader}>
              <h1 className={styles.name}>{resumeData.header.name}</h1>
              <h2 className={styles.title}>{resumeData.header.title}</h2>
              <div className={styles.contact}>
                <span>
                  <i className="fas fa-map-marker-alt" /> {resumeData.header.location}
                </span>
                <span>
                  <i className="fas fa-phone" /> {resumeData.header.phone}
                </span>
                <span>
                  <i className="fas fa-envelope" /> {resumeData.header.email}
                </span>
              </div>
              <div className={styles.links}>
                <a
                  href={`https://${resumeData.header.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin" /> {resumeData.header.linkedin}
                </a>
                <a
                  href={`https://${resumeData.header.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github" /> {resumeData.header.github}
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>PROFESSIONAL SUMMARY</h3>
              <p>{resumeData.summary}</p>
            </div>

            {/* Experience */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</h3>
              {resumeData.experience.map((job, index) => (
                <div key={index} className={styles.job}>
                  <div className={styles.jobHeader}>
                    <div>
                      <h4 className={styles.jobTitle}>{job.title}</h4>
                      <p className={styles.company}>{job.company}</p>
                    </div>
                    <span className={styles.period}>{job.period}</span>
                  </div>
                  <ul className={styles.responsibilities}>
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Key Projects */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>KEY PROJECTS</h3>
              {resumeData.projects.map((project, index) => (
                <div key={index} className={styles.project}>
                  <h4 className={styles.projectTitle}>{project.title}</h4>
                  <p className={styles.projectMeta}>
                    {project.role} | {project.period}
                    {project.links && (
                      <>
                        {' | '}
                        {project.links.map((link, idx) => (
                          <span key={idx}>
                            {idx > 0 && ' | '}
                            <a
                              href={`https://${link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.projectLink}
                            >
                              {link}
                            </a>
                          </span>
                        ))}
                      </>
                    )}
                  </p>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>TECHNICAL SKILLS</h3>
              {Object.entries(resumeData.skills).map(([category, skills]) => (
                <p key={category} className={styles.skillRow}>
                  <strong>{category}:</strong> {skills}
                </p>
              ))}
            </div>

            {/* Education */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>EDUCATION</h3>
              <div className={styles.education}>
                <div className={styles.educationHeader}>
                  <div>
                    <h4 className={styles.degree}>{resumeData.education.degree}</h4>
                    <p className={styles.institution}>
                      {resumeData.education.institution} | {resumeData.education.location}
                    </p>
                  </div>
                  <span className={styles.period}>{resumeData.education.period}</span>
                </div>
                <ul className={styles.achievements}>
                  {resumeData.education.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Certifications */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>PROFESSIONAL CERTIFICATIONS</h3>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className={styles.certificationGroup}>
                  <p className={styles.certCategory}>
                    <strong>{cert.category}:</strong>
                  </p>
                  <ul className={styles.certList}>
                    {cert.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Awards */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>AWARDS</h3>
              <ul className={styles.awardsList}>
                {resumeData.awards.map((award, idx) => (
                  <li key={idx}>{award}</li>
                ))}
              </ul>
            </div>

            {/* Professional Reference */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>PROFESSIONAL REFERENCE</h3>
              <p>
                {resumeData.reference.name} | {resumeData.reference.title} |{' '}
                {resumeData.reference.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
