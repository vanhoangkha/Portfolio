import i18n from '@/i18n/config';
import type { Language } from '@store/languageStore';

/**
 * Get translated text for a given key
 * Useful for getting translations outside of React components
 * 
 * @param key - Translation key (e.g., 'common:loading')
 * @param options - Interpolation options
 * @returns Translated string
 * 
 * @example
 * const text = translate('common:loading');
 * const greeting = translate('home:hero.greeting', { name: 'John' });
 */
export const translate = (key: string, options?: Record<string, unknown>): string => {
  return i18n.t(key, options);
};

/**
 * Get current language
 * @returns Current language code
 */
export const getCurrentLanguage = (): Language => {
  return i18n.language as Language;
};

/**
 * Change application language
 * @param language - Language code to switch to
 */
export const changeLanguage = async (language: Language): Promise<void> => {
  await i18n.changeLanguage(language);
  document.documentElement.lang = language;
};

/**
 * Check if a translation key exists
 * @param key - Translation key to check
 * @param namespace - Optional namespace
 * @returns Boolean indicating if key exists
 */
export const translationExists = (key: string, namespace?: string): boolean => {
  const fullKey = namespace ? `${namespace}:${key}` : key;
  return i18n.exists(fullKey);
};

/**
 * Get translated content with fallback
 * Returns fallback if translation doesn't exist
 * 
 * @param key - Translation key
 * @param fallback - Fallback text
 * @param options - Interpolation options
 * @returns Translated string or fallback
 */
export const translateWithFallback = (
  key: string,
  fallback: string,
  options?: Record<string, unknown>
): string => {
  if (translationExists(key)) {
    return translate(key, options);
  }
  return fallback;
};

/**
 * Format date according to current language
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const language = getCurrentLanguage();
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat(language, defaultOptions).format(dateObj);
};

/**
 * Format number according to current language
 * @param number - Number to format
 * @param options - Intl.NumberFormat options
 * @returns Formatted number string
 */
export const formatNumber = (
  number: number,
  options?: Intl.NumberFormatOptions
): string => {
  const language = getCurrentLanguage();
  return new Intl.NumberFormat(language, options).format(number);
};

/**
 * Get language-specific content from object
 * Useful for content that has different versions per language
 * 
 * @param content - Object with language keys
 * @param fallbackLanguage - Fallback language if current not found
 * @returns Content for current language
 * 
 * @example
 * const content = {
 *   en: 'Hello',
 *   vi: 'Xin chào'
 * };
 * const text = getLocalizedContent(content); // Returns based on current language
 */
export const getLocalizedContent = <T>(
  content: Partial<Record<Language, T>>,
  fallbackLanguage: Language = 'en'
): T | undefined => {
  const currentLanguage = getCurrentLanguage();
  return content[currentLanguage] || content[fallbackLanguage];
};

/**
 * Pluralize translation key based on count
 * @param key - Base translation key
 * @param count - Count for pluralization
 * @param options - Additional interpolation options
 * @returns Pluralized translation
 * 
 * @example
 * pluralize('blog:comments.count', 5); // "5 comments"
 * pluralize('blog:comments.count', 1); // "1 comment"
 */
export const pluralize = (
  key: string,
  count: number,
  options?: Record<string, unknown>
): string => {
  return i18n.t(key, { count, ...options });
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param date - Date to compare
 * @returns Relative time string
 */
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  const t = (key: string, value: number) => translate(`common:time.${key}`, { value });
  
  if (diffInSeconds < 60) {
    return translate('common:time.justNow', { defaultValue: 'just now' });
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${t(diffInMinutes === 1 ? 'minute' : 'minutes', diffInMinutes)} ${translate('common:time.ago')}`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${t(diffInHours === 1 ? 'hour' : 'hours', diffInHours)} ${translate('common:time.ago')}`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${t(diffInDays === 1 ? 'day' : 'days', diffInDays)} ${translate('common:time.ago')}`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${t(diffInWeeks === 1 ? 'week' : 'weeks', diffInWeeks)} ${translate('common:time.ago')}`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${t(diffInMonths === 1 ? 'month' : 'months', diffInMonths)} ${translate('common:time.ago')}`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${t(diffInYears === 1 ? 'year' : 'years', diffInYears)} ${translate('common:time.ago')}`;
};
