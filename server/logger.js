const winston = require("winston");

// Global logger instance for the application
var logger = module.exports = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports.setLogLevel = function(logLvl) {
  logger.configure({
    level: logLvl,
    transports: [
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ]
  });
}

module.exports.getLogLevel = function() {
  return logLevel;
}
