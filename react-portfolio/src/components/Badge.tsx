import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
}

export const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  pill = false 
}: BadgeProps) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${pill ? styles.pill : ''}`}>
      {children}
    </span>
  );
};
