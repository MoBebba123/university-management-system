// Create Token and saving in cookie
import jwt from "jsonwebtoken";

const sendToken = (user, statusCode, res) => {
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  const { password, ...otherDetails } = user;
  const token = jwt.sign({ ...otherDetails }, "jwtkey", {
    expiresIn: "1d",
  });

  res.status(statusCode).cookie("professor_token", token, options).json({
    success: true,
    message: "logged in",
    user: otherDetails,
    token,
  });
};

export default sendToken;
