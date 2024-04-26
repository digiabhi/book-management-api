class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
    this.explanation = message;
  }
}

module.exports = AppError;
