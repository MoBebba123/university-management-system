import { db } from "../config/db.js";
import sendToken from "../utils/sendToken.js";
import bcryptjs from "bcryptjs";
const { compareSync } = bcryptjs;

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({
      succuss: false,
      message: "please fill all fields",
    });
  // select query
  // check if user exists

  const sqlQuery = `SELECT * FROM Professor WHERE email=? `;

  const queryParams = [email];

  db.query(sqlQuery, queryParams, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length) {
      const isPasswordCorrect = compareSync(password, data[0].password);
      if (!isPasswordCorrect)
        return res.status(401).send({
          success: false,
          message: "password incorrect ",
        });
      sendToken(data[0], 200, res);
    }
  });
};

const logout = (req, res) => {
  res
    .clearCookie("professor_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ success: true, message: "professor has been logged out." });
};

export { login, logout };
