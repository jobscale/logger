// test-flight
import { createLogger, Logger } from './index.mjs';

const Flight = {
  test01(msg, opt) {
    const logger = createLogger('info', opt);
    logger.info(msg, JSON.stringify(opt), 'Test 01');
  },

  test02(msg, opt) {
    const logger = createLogger('warn', opt);
    logger.warn(msg, JSON.stringify(opt), 'Test 02');
  },

  test03(msg, opt) {
    const logger = new Logger({ logLevel: 'info', ...opt });
    logger.info(msg, JSON.stringify(opt), 'Test 03');
  },

  test04(msg, opt) {
    const logger = new Logger({ logLevel: 'warn', ...opt });
    logger.warn(msg, JSON.stringify(opt), 'Test 04');
  },
};

const main = async () => {
  const list = [{
  }, {
    noPathName: true,
  }, {
    noType: true,
    noPathName: true,
  }, {
    timestamp: true,
    noPathName: true,
  }];
  for (const [key, func] of Object.entries(Flight)) {
    process.stdout.write('\n');
    for (const opt of list) {
      await func({ key }, opt);
      await new Promise(resolve => { setTimeout(resolve, 100); });
    }
  }
};

main();
