const constants = require("../constants");
const logger = require("../utils/logger"); // add logger

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : 500;

  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    user: req.user ? req.user.id : "anonymous"
  });

  const isProduction = process.env.NODE_ENV === "production";

  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.status(400).json({
        title: "Bad request",
        message: err.message,
        ...(isProduction ? {} : { stack: err.stack })
      });
      break;

    case constants.UNAUTHORIZED:
      res.status(401).json({
        title: "Invalid Credentials",
        message: err.message,
        ...(isProduction ? {} : { stack: err.stack })
      });
      break;

    case constants.FORBIDDEN:
      res.status(403).json({
        title: "User is not allowed to do the action",
        message: err.message,
        ...(isProduction ? {} : { stack: err.stack })
      });
      break;

    case constants.NOT_FOUND:
      res.status(404).json({
        title: "Requested Resource not found",
        message: err.message,
        ...(isProduction ? {} : { stack: err.stack })
      });
      break;

    case constants.CONFLICT:
      res.status(409).json({
        title: "Resource already exists",
        message: err.message,
        ...(isProduction ? {} : { stack: err.stack })
      });
      break;

    default:
      res.status(500).json({
        title: "Internal server error",
        message: isProduction ? "Something went wrong" : err.message,
        ...(isProduction ? {} : { stack: err.stack })
      });
  }
};

module.exports = errorHandler;