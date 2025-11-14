import { useTranslation as useI18nTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

/**
 * Custom hook wrapper for react-i18next useTranslation
 * Provides type-safe translation function with namespace support
 * 
 * @param namespace - Translation namespace (default: 'common')
 * @returns Translation function and i18n instance
 * 
 * @example
 * const { t } = useTranslation('home');
 * const title = t('hero.title');
 */
export const useTranslation = (namespace: string = 'common') => {
  const { t, i18n, ready } = useI18nTranslation(namespace);
  
  return {
    t: t as TFunction,
    i18n,
    ready,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
};

/**
 * Hook to get multiple translation namespaces
 * Useful when a component needs translations from multiple namespaces
 * 
 * @param namespaces - Array of namespace names
 * @returns Translation function and i18n instance
 * 
 * @example
 * const { t } = useMultipleTranslations(['common', 'home']);
 * const commonText = t('common:loading');
 * const homeText = t('home:hero.title');
 */
export const useMultipleTranslations = (namespaces: string[]) => {
  const { t, i18n, ready } = useI18nTranslation(namespaces);
  
  return {
    t: t as TFunction,
    i18n,
    ready,
    language: i18n.language,
  };
};

/**
 * Hook to check if translations are loaded
 * Useful for showing loading states
 * 
 * @returns Boolean indicating if translations are ready
 */
export const useTranslationsReady = () => {
  const { ready } = useI18nTranslation();
  return ready;
};
