import sendToken from "../utils/sendToken.js";

const login = (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const user = {
      username,
      password,
    };

    sendToken(user, 200, res);
  } else {
    res.status(400).json({ success: false, message: "Wrong Credentials!" });
  }
};
const logout = (req, res) => {
  res
    .clearCookie("admin_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ success: true, message: "logged out." });
};
export { login, logout };
