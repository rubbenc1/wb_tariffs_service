import log4js from 'log4js';


log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: 'logs/app.log' },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
    file: { appenders: ['file'], level: 'info' },
  },
});

// Create logger instances
const consoleLogger = log4js.getLogger(); // Default logger (console)
const fileLogger = log4js.getLogger('file'); // Logger for file logging

// Export loggers
export const logger = {
  info: (message: string) => consoleLogger.info(message),
  warn: (message: string) => consoleLogger.warn(message),
  error: (message: string) => {
    consoleLogger.error(message);
    fileLogger.error(message); // Log errors to both console and file
  },
  debug: (message: string) => consoleLogger.debug(message),
};
