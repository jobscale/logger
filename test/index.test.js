const { Logger, createLogger } = require('..');

describe('test logger', () => {
  describe('logLevel', () => {
    it('toStrictEqual prompt debug', () => {
      const localLogger = new Logger({ logLevel: 'debug' });
      localLogger.debug({ msg: 'do work' }, res => {
        expect(res).toStrictEqual({ allowed: true });
      });
      localLogger.trace({ msg: 'not work' }, res => {
        expect(res).toStrictEqual({ disabled: true });
      });
    });

    it('toStrictEqual prompt info', () => {
      const localLogger = createLogger('info');
      localLogger.info({ msg: 'do work' }, res => {
        expect(res).toStrictEqual({ allowed: true });
      });
      localLogger.debug({ msg: 'not work' }, res => {
        expect(res).toStrictEqual({ disabled: true });
      });
    });

    it('toStrictEqual prompt warn', () => {
      const localLogger = new Logger({ logLevel: 'warn' });
      localLogger.warn({ msg: 'do work' }, res => {
        expect(res).toStrictEqual({ allowed: true });
      });
      localLogger.info({ msg: 'not work' }, res => {
        expect(res).toStrictEqual({ disabled: true });
      });
    });

    it('toStrictEqual prompt error', () => {
      const localLogger = new Logger({ logLevel: 'error' });
      localLogger.error({ msg: 'do work' }, res => {
        expect(res).toStrictEqual({ allowed: true });
      });
      localLogger.warn({ msg: 'not work' }, res => {
        expect(res).toStrictEqual({ disabled: true });
      });
    });
  });

  describe('multiple load', () => {
    const loader = require;
    beforeEach(() => {
      jest.resetModules();
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      localLogger.info('beforeEach');
    });

    afterEach(() => {
      jest.resetModules();
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      localLogger.info('afterEach');
    });

    it('toStrictEqual prompt', () => {
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });

      localLogger.info({ msg: 'do work' }, res => {
        expect(res).toStrictEqual({ allowed: true });
      });
      localLogger.debug({ msg: 'not work' }, res => {
        expect(res).toStrictEqual({ disabled: true });
      });
    });
  });
});
