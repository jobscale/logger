# @jobscale/logger

## Options

### logLevel

  'fail',
  'error',
  'warn',
  'info',
  'trace',
  'debug',

default 'info'

## Installation

```
npm i @jobscale/logger
```

## Examples

```javascript
const { Logger } = require('@jobscale/logger');

const logger = new Logger({ logLevel: 'info' });
logger.info({ timestamp: Date.now() });
logger.trace('Do not output');
```
