import { db } from "../config/db.js";
import sendToken from "../utils/sendToken.js";
import bcryptjs from "bcryptjs";
const { compareSync } = bcryptjs;

const login = (req, res) => {
  const { email, password } = req.body;

  // check if the studennt exists in the DB
  const sqlQuery = `SELECT * from Studenten WHERE email= ?`;
  db.query(sqlQuery, [email], (err, data) => {
    if (err) return res.status(500).json(err); // 500: internel server error
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student does not exists",
      });
    }
    const isPasswordCorrect = compareSync(password, data[0].password);

    if (!isPasswordCorrect)
      return res.status(400).json({
        success: false,
        message: "wrong credentials",
      });

    sendToken(data[0], 200, res);
  });
};
const logout = (req, res) => {
  res
    .clearCookie("student_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ success: true, message: "student has been logged out." });
};
export { login, logout };
