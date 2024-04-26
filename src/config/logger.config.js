const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const path = require("path");

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} : ${level} : ${message}`;
});

const logFilePath = path.join(__dirname, "..", "logs", "combined.log");

const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFilePath }),
  ],
});

module.exports = logger;
