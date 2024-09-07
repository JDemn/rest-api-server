const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

/**
 * @helper logger
 * @description Custom logger configuration using Winston. Logs are rotated daily, with both file and console outputs.
 * In production, logs are set to 'info' level, while in development, they are set to 'debug' level for more detailed logging.
 * @param {string} level - The logging level based on the environment (`info` for production, `debug` for development).
 * @param {string} format - Log format combining colorization, timestamps, and custom message formatting.
 * @transports {DailyRotateFile} - Stores logs in a daily rotated file with a maximum size of 20MB and up to 14 days of logs.
 * @transports {Console} - Outputs logs to the console for real-time viewing.
 * @returns {Object} - The configured Winston logger instance.
 */
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',  
      maxFiles: '14d'  
    }),
    new transports.Console(),
  ],
});

module.exports = {
    logger
}
