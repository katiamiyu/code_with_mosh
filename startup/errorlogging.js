const winston = require('winston');
require('winston-mongodb');

module.exports = (connectionStr)=>{
  process.on('unhandledRejection', (ex)=>{
  throw ex;
});

winston.add(
  new winston.transports.File({
      filename: 'logfile.log',
      level: 'error'
    }),
  );
winston.add(
  new winston.transports.MongoDB(
    {
      db: connectionStr,
      level: 'error'
    })
  );
winston.add(
  new winston.transports.Console({
  level: 'info',
  colorize: true
})
);
winston.exceptions.handle(
  new winston.transports.Console({
    colorize: true,
    prettyprint: true
  }),
  new winston.transports.File({filename: 'exceptionlogs.log'}));
};