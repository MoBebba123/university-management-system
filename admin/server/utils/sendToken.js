// Create Token and saving in cookie
import jwt from "jsonwebtoken";

const sendToken = (user, statusCode, res) => {
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    secure: true, // Set the secure flag for HTTPS
    sameSite: "none", // Set SameSite to 'None' for cross-origin requests
    // domain: ".vercel.app",
  };
  const { password, ...otherDetails } = user;
  const token = jwt.sign(
    { ...otherDetails, isAdmin: true },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  res.status(statusCode).cookie("admin_token", token, options).json({
    success: true,
    message: "logged test",
    user: otherDetails,
    token,
  });
};

export default sendToken;
