import styles from './Footer.module.css';

const socialLinks = [
  { icon: 'fab fa-github', href: 'https://github.com/vanhoangkha', label: 'GitHub' },
  { icon: 'fab fa-linkedin', href: 'https://linkedin.com/in/vanhoangkha', label: 'LinkedIn' },
  { icon: 'fas fa-envelope', href: 'mailto:khavan.work@gmail.com', label: 'Email' },
  { icon: 'fas fa-cloud', href: 'https://cloudjourney.awsstudygroup.com', label: 'Cloud Journey' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Kha Van Hoang</h3>
            <p>Solutions Architect | Cloud & AI Specialist</p>
          </div>

          <div className={styles.social}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.label}
              >
                <i className={link.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} Kha Van Hoang. All rights reserved.</p>
          <p>Built with React, TypeScript & ❤️</p>
        </div>
      </div>
    </footer>
  );
};
