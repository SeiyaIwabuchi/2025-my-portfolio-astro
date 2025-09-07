/**
 * Global test setup for Vitest
 */

import { vi, beforeEach, afterEach } from 'vitest';

// Mock console methods to reduce noise in tests
// while still allowing us to test that they're called when expected
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
};

// Reset DOM state before each test
beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  document.body.className = '';
  document.body.style.cssText = '';
});

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});
