import { db } from "../config/db.js";
import { createExams } from "../functions/exam.js";

const getExams = (req, res) => {
  const studiengangId = req.student.studiengangId;
  const sqlQuery = `
  SELECT 
  p.*,
  Professor.firstname AS pruefer_firstname,
  Professor.lastname AS pruefer_lastname
  FROM Pruefungen p
  LEFT JOIN 
    Professor ON p.pruefer = Professor.id
    WHERE p.studiengangId = ?;
  `;
  const queryParams = [studiengangId];
  db.query(sqlQuery, queryParams, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      const examList = createExams(data);
      res.status(200).json({
        success: true,
        message: "examList get request successfull",
        examList,
      });
    }
  });
};

export { getExams };
