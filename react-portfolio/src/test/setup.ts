import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

expect.extend({});

afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver for framer-motion whileInView
global.IntersectionObserver = class IntersectionObserver {
  constructor(private callback: IntersectionObserverCallback) {}

  observe() {
    // Immediately trigger the callback with mock entries
    this.callback(
      [
        {
          isIntersecting: true,
          target: {} as Element,
          intersectionRatio: 1,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        },
      ],
      this as any
    );
  }

  unobserve() {}
  disconnect() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}

  observe() {
    this.callback([], this as any);
  }

  unobserve() {}
  disconnect() {}
} as any;

// Mock matchMedia for responsive design
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
