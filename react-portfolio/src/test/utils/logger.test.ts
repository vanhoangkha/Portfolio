import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from '@utils/logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  it('logs info messages', () => {
    logger.info('test message');
    expect(console.log).toHaveBeenCalledWith('[INFO]', 'test message');
  });

  it('logs warning messages', () => {
    logger.warn('warning message');
    expect(console.warn).toHaveBeenCalledWith('[WARN]', 'warning message');
  });

  it('logs error messages', () => {
    logger.error('error message');
    expect(console.error).toHaveBeenCalledWith('[ERROR]', 'error message');
  });

  it('logs debug messages', () => {
    logger.debug('debug message');
    expect(console.debug).toHaveBeenCalledWith('[DEBUG]', 'debug message');
  });
});
