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

const logger = new Logger({ logLevel: 'info' });
logger.info({ timestamp: Date.now() });
logger.trace('Do not output');
```
