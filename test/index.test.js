const { Logger, createLogger } = require('..');

describe('allowed test logger', () => {
  describe('allowed logLevel', () => {
    it('toStrictEqual prompt allowed debug', () => {
      const localLogger = new Logger({ logLevel: 'debug' });
      let data;
      localLogger.debug({ msg: 'do work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ allowed: true });
    });

    it('toStrictEqual prompt allowed info', () => {
      const localLogger = createLogger('info');
      let data;
      localLogger.info({ msg: 'do work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ allowed: true });
    });

    it('toStrictEqual prompt allowed warn', () => {
      const localLogger = new Logger({ logLevel: 'warn' });
      let data;
      localLogger.warn({ msg: 'do work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ allowed: true });
    });

    it('toStrictEqual prompt allowed error', () => {
      const localLogger = new Logger({ logLevel: 'error' });
      let data;
      localLogger.error({ msg: 'do work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ allowed: true });
    });
  });

  describe('allowed multiple load', () => {
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

    it('toStrictEqual prompt allowed', () => {
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });

      let data;
      localLogger.info({ msg: 'do work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ allowed: true });
    });
  });
});

describe('disabled test logger', () => {
  describe('disabled logLevel', () => {
    it('toStrictEqual prompt disable debug', () => {
      const localLogger = new Logger({ logLevel: 'debug' });
      let data;
      localLogger.trace({ msg: 'not work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ disabled: true });
    });

    it('toStrictEqual prompt disable info', () => {
      const localLogger = createLogger('info');
      let data;
      localLogger.debug({ msg: 'not work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ disabled: true });
    });

    it('toStrictEqual prompt disable warn', () => {
      const localLogger = new Logger({ logLevel: 'warn' });
      let data;
      localLogger.info({ msg: 'not work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ disabled: true });
    });

    it('toStrictEqual prompt disable error', () => {
      const localLogger = new Logger({ logLevel: 'error' });
      let data;
      localLogger.warn({ msg: 'not work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ disabled: true });
    });
  });

  describe('disabled multiple load', () => {
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

    it('toStrictEqual prompt disabled', () => {
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });

      let data;
      localLogger.debug({ msg: 'not work' }, { _cb: res => { data = res; } });
      expect(data).toStrictEqual({ disabled: true });
    });
  });
});
