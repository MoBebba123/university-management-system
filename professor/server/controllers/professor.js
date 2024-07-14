import { db } from "../config/db.js";

const getUserDetails = (req, res) => {
  const professorId = req.professor.id;

  const sqlQuery = `SELECT * from Professor WHERE id='${professorId}'`;

  db.query(sqlQuery, (err, data) => {
    if (err) return res.send(err);

    if (data) {
      const user = { ...data[0] };
      const { password, ...ortherDetails } = user;

      res.send(ortherDetails);
    }
  });
};

export { getUserDetails };
