# Testing Guide

## Overview

This project uses Vitest and React Testing Library for testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Structure

```
src/
├── test/
│   ├── setup.ts              # Test setup and configuration
│   ├── components/           # Component tests
│   ├── hooks/                # Hook tests
│   └── utils/                # Utility function tests
```

## Writing Tests

### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const { user } = render(<MyComponent />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Hook Tests

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '@hooks/useMyHook';

describe('useMyHook', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });

  it('updates value', () => {
    const { result } = renderHook(() => useMyHook());
    act(() => {
      result.current.increment();
    });
    expect(result.current.value).toBe(1);
  });
});
```

### Utility Tests

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from '@utils/format';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('Jan 15, 2024');
  });
});
```

## Testing Best Practices

### 1. Test User Behavior
Focus on testing what users see and do, not implementation details.

```typescript
// ✅ Good - tests user behavior
expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

// ❌ Bad - tests implementation
expect(component.state.isSubmitting).toBe(false);
```

### 2. Use Semantic Queries
Prefer queries that reflect how users interact with your app.

```typescript
// ✅ Good - semantic queries
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByText(/welcome/i);

// ❌ Bad - implementation queries
screen.getByTestId('submit-button');
screen.getByClassName('email-input');
```

### 3. Test Accessibility
Ensure your components are accessible.

```typescript
it('is accessible', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 4. Mock External Dependencies
Mock API calls, timers, and other external dependencies.

```typescript
import { vi } from 'vitest';

vi.mock('@utils/api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' })),
}));
```

### 5. Test Error States
Don't forget to test error handling.

```typescript
it('displays error message', async () => {
  const error = new Error('Failed to load');
  vi.mocked(fetchData).mockRejectedValue(error);
  
  render(<MyComponent />);
  expect(await screen.findByText(/failed to load/i)).toBeInTheDocument();
});
```

## Coverage Goals

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Continuous Integration

Tests run automatically on:
- Pull requests
- Pushes to main branch
- Before deployment

## Debugging Tests

### Run specific test file
```bash
npm test -- src/test/components/MyComponent.test.tsx
```

### Run tests matching pattern
```bash
npm test -- -t "renders correctly"
```

### Debug in VS Code
Add breakpoint and run "Debug Test" from the test file.

## Common Issues

### Issue: Tests timeout
**Solution**: Increase timeout or use `waitFor`

```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
}, { timeout: 5000 });
```

### Issue: Can't find element
**Solution**: Use `screen.debug()` to see current DOM

```typescript
screen.debug(); // prints current DOM
```

### Issue: Async updates not reflected
**Solution**: Use `waitFor` or `findBy` queries

```typescript
// ✅ Good
expect(await screen.findByText('Updated')).toBeInTheDocument();

// ❌ Bad
expect(screen.getByText('Updated')).toBeInTheDocument();
```

## Resources

- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
