import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import enNavigation from '@/locales/en/navigation.json';
import enAbout from '@/locales/en/about.json';
import enProjects from '@/locales/en/projects.json';
import enSkills from '@/locales/en/skills.json';
import enContact from '@/locales/en/contact.json';
import enBlog from '@/locales/en/blog.json';

import viCommon from '@/locales/vi/common.json';
import viHome from '@/locales/vi/home.json';
import viNavigation from '@/locales/vi/navigation.json';
import viAbout from '@/locales/vi/about.json';
import viProjects from '@/locales/vi/projects.json';
import viSkills from '@/locales/vi/skills.json';
import viContact from '@/locales/vi/contact.json';
import viBlog from '@/locales/vi/blog.json';

// Translation resources
const resources = {
  en: {
    common: enCommon,
    home: enHome,
    navigation: enNavigation,
    about: enAbout,
    projects: enProjects,
    skills: enSkills,
    contact: enContact,
    blog: enBlog,
  },
  vi: {
    common: viCommon,
    home: viHome,
    navigation: viNavigation,
    about: viAbout,
    projects: viProjects,
    skills: viSkills,
    contact: viContact,
    blog: viBlog,
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language
    defaultNS: 'common', // Default namespace
    ns: ['common', 'home', 'navigation', 'about', 'projects', 'skills', 'contact', 'blog'],
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React options
    react: {
      useSuspense: true,
    },
    
    // Debug mode (disable in production)
    debug: import.meta.env.DEV,
  });

export default i18n;
