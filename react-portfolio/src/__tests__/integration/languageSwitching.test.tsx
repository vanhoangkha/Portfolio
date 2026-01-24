import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { useLanguageStore } from '@store/languageStore';
import i18n from '@/i18n/config';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// Create a new QueryClient for each test
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </I18nextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

describe('Language Switching Integration', () => {
  beforeEach(() => {
    useLanguageStore.setState({ language: 'en' });
    localStorage.clear();
    i18n.changeLanguage('en');
    document.documentElement.lang = 'en';
  });

  it('should switch language when button is clicked', async () => {
    const user = userEvent.setup();
    const Wrapper = createWrapper();
    
    render(
      <Wrapper>
        <LanguageSwitcher />
      </Wrapper>
    );

    // Initial language should be English
    expect(useLanguageStore.getState().language).toBe('en');

    // Switch to Vietnamese
    const viButton = screen.getByText('VI');
    await user.click(viButton);

    // Verify language store updated
    expect(useLanguageStore.getState().language).toBe('vi');
    expect(document.documentElement.lang).toBe('vi');
  });

  it('should persist language across page refreshes', async () => {
    const user = userEvent.setup();
    const Wrapper = createWrapper();
    
    render(
      <Wrapper>
        <LanguageSwitcher />
      </Wrapper>
    );

    // Switch to Vietnamese
    const viButton = screen.getByText('VI');
    await user.click(viButton);

    // Verify it's stored
    expect(useLanguageStore.getState().language).toBe('vi');

    // Simulate page refresh by re-rendering
    render(
      <Wrapper>
        <LanguageSwitcher />
      </Wrapper>
    );

    // Should still be in Vietnamese
    const stored = localStorage.getItem('language-storage');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.state.language).toBe('vi');
  });

  it('should update HTML lang attribute when language changes', async () => {
    const user = userEvent.setup();
    const Wrapper = createWrapper();
    
    render(
      <Wrapper>
        <LanguageSwitcher />
      </Wrapper>
    );

    expect(document.documentElement.lang).toBe('en');

    // Switch to Vietnamese
    await user.click(screen.getByText('VI'));

    // HTML lang attribute should be updated
    expect(document.documentElement.lang).toBe('vi');
  });

  it('should maintain language state when switching multiple times', async () => {
    const user = userEvent.setup();
    const Wrapper = createWrapper();
    
    render(
      <Wrapper>
        <LanguageSwitcher />
      </Wrapper>
    );

    // Switch to Vietnamese
    await user.click(screen.getByText('VI'));
    expect(useLanguageStore.getState().language).toBe('vi');

    // Switch back to English
    await user.click(screen.getByText('EN'));
    expect(useLanguageStore.getState().language).toBe('en');

    // Switch to Vietnamese again
    await user.click(screen.getByText('VI'));
    expect(useLanguageStore.getState().language).toBe('vi');
  });
});

