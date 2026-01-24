import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/i18n/config';

export type Language = 'en' | 'vi';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      
      setLanguage: (language: Language) => {
        set({ language });
        i18n.changeLanguage(language);
        
        // Update HTML lang attribute for accessibility
        document.documentElement.lang = language;
      },
      
      toggleLanguage: () => {
        const currentLanguage = get().language;
        const newLanguage: Language = currentLanguage === 'en' ? 'vi' : 'en';
        get().setLanguage(newLanguage);
      },
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        // Sync i18n with stored language on app load
        if (state?.language) {
          i18n.changeLanguage(state.language);
          document.documentElement.lang = state.language;
        }
      },
    }
  )
);
