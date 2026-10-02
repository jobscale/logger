import { Logger, logger, createLogger } from './index.js';

logger.info('hello 01', Date.now());

const logger2 = new Logger({ logLevel: 'info', timestamp: true });
logger2.info('hello 02', Date.now());

const logger3 = createLogger('info', { timestamp: true });
logger3.info('hello 03', Date.now());

const logger4 = createLogger({ level: 'info', timestamp: true });
logger4.info('hello 04', Date.now());
