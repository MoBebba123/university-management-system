import { db } from "../config/db.js";

const getStudentById = (req, res) => {
  const studentId = req.student.id;

  const sqlQuery = `SELECT * from Studenten WHERE id='${studentId}'`;

  db.query(sqlQuery, (err, data) => {
    if (err) return res.send(err);

    if (data) {
      const user = { ...data[0] };
      const { password, ...ortherDetails } = user;

      res.send(ortherDetails);
    }
  });
};
export { getStudentById };
