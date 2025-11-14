import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useLanguageStore } from '@store/languageStore';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';

// Mock i18next changeLanguage
const mockChangeLanguage = vi.fn((_lang?: string) => Promise.resolve(i18n.t));
// Override changeLanguage method
Object.defineProperty(i18n, 'changeLanguage', {
  value: mockChangeLanguage,
  writable: true,
  configurable: true,
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    // Reset language store to default
    useLanguageStore.setState({ language: 'en' });
    // Clear localStorage
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render both language options', () => {
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('VI')).toBeInTheDocument();
  });

  it('should mark current language as active', () => {
    useLanguageStore.setState({ language: 'vi' });
    
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    const viButton = screen.getByText('VI').closest('button');
    expect(viButton).toHaveClass(/active/);
  });

  it('should switch language when button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    const viButton = screen.getByText('VI');
    await user.click(viButton);

    expect(useLanguageStore.getState().language).toBe('vi');
    expect(mockChangeLanguage).toHaveBeenCalledWith('vi');
  });

  it('should persist language to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    await user.click(screen.getByText('VI'));

    // Check localStorage (zustand persist sets this)
    const stored = localStorage.getItem('language-storage');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.state.language).toBe('vi');
  });

  it('should have proper ARIA attributes', () => {
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    const switcher = screen.getByRole('group');
    expect(switcher).toHaveAttribute('aria-label');

    const enButton = screen.getByText('EN').closest('button');
    expect(enButton).toHaveAttribute('aria-pressed');
    expect(enButton).toHaveAttribute('aria-label');
  });

  it('should not switch if same language is clicked', async () => {
    const user = userEvent.setup();
    useLanguageStore.setState({ language: 'en' });
    
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    const enButton = screen.getByText('EN');
    
    // Clear previous calls
    vi.clearAllMocks();

    await user.click(enButton);

    // Language should remain the same, but setLanguage might still be called
    // The component logic prevents the change internally
    expect(useLanguageStore.getState().language).toBe('en');
  });

  it('should update HTML lang attribute when language changes', async () => {
    const user = userEvent.setup();
    // Ensure we start with English
    useLanguageStore.setState({ language: 'en' });
    document.documentElement.lang = 'en';
    
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    expect(document.documentElement.lang).toBe('en');

    await user.click(screen.getByText('VI'));

    // The store's setLanguage updates the HTML lang attribute
    expect(document.documentElement.lang).toBe('vi');
  });
});

