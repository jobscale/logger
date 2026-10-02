# @jobscale/logger

## Options

### logLevel

0  'error',
1  'warn',
2  'info',
3  'debug',
4  'trace',

default 'info'

## Installation

```
npm i @jobscale/logger
```

## Nodejs Examples

ES Module

```javascript
import { Logger, logger, createLogger } from '@jobscale/logger';

logger.info('hello 01', Date.now());

const logger2 = new Logger({ logLevel: 'info', timestamp: true });
logger2.info('hello 02', Date.now());

const logger3 = createLogger('info', { timestamp: true });
logger3.info('hello 03', Date.now());

const logger4 = createLogger({ level: 'info', timestamp: true });
logger4.info('hello 04', Date.now());
```

CommonJs

```javascript
const main = async () => {
  const { Logger, logger, createLogger } = await import('@jobscale/logger');

  logger.info('hello 01', Date.now());

  const logger2 = new Logger({ logLevel: 'info', timestamp: true });
  logger2.info('hello 02', Date.now());

  const logger3 = createLogger('info', { timestamp: true });
  logger3.info('hello 03', Date.now());

  const logger4 = createLogger({ level: 'info', timestamp: true });
  logger4.info('hello 04', Date.now());
};

main();
```

## Using Browser

 ES Module Browser

```html
<script type="module">
import { Logger, logger, createLogger } from 'https://esm.sh/@jobscale/logger';

logger.info('hello 01', Date.now());

const logger2 = new Logger({ logLevel: 'info', timestamp: true });
logger2.info('hello 02', Date.now());

const logger3 = createLogger('info', { timestamp: true });
logger3.info('hello 03', Date.now());

  const logger4 = createLogger({ logLevel: 'info', timestamp: true });
  logger4.info('hello 04', Date.now());
</script>
```

 CommonJs Browser

```html
<script>
const main = async () => {
  const  { Logger, logger, createLogger } = await import('https://esm.sh/@jobscale/logger');

  logger.info('hello 01', Date.now());

  const logger2 = new Logger({ logLevel: 'info', timestamp: true });
  logger2.info('hello 02', Date.now());

  const logger3 = createLogger('info', { timestamp: true });
  logger3.info('hello 03', Date.now());

  const logger4 = createLogger({ logLevel: 'info', timestamp: true });
  logger4.info('hello 04', Date.now());
};
</script>
```
