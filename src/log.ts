const {format, createLogger, transports} = require('winston');

import * as fs from 'fs';
const logDir = 'logs';

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logger = createLogger({
    transports: [        
        new (transports.Console)({
          colorize: true,
          level: 'info',
          maxsize: 100000,
          maxFiles: 10,
          handleExceptions: true,
          json: true,
          stringify: (obj) => JSON.stringify(obj)
        })
    ]
});

//just log into container if is dev or tst environment
if (process.env.NODE_ENV && process.env.NODE_ENV.trim() !== 'production' && process.env.NODE_ENV.trim() !== 'staging') {
  logger.add(new (transports.File)({
    filename: `${logDir}/application.log`,
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.json()
    ),
    timestamp: true,
    maxsize: 100000,
    maxFiles: 10,
    handleExceptions: true,
    json: true,
    stringify: (obj) => JSON.stringify(obj)
  }));
}

module.exports=logger;
