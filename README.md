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

- ES Module Browser
```html
<script type="module">
  import { Logger, logger, createLogger } from 'https://esm.sh/@jobscale/logger';

  logger.info('hello 01', Date.now());

  const logger2 = new Logger({ logLevel: 'info', timestamp: true });
  logger2.info('hello 02', Date.now());

  const logger3 = createLogger('info', { timestamp: true });
  logger3.info('hello 03', Date.now());
</script>
```
