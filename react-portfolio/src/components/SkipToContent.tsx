import styles from './SkipToContent.module.css';

export const SkipToContent = () => {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
};
