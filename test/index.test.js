const { Logger, createLogger } = require('..');

describe('test allowed logger', () => {
  describe('allowed logLevel', () => {
    it('toStrictEqual prompt allowed debug', done => {
      const localLogger = new Logger({ logLevel: 'debug' });
      localLogger.debug({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          done();
        },
      });
    });

    it('toStrictEqual prompt allowed info', done => {
      const localLogger = createLogger('info');
      localLogger.info({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          done();
        },
      });
    });

    it('toStrictEqual prompt allowed warn', done => {
      const localLogger = new Logger({ logLevel: 'warn' });
      localLogger.warn({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          done();
        },
      });
    });

    it('toStrictEqual prompt allowed error', done => {
      const localLogger = new Logger({ logLevel: 'error' });
      localLogger.error({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          done();
        },
      });
    });
  });

  describe('multiple load allowed logger', () => {
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

    it('toStrictEqual prompt allowed', done => {
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      localLogger.info({ msg: 'do work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ allowed: true });
          done();
        },
      });
    });
  });
});

describe('test disabled logger', () => {
  describe('disabled logLevel', () => {
    it('toStrictEqual prompt disable debug', done => {
      const localLogger = new Logger({ logLevel: 'debug' });
      localLogger.trace({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          done();
        },
      });
    });

    it('toStrictEqual prompt disable info', done => {
      const localLogger = createLogger('info');
      localLogger.debug({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          done();
        },
      });
    });

    it('toStrictEqual prompt disable warn', done => {
      const localLogger = new Logger({ logLevel: 'warn' });
      localLogger.info({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          done();
        },
      });
    });

    it('toStrictEqual prompt disable error', done => {
      const localLogger = new Logger({ logLevel: 'error' });
      localLogger.warn({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          done();
        },
      });
    });
  });

  describe('multiple load disabled logger', () => {
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

    it('toStrictEqual prompt disabled', done => {
      const obj = loader('..');
      const localLogger = new obj.Logger({ logLevel: 'info' });
      localLogger.debug({ msg: 'not work' }, {
        _cb: res => {
          expect(res).toStrictEqual({ disabled: true });
          done();
        },
      });
    });
  });
});
