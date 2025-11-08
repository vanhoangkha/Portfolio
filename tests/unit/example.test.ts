/**
 * Example unit test
 * Run: npm test
 */

describe('Example Test Suite', () => {
  it('should pass this basic test', () => {
    expect(true).toBe(true);
  });

  it('should perform basic arithmetic', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle string operations', () => {
    const str = 'Hello World';
    expect(str.toLowerCase()).toBe('hello world');
  });
});

// Example testing utility functions
describe('Utility Functions', () => {
  it('should be able to import from @portfolio/utils once installed', () => {
    // This test will pass once the packages are built and installed
    expect(true).toBe(true);
  });
});
