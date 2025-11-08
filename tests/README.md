# Tests

This directory contains all test suites for the Portfolio project.

## Directory Structure

```
tests/
├── unit/           # Unit tests for packages and utilities
├── integration/    # Integration tests for API and backend
└── e2e/            # End-to-end tests with Playwright
```

## Unit Tests

Location: `tests/unit/`

Tests individual functions and modules in isolation.

### Running Unit Tests

```bash
cd tests/unit
npm install
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Writing Unit Tests

Create test files with `.test.ts` or `.spec.ts` extension:

```typescript
// example.test.ts
import { formatDate } from '@portfolio/utils';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate('2024-01-01');
    expect(result).toBe('January 1, 2024');
  });
});
```

## Integration Tests

Location: `tests/integration/`

Tests interactions between different parts of the system, including API calls and database operations.

### Running Integration Tests

```bash
cd tests/integration
npm install
npm test
```

### Prerequisites

- AWS credentials configured
- Backend deployed and accessible

## E2E Tests

Location: `tests/e2e/`

Tests the entire application from a user's perspective using Playwright.

### Running E2E Tests

```bash
cd tests/e2e
npm install
npx playwright install  # Install browsers

# Run all tests
npm test

# Run with UI
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug mode
npm run test:debug

# View report
npm run report
```

### Writing E2E Tests

```typescript
// example.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Portfolio/);
});
```

## CI/CD Integration

Tests are automatically run in GitHub Actions workflows:

- Unit tests: Run on every PR
- Integration tests: Run on develop and master branches
- E2E tests: Run on production deployments

## Best Practices

1. **Unit Tests**: Test one thing at a time, mock dependencies
2. **Integration Tests**: Test real interactions, use test databases
3. **E2E Tests**: Test critical user flows, keep tests focused
4. **Test Coverage**: Aim for >80% coverage on critical code
5. **Naming**: Use descriptive test names that explain what's being tested
6. **Isolation**: Tests should be independent and not rely on execution order

## Running All Tests

From the project root:

```bash
# Run all test suites
npm test

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e
```

## Debugging

### Unit Tests
Use `test.only()` to run a single test:
```typescript
test.only('this test only', () => {
  // ...
});
```

### E2E Tests
Use debug mode to pause execution:
```typescript
await page.pause(); // Debugger will open
```

Or run with `--debug` flag:
```bash
npm run test:debug
```

## Contributing

When adding new features:
1. Write tests first (TDD approach recommended)
2. Ensure all tests pass before submitting PR
3. Add new test cases for bug fixes
4. Update this README if adding new test types
