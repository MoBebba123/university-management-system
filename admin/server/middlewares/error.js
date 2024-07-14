import jwt from "jsonwebtoken";
const { TokenExpiredError } = jwt;
import ErrorHandler from "../utils/errorhandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // Wrong JWT error

  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid, Try again";
    err = new ErrorHandler(message, 400);
  }
  // JWT EXPIRE error

  if (err.name === "TokenExpiredError" || err instanceof TokenExpiredError) {
    const message = "Json Web Token is Expired, Try again";
    err = new ErrorHandler(message, 400);
  }

  return res.status(err.statusCode).send({
    success: false,
    message: err.message,
  });
};
