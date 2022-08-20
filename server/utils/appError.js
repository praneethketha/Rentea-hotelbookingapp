class AppError extends Error {
  // error codes -> 5 (server error), 4(authentication, bad request errors)
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
    // built the stack tarce for us
    // stack trace -> error happens (react ,node) -> details of the error, in which file the error actually happened, Lin 13 error has happened
  }
}

module.exports = AppError;
