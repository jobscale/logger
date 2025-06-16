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

## Examples

```javascript
const { Logger } = require('@jobscale/logger');
// or
// const { createLogger } = require('@jobscale/logger');

const logger = new Logger({ logLevel: 'info', timestamp: true });
// or
// const logger = createLogger('info', { timestamp: true });

logger.info({ 'epoch milliseconds': Date.now() });
logger.debug('Do not output');
```

## Using Browser
```html
<script src="https://cdn.jsdelivr.net/npm/@jobscale/logger/index.min.js"></script>
<script>
  // global logger
  (() => {
    logger.info('hello 01', Date.now());
  })();

  // logger instance
  (() => {
    const { Logger } = logger;
    const log = new Logger({ logLevel: 'info', timestamp: true });
    log.info('hello 02', Date.now());
  })();

  // helper method
  (() => {
    const { createLogger } = logger;
    const log = createLogger('info', { timestamp: true });
    log.info('hello 03', Date.now());
  })();
</script>
```

## Using Browser ES
```javascript
<script type="module">
  // global logger
  import logger from 'https://cdn.jsdelivr.net/npm/@jobscale/logger/index.min.js';

  logger.info('hello 01', Date.now());
</script>

<script type="module">
  // logger instance
  import { logger } from 'https://cdn.jsdelivr.net/npm/@jobscale/logger/index.min.js';

  const log = new Logger({ logLevel: 'info', timestamp: true });
  log.info('hello 02', Date.now());
</script>

<script type="module">
  // helper method
  import { createLogger } from 'https://cdn.jsdelivr.net/npm/@jobscale/logger/index.min.js';

  const log = createLogger('info', { timestamp: true });
  log.info('hello 03', Date.now());
</script>
```
