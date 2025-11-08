import { test, expect } from '@playwright/test';

test.describe('Portfolio Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Kha Van Hoang/i);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');

    // Check for hero section elements
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
  });

  test('should navigate to blog page', async ({ page }) => {
    await page.goto('/');

    // Find and click blog link
    const blogLink = page.locator('a[href*="blog"]').first();
    await blogLink.click();

    // Verify navigation
    await expect(page).toHaveURL(/blog/);
  });

  test('should have working dark mode toggle', async ({ page }) => {
    await page.goto('/');

    // Find theme toggle button
    const themeToggle = page.locator('#theme-toggle, .theme-toggle, [data-theme-toggle]');

    if (await themeToggle.count() > 0) {
      await themeToggle.click();

      // Check if dark mode class is applied
      const html = page.locator('html');
      const isDarkMode = await html.evaluate((el) =>
        el.classList.contains('dark') || el.classList.contains('dark-mode')
      );

      expect(isDarkMode).toBeTruthy();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check if navigation menu exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Test keyboard navigation
    await page.keyboard.press('Tab');

    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
