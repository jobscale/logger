/* global __line, __fname */
(() => {
  const LogLevels = [
    'error',
    'warn',
    'info',
    'debug',
    'trace',
  ];

  if (typeof __line === 'undefined') {
    const globalObject = typeof global !== 'undefined' ? global : window;
    Object.defineProperty(globalObject, '__line', {
      get() { return new Error().stack.split('\n')[3].split(':').reverse()[1]; },
    });
    Object.defineProperty(globalObject, '__fname', {
      get() { return new Error().stack.split('\n')[3].split(/[:( ]/).reverse()[2]; },
    });
  }

  class Logger {
    constructor(options) {
      this.logger = this;
      this.Logger = Logger;
      this.config(options);
      this.initialize();
    }

    config(options) {
      const logLevel = (options?.logLevel ?? 'info').toLowerCase();
      this.level = LogLevels.indexOf(logLevel);
    }

    initialize() {
      const native = () => {};
      const mummy = console;
      LogLevels.forEach(logLevel => {
        const level = LogLevels.indexOf(logLevel);
        this[logLevel] = (...args) => {
          if (this.level < level) return;
          const LEVEL = `[${logLevel.toUpperCase()}]`;
          mummy[logLevel](__fname, __line, LEVEL, ...args);
        };
      });
      mummy.log = native;
      mummy.alert = native;
    }
  }

  if (typeof module !== 'undefined') module.exports = new Logger();
  if (typeof window !== 'undefined') window.logger = new Logger();
})();
