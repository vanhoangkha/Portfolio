import { useLanguageStore } from '@/store/languageStore';
import type { BlogPost } from '@/types';

export interface TranslatedBlogPost {
  title: string;
  excerpt: string;
  content: string;
  isTranslated: boolean;
  originalLanguage: string;
}

/**
 * Hook to get translated content for a blog post
 * Falls back to original content if translation is not available
 */
export const useBlogTranslation = (post: BlogPost): TranslatedBlogPost => {
  const { language } = useLanguageStore();

  // If current language matches post language, return original
  if (language === post.language) {
    return {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      isTranslated: false,
      originalLanguage: post.language,
    };
  }

  // If translation exists for current language, return it
  const translation = post.translations?.[language];
  if (translation) {
    return {
      title: translation.title || post.title,
      excerpt: translation.excerpt || post.excerpt,
      content: translation.content || post.content,
      isTranslated: true,
      originalLanguage: post.language,
    };
  }

  // Fallback to original content with translation flag
  return {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    isTranslated: false,
    originalLanguage: post.language,
  };
};
