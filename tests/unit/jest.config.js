module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '../../packages/**/*.{ts,tsx}',
    '!../../packages/**/node_modules/**',
    '!../../packages/**/dist/**',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '@portfolio/types': '<rootDir>/../../packages/types/src',
    '@portfolio/utils': '<rootDir>/../../packages/utils/src',
    '@portfolio/config': '<rootDir>/../../packages/config/src',
  },
};
