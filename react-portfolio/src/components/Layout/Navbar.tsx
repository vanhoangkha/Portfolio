import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@store/themeStore';
import { LanguageSwitcher } from '@components/LanguageSwitcher';
import { SearchBar } from '@components/search/SearchBar';
import { debounce } from '@utils/debounce';
import { DEBOUNCE_DELAYS, SCROLL_THRESHOLDS, HEIGHTS, ANIMATIONS } from '@/constants';
import clsx from 'clsx';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/#home', key: 'home' },
  { href: '/#about', key: 'about' },
  { href: '/#experience', key: 'experience' },
  { href: '/#projects', key: 'projects' },
  { href: '/#skills', key: 'skills' },
  { href: '/resume', key: 'resume' },
  { href: '/#contact', key: 'contact' },
] as const;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const { t } = useTranslation('navigation');

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrolled(window.scrollY > SCROLL_THRESHOLDS.NAVBAR);
    }, DEBOUNCE_DELAYS.SCROLL);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        const targetPosition = element.offsetTop - HEIGHTS.NAVBAR;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <motion.nav
      className={clsx(styles.navbar, scrolled && styles.scrolled)}
      initial={{ y: ANIMATIONS.NAVBAR_INITIAL_Y }}
      animate={{ y: ANIMATIONS.NAVBAR_FINAL_Y }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>KVH</span>
        </Link>

        <button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>

        <AnimatePresence>
          <motion.ul
            className={clsx(styles.navMenu, isOpen && styles.active)}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {t(link.key)}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={clsx(
                      styles.navLink,
                      location.pathname === link.href && styles.active
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                )}
              </li>
            ))}
            <li className={styles.searchItem}>
              <SearchBar variant="header" />
            </li>
            <li>
              <LanguageSwitcher />
            </li>
            <li>
              <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
              </button>
            </li>
          </motion.ul>
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
