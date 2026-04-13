import { jest } from '@jest/globals';
import { Logger, createLogger, logger } from '../index.js';

// Mock TERM_PROGRAM to simulate VS Code environment
beforeAll(() => {
  if (process.env.TERM_PROGRAM !== 'vscode') return;
  // Mock console methods to simulate _cb callback
  const originalConsole = { ...console };
  console.info = jest.fn((...args) => {
    originalConsole.info(...args);
    const last = args[args.length - 1];
    if (typeof last === 'object' && typeof last._cb === 'function') {
      last._cb({ allowed: true });
    }
  });
  console.debug = jest.fn((...args) => {
    originalConsole.debug(...args);
    const last = args[args.length - 1];
    if (typeof last === 'object' && typeof last._cb === 'function') {
      last._cb({ allowed: true });
    }
  });
  console.warn = jest.fn((...args) => {
    originalConsole.warn(...args);
    const last = args[args.length - 1];
    if (typeof last === 'object' && typeof last._cb === 'function') {
      last._cb({ allowed: true });
    }
  });
  console.error = jest.fn((...args) => {
    originalConsole.error(...args);
    const last = args[args.length - 1];
    if (typeof last === 'object' && typeof last._cb === 'function') {
      last._cb({ allowed: true });
    }
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('test allowed logger', () => {
  describe('allowed logLevel', () => {
    it('toStrictEqual prompt allowed debug', async () => {
      const localLogger = new Logger({ logLevel: 'debug' });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.debug({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });

    it('toStrictEqual prompt allowed info', async () => {
      const localLogger = createLogger('info');
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.info({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });

    it('toStrictEqual prompt allowed warn', async () => {
      const localLogger = new Logger({ logLevel: 'warn' });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.warn({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });

    it('toStrictEqual prompt allowed error', async () => {
      const localLogger = new Logger({ logLevel: 'error' });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.error({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });
  });

  describe('multiple load allowed logger', () => {
    beforeEach(async () => {
      jest.resetModules();
      const obj = await import('../index.js');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      localLogger.info('beforeEach');
    });

    afterEach(async () => {
      jest.resetModules();
      const obj = await import('../index.js');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      localLogger.info('afterEach');
    });

    it('toStrictEqual prompt allowed', async () => {
      const obj = await import('../index.js');
      const localLogger = new obj.Logger({
        logLevel: 'info',
        callback: ({ logLevel, recipe }) => {
          logger.info({ logLevel, recipe });
        },
      });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.info({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });
  });
});

describe('test disabled logger', () => {
  describe('disabled logLevel', () => {
    it('toStrictEqual prompt disable debug', async () => {
      const localLogger = new Logger({ logLevel: 'debug' });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.trace({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });

    it('toStrictEqual prompt disable info', async () => {
      const localLogger = new Logger({ logLevel: 'info' });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.debug({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });

    it('toStrictEqual prompt disable warn', async () => {
      const localLogger = new Logger({ logLevel: 'warn' });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.info({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });

    it('toStrictEqual prompt disable error', async () => {
      const localLogger = new Logger({ logLevel: 'error' });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.warn({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });
  });

  describe('multiple load disabled logger', () => {
    beforeEach(async () => {
      jest.resetModules();
      const obj = await import('../index.js');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      localLogger.info('beforeEach');
    });

    afterEach(async () => {
      jest.resetModules();
      const obj = await import('../index.js');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      localLogger.info('afterEach');
    });

    it('toStrictEqual prompt disabled', async () => {
      const obj = await import('../index.js');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      const prom = {};
      prom.pending = new Promise(resolve => { prom.resolve = resolve; });
      localLogger.debug({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          prom.resolve();
        },
      });
      return prom.pending;
    });
  });
});
