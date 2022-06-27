const { Logger } = require('..');

describe('test logger', () => {
  describe('logLevel', () => {
    it('toBeUndefined prompt trace', () => {
      const logger = new Logger({ logLevel: 'trace' });
      const { error } = console;
      error(new Error('do not work'));
      expect(logger.trace({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });

    it('toBeUndefined prompt debug', () => {
      const logger = new Logger({ logLevel: 'debug' });
      const { error } = console;
      error(new Error('do not work'));
      expect(logger.debug({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });

    it('toBeUndefined prompt info', () => {
      const logger = new Logger({ logLevel: 'info' });
      const { error } = console;
      error(new Error('do not work'));
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });

    it('toBeUndefined prompt warn', () => {
      const logger = new Logger({ logLevel: 'warn' });
      const { error } = console;
      error(new Error('do not work'));
      logger.info(new Error('do not work'));
      expect(logger.warn({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });

    it('toBeUndefined prompt error', () => {
      const logger = new Logger({ logLevel: 'error' });
      const { error } = console;
      error(new Error('do not work'));
      logger.info(new Error('do not work'));
      logger.warn(new Error('do not work'));
      expect(logger.error({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  describe('multiple load', () => {
    const loader = require;
    beforeEach(() => {
      jest.resetModules();
      const obj = loader('..');
      const logger = new obj.Logger({ logLevel: 'info' });
      logger.info('beforeEach');
    });

    afterEach(() => {
      jest.resetModules();
      const obj = loader('..');
      const logger = new obj.Logger({ logLevel: 'info' });
      logger.info('afterEach');
    });

    it('toBeUndefined prompt', () => {
      const obj = loader('..');
      const logger = new obj.Logger({ logLevel: 'info' });
      expect(logger.info({ timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });
});
