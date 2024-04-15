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
    constructor(options = { logLevel: 'info' }) {
      this.logger = this;
      this.Logger = Logger;
      this.config(options);
      this.initialize();
    }

    config(options) {
      const logLevel = (options.logLevel || 'info').toLowerCase();
      this.timestamp = options.timestamp;
      this.level = LogLevels.indexOf(logLevel);
      this.callback = options.callback;
    }

    initialize() {
      const native = () => {};
      const logger = console;
      LogLevels.forEach(logLevel => {
        const level = LogLevels.indexOf(logLevel);
        this[logLevel] = (...args) => {
          const check = () => {
            if (!args.length) return undefined;
            const last = args[args.length - 1];
            if (typeof last !== 'object') return undefined;
            const { _cb: cb } = last;
            if (typeof cb !== 'function') return undefined;
            return cb;
          };
          const cb = check();
          if (this.level < level) {
            if (cb) cb({ disabled: true });
            return;
          }
          const LEVEL = `[${logLevel.toUpperCase()}]`;
          const recipe = [__fname, __line, LEVEL, ...args];
          if (this.timestamp) recipe.unshift(new Date().toISOString());
          logger[logLevel](...recipe);
          if (typeof this.callback === 'function') {
            this.callback({ logLevel, recipe });
          }
          if (cb) cb({ allowed: true });
        };
      });
      logger.log = native;
      logger.alert = native;
    }

    createLogger(logLevel = 'info', options = {}) {
      return new Logger({ logLevel, ...options });
    }
  }

  const logger = new Logger();
  if (typeof module !== 'undefined') module.exports = logger;
  if (typeof window !== 'undefined') window.logger = logger;
})();
