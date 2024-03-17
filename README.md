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
// const logger = createLogger('info');

const logger = new Logger({ logLevel: 'info' });
logger.info({ timestamp: Date.now() });
logger.trace('Do not output');
```

## Using Browser
```html
<script src="https://cdn.jsdelivr.net/npm/@jobscale/logger/index.min.js"></script>
<script>
  logger.info('hello', Date.now());
</script>
```
