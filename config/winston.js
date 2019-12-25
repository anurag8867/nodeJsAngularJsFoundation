var appRoot = require('app-root-path');
var winston = require('winston');
const date = new Date(),
    path = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/${path}.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };
  var logger = new winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };
  module.exports = logger;