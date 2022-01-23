/* eslint-env browser */
/* global __fname, __line */

const LogLevels = [
  'fail',
  'error',
  'warn',
  'info',
  'trace',
  'debug',
];

const singleton = (() => {
  const obj = global || window;
  if (!obj.loggerSingleton) {
    obj.loggerSingleton = {
      native() {},
      instance: undefined,
    };
  }
  return obj.loggerSingleton;
})();

class Logger {
  constructor(options) {
    this.logger = this;
    this.Logger = Logger;
    this.logLevel = (options && options.logLevel ? options.logLevel : 'warn').toLowerCase();
    this.initialize();
  }

  initialize() {
    const { log } = console;
    if (log !== singleton.native) {
      singleton.instance = this;
      this.initializeProperty();
      this.std = {};
    } else {
      this.std = singleton.instance.std;
    }
    const std = console;
    LogLevels.forEach(logLevel => {
      if (!this.std[logLevel]) this.std[logLevel] = std[logLevel];
      const level = LogLevels.indexOf(logLevel);
      this[logLevel] = (...args) => {
        if (LogLevels.indexOf(this.logLevel) < level) return;
        const func = () => {
          if (logLevel === 'trace') return this.std.warn;
          if (!this.std[logLevel]) return this.std.error;
          return this.std[logLevel];
        };
        func()(__fname, __line, `[${logLevel}]`, ...args);
      };
      if (std[logLevel]) std[logLevel] = singleton.native;
    });
    std.log = singleton.native;
    std.alert = singleton.native;
  }

  initializeProperty() {
    Object.defineProperty(global, '__line', {
      get() { return new Error().stack.split('\n')[3].split(':').reverse()[1]; },
    });
    Object.defineProperty(global, '__fname', {
      get() { return new Error().stack.split('\n')[3].split(/[: ]/).reverse()[2]; },
    });
  }
}

module.exports = new Logger();
