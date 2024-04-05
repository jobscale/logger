// test-flight
const { createLogger, Logger } = require('.');

const Flight = {
  test01(opt) {
    const logger = createLogger('info', { timestamp: true });
    logger.info(opt, 'Test 01 Hello World');
  },

  test02(opt) {
    const logger = createLogger('info');
    logger.info(opt, 'Test 02 Hello World');
  },

  test03(opt) {
    const logger = new Logger({ logLevel: 'info', timestamp: true });
    logger.info(opt, 'Test 03 Hello World');
  },

  test04(opt) {
    const logger = new Logger({ logLevel: 'info' });
    logger.info(opt, 'Test 04 Hello World');
  },
};

const wait = ms => new Promise(resolve => { setTimeout(resolve, ms); });

const run = async opt => {
  for (const method of Object.values(Flight)) {
    method(opt);
    await wait(1000);
  }
};

const main = async () => {
  for (let i = 0; i < 3; i += 1) {
    await run({ i });
  }
};

main();
