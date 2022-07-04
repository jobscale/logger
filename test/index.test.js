const { Logger, logger } = require('..');

describe('test logger', () => {
  describe('logLevel', () => {
    it('toBeUndefined prompt trace', () => {
      const localLogger = new Logger({ logLevel: 'trace' });
      logger.config({ logLevel: 'trace' });
      const { error } = console;
      error(new Error('do not work'));
      expect(localLogger.trace({ timestamp: new Date().toLocaleString() })).toBeUndefined();
      expect(logger.trace({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });

    it('toBeUndefined prompt debug', () => {
      const localLogger = new Logger({ logLevel: 'debug' });
      logger.config({ logLevel: 'debug' });
      const { error } = console;
      error(new Error('do not work'));
      localLogger.trace(new Error('do not work'));
      logger.trace(new Error('do not work'));
      expect(localLogger.debug({ timestamp: new Date().toLocaleString() })).toBeUndefined();
      expect(logger.debug({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });

    it('toBeUndefined prompt info', () => {
      const localLogger = new Logger({ logLevel: 'info' });
      logger.config({ logLevel: 'info' });
      const { error } = console;
      error(new Error('do not work'));
      localLogger.debug(new Error('do not work'));
      logger.debug(new Error('do not work'));
      localLogger.trace(new Error('do not work'));
      logger.trace(new Error('do not work'));
      expect(localLogger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });

    it('toBeUndefined prompt warn', () => {
      const localLogger = new Logger({ logLevel: 'warn' });
      logger.config({ logLevel: 'warn' });
      const { error } = console;
      error(new Error('do not work'));
      localLogger.info(new Error('do not work'));
      logger.info(new Error('do not work'));
      localLogger.debug(new Error('do not work'));
      logger.debug(new Error('do not work'));
      expect(localLogger.warn({ timestamp: new Date().toLocaleString() })).toBeUndefined();
      expect(logger.warn({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });

    it('toBeUndefined prompt error', () => {
      const localLogger = new Logger({ logLevel: 'error' });
      logger.config({ logLevel: 'error' });
      const { error } = console;
      error(new Error('do not work'));
      localLogger.info(new Error('do not work'));
      logger.info(new Error('do not work'));
      localLogger.warn(new Error('do not work'));
      logger.warn(new Error('do not work'));
      expect(localLogger.error({ timestamp: new Date().toLocaleString() })).toBeUndefined();
      expect(logger.error({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  describe('multiple load', () => {
    const loader = require;
    beforeEach(() => {
      jest.resetModules();
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      logger.config({ logLevel: 'info' });
      localLogger.info('beforeEach');
      logger.info('beforeEach');
    });

    afterEach(() => {
      jest.resetModules();
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      logger.config({ logLevel: 'info' });
      localLogger.info('afterEach');
      logger.info('afterEach');
    });

    it('toBeUndefined prompt', () => {
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      logger.config({ logLevel: 'info' });
      expect(localLogger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });
});
