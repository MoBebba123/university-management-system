import { db } from "../config/db.js";
import { createExams, setParents } from "../functions/exams.js";

const getExams = (req, res, next) => {
  //   const id = req.professor.id;
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM Pruefungen WHERE pruefer=?`;

  const queryParams = [id];

  db.query(sqlQuery, queryParams, (err, data) => {
    if (err)
      return res.status(500).send({
        success: false,
        message: "Internal server error",
      });

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no exam found",
      });
    } else {
      let exams = [...data];

      exams = setParents(data);

      exams = createExams(exams);
      // exams = createExams(data);
      const sqlQuery = `SELECT * FROM Notenspiegel WHERE prueferId=?`;

      db.query(sqlQuery, queryParams, (err, data) => {
        if (err)
          return res.status(500).send({
            success: false,
            message: "Internal server error",
          });
        const noten = [...data];

        if (data.length === 0) {
          return res.status(404).json({
            success: false,
            message: "no Notenspiegel found",
          });
        } else {
          res.status(200).send({
            success: true,
            exams: exams,
            notenspiegel: noten,
          });
        }
      });
    }
  });
};

export { getExams };
