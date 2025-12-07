/* global window, __line, __fname */
const self = {};

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
    get() { return new Error().stack.split('\n')[3]?.split(':').reverse()[1]; },
  });
  Object.defineProperty(globalObject, '__fname', {
    get() { return new Error().stack.split('\n')[3]?.split(/[:( ]/).reverse()[2]; },
  });
}

export class Logger {
  constructor(options = { logLevel: 'info' }) {
    this.logger = this;
    this.Logger = Logger;
    this.config(options);
    this.initialize();
  }

  config(options) {
    const logLevel = (options.logLevel || 'info').toLowerCase();
    this.level = LogLevels.indexOf(logLevel);
    this.timestamp = options.timestamp;
    this.noType = options.noType;
    this.noPathName = options.noPathName
      || typeof window !== 'undefined'
      || !!process?.env?.AWS_EXECUTION_ENV;
    this.callback = options.callback;
  }

  initialize() {
    this.setupGlobal();
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
        const recipe = [...args];
        if (!this.noType) recipe.unshift(LEVEL);
        if (!this.noPathName) recipe.unshift(`${__fname}:${__line}`);
        if (this.timestamp) recipe.unshift(new Date().toISOString());
        self.logger[logLevel](...recipe);
        if (typeof this.callback === 'function') {
          this.callback({ logLevel, recipe });
        }
        if (cb) cb({ allowed: true });
      };
    });
  }

  setupGlobal() {
    if (self.logger) return;
    const logger = (std => {
      const instant = {
        error: std.error,
        warn: std.warn,
        info: std.info,
        debug: typeof window !== 'undefined' ? std.log : std.debug,
        trace: std.trace,
      };
      const native = () => {};
      std.error = native;
      std.warn = native;
      std.info = native;
      std.debug = native;
      std.trace = native;
      std.log = native;
      std.alert = native;
      return instant;
    })(console);
    Object.assign(self, { logger });
  }

  createLogger(logLevel = 'info', options = {}) {
    return new Logger({ logLevel, ...options });
  }
}

export const logger = new Logger();
export const { createLogger } = logger;
export default {
  Logger,
  logger,
  createLogger,
};
