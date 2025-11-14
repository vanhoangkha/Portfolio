import { motion } from 'framer-motion';
import { useLanguageStore, type Language } from '@store/languageStore';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const languages: Array<{ code: Language; label: string; flag: string }> = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation('common');

  const handleLanguageChange = (newLanguage: Language) => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  };

  return (
    <div className={styles.languageSwitcher} role="group" aria-label={t('language.switch')}>
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`${styles.languageButton} ${
            language === lang.code ? styles.active : ''
          }`}
          aria-label={`${t('language.switch')} - ${lang.label}`}
          aria-pressed={language === lang.code}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <span className={styles.flag} aria-hidden="true">
            {lang.flag}
          </span>
          <span className={styles.label}>{lang.code.toUpperCase()}</span>
          
          {language === lang.code && (
            <motion.div
              className={styles.activeIndicator}
              layoutId="activeLanguage"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
