import {enumErrors} from "../errors/enumErrors.js";

export default (error, req, res, next) => {
  switch (error.code) {
    case enumErrors.ERROR_FROM_SERVER:
      req.logger.http("statusCode: 500");
      req.logger.error(
        `The server has failed unexpectedly - ${error.toString()} - ${new Date().toLocaleString()}`
      );
      return res.status(500).send({
        status: 500,
        error: error.name || "Error unexpectedly from server",
        cause: error.cause || "The system failed when trying execute a process",
        message: error.message || "We are working to fix this issue",
      });
    case enumErrors.INVALID_FILTER:
      req.logger.http("statusCode: 400");
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    case enumErrors.MISSING_VALUES:
      req.logger.http("statusCode: 400");
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    case enumErrors.UNEXPECTED_VALUE:
      req.logger.http("statusCode: 400");
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    case enumErrors.UNAUTHORIZED:
      req.logger.http("statusCode: 401");
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    case enumErrors.NOT_FOUND:
      req.logger.http("statusCode: 404");
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    case enumErrors.INVALID_REQUEST:
      req.logger.http("statusCode: 400");
      return res.status(error.statusCode).send({
        status: error.statusCode,
        error: error.name,
        cause: error.cause,
        message: error.message,
      });
    default:
      req.logger.http("statusCode: 500");
      req.logger.fatal(error.toString());
      return res.status(500).send({
        status: 500,
        error: "Undefined",
        message: "We are working to fix this issue",
        cause: error.toString(),
      });
  }
};
