import jwt from "jsonwebtoken";
const { verify, TokenExpiredError, JsonWebTokenError } = jwt;

const verifyToken = async (req, res, next) => {
  const { admin_token } = req.cookies;

  if (!admin_token) {
    return res.status(401).send({ message: "NO TOKEN" });
  }
  try {
    const decodedData = verify(admin_token, process.env.JWT_SECRET);

    req.admin = decodedData;

    next();
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    //  error :TokenExpiredError
    if (error instanceof TokenExpiredError) {
      const message = "Json Web Token is Expired, Try again";
      return res.status(error.statusCode).send({
        success: false,
        message: message,
      });
      // Error:  Wrong JWT error
    } else if (error instanceof JsonWebTokenError) {
      const message = "Json Web Token is invalid, Try again";
      return res.status(error.statusCode).send({
        success: false,
        message: message,
      });
    } else {
      return res.send(error);
    }
  }
};
const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.admin = decode;
        next();
      }
    });
  } else {
    res.status(404).send({ message: "No Token" });
  }
};
const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "user is not authorized ",
      });
    }

    next();
  };
};
export { verifyToken, authorizedRoles, isAuth };
