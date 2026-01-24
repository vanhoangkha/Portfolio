import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBlogTranslation } from '../useBlogTranslation';
import { useLanguageStore } from '@store/languageStore';
import type { BlogPost } from '@/types';

const mockAuthor = {
  id: '1',
  name: 'Test Author',
  email: 'test@example.com',
  avatar: '/avatar.jpg',
  bio: 'Test bio',
};

const mockSEO = {
  metaTitle: 'Test Post',
  metaDescription: 'Test description',
  keywords: ['test'],
};

const mockPost: BlogPost = {
  id: '1',
  slug: 'test-post',
  title: 'Test Post',
  excerpt: 'Test excerpt',
  content: 'Test content',
  featuredImage: '/image.jpg',
  author: mockAuthor,
  category: 'test',
  tags: ['test'],
  publishedAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  readTime: 5,
  seo: mockSEO,
  commentsEnabled: true,
  viewCount: 100,
  language: 'en',
  translations: {
    vi: {
      title: 'Bài Viết Test',
      excerpt: 'Trích đoạn test',
      content: 'Nội dung test',
    },
  },
};

describe('useBlogTranslation', () => {
  beforeEach(() => {
    useLanguageStore.setState({ language: 'en' });
  });

  it('should return original content when language matches', () => {
    const { result } = renderHook(() => useBlogTranslation(mockPost));

    expect(result.current.title).toBe('Test Post');
    expect(result.current.excerpt).toBe('Test excerpt');
    expect(result.current.content).toBe('Test content');
    expect(result.current.isTranslated).toBe(false);
    expect(result.current.originalLanguage).toBe('en');
  });

  it('should return translated content when available', () => {
    useLanguageStore.setState({ language: 'vi' });
    
    const { result } = renderHook(() => useBlogTranslation(mockPost));

    expect(result.current.title).toBe('Bài Viết Test');
    expect(result.current.excerpt).toBe('Trích đoạn test');
    expect(result.current.content).toBe('Nội dung test');
    expect(result.current.isTranslated).toBe(true);
    expect(result.current.originalLanguage).toBe('en');
  });

  it('should fallback to original when translation missing', () => {
    const postWithoutTranslation: BlogPost = {
      ...mockPost,
      translations: undefined,
    };
    useLanguageStore.setState({ language: 'vi' });

    const { result } = renderHook(() => useBlogTranslation(postWithoutTranslation));

    expect(result.current.title).toBe('Test Post');
    expect(result.current.excerpt).toBe('Test excerpt');
    expect(result.current.content).toBe('Test content');
    expect(result.current.isTranslated).toBe(false);
    expect(result.current.originalLanguage).toBe('en');
  });

  it('should handle partial translations', () => {
    const partialPost: BlogPost = {
      ...mockPost,
      translations: {
        vi: {
          title: 'Bài Viết Test',
          // excerpt and content missing
        },
      },
    };
    useLanguageStore.setState({ language: 'vi' });

    const { result } = renderHook(() => useBlogTranslation(partialPost));

    expect(result.current.title).toBe('Bài Viết Test');
    expect(result.current.excerpt).toBe('Test excerpt'); // Fallback
    expect(result.current.content).toBe('Test content'); // Fallback
    expect(result.current.isTranslated).toBe(true);
  });

  it('should handle Vietnamese post with English translation', () => {
    const vietnamesePost: BlogPost = {
      ...mockPost,
      language: 'vi',
      title: 'Bài Viết Test',
      excerpt: 'Trích đoạn test',
      content: 'Nội dung test',
      translations: {
        en: {
          title: 'Test Post',
          excerpt: 'Test excerpt',
          content: 'Test content',
        },
      },
    };
    useLanguageStore.setState({ language: 'en' });

    const { result } = renderHook(() => useBlogTranslation(vietnamesePost));

    expect(result.current.title).toBe('Test Post');
    expect(result.current.excerpt).toBe('Test excerpt');
    expect(result.current.content).toBe('Test content');
    expect(result.current.isTranslated).toBe(true);
    expect(result.current.originalLanguage).toBe('vi');
  });

  it('should return original when viewing Vietnamese post in Vietnamese', () => {
    const vietnamesePost: BlogPost = {
      ...mockPost,
      language: 'vi',
      title: 'Bài Viết Test',
      excerpt: 'Trích đoạn test',
      content: 'Nội dung test',
    };
    useLanguageStore.setState({ language: 'vi' });

    const { result } = renderHook(() => useBlogTranslation(vietnamesePost));

    expect(result.current.title).toBe('Bài Viết Test');
    expect(result.current.excerpt).toBe('Trích đoạn test');
    expect(result.current.content).toBe('Nội dung test');
    expect(result.current.isTranslated).toBe(false);
    expect(result.current.originalLanguage).toBe('vi');
  });
});

