import { db } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { createExams } from "../functions/exam.js";
/**
 * @description API-Funktionen für die Verwaltung von Prüfungsdaten in der Notenspiegel- und Anmeldeliste-Datenbank.
 * @version 1.0.2
 * @author Mohamed Bebba
 */

const addExam = (req, res) => {
  const id = uuidv4();
  const { title, pruefungensnr, studiengangId } = req.body;
  const parentId = req.body.parentId;
  const pruefer = req.body.pruefer;
  const raum = req.body.raum;
  const semester = req.body.semester;
  const datum = req.body.datum;
  const beginn = req.body.beginn;
  const ende = req.body.ende;
  const ruecktrittbis = req.body.ruecktrittbis;
  const credit_point = req.body.credit_point;

  let sqlQuery = `INSERT INTO Pruefungen(id,parentId,title,datum,beginn,ende,pruefer,semester,pruefungensnr,studiengangId,raum,ruecktrittbis,credit_point) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  let queryParams = [
    id,
    parentId,
    title,
    datum,
    beginn,
    ende,
    pruefer,
    semester,
    pruefungensnr,
    studiengangId,
    raum,
    ruecktrittbis,
    credit_point,
  ];

  db.query(sqlQuery, queryParams, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.send({ success: true, message: "exam created" });
    }
  });
};

const updateExam = (req, res) => {
  const id = req.params.id;
  const { title, pruefungensnr, studiengangId } = req.body;
  const parentId = req.body.parentId || null;
  const pruefer = req.body.pruefer || null;

  const raum = req.body.raum || null;
  const semester = req.body.semester || null;
  const datum = req.body.datum || null;
  const beginn = req.body.beginn || null;
  const ende = req.body.ende || null;
  const ruecktrittbis = req.body.ruecktrittbis || null;
  const credit_point = req.body.credit_point || null;

  let sqlQuery = `
    UPDATE Pruefungen 
    SET title=?, pruefungensnr=?, studiengangId=?, parentId=?, pruefer=?, 
    raum=?, semester=?, datum=?, beginn=?, ende=?, ruecktrittbis=?, credit_point=?, updated_at= CURRENT_TIMESTAMP
    WHERE id=?`;

  let queryParams = [
    title,
    pruefungensnr,
    studiengangId,
    parentId,
    pruefer,
    raum,
    semester,
    datum,
    beginn,
    ende,
    ruecktrittbis,
    credit_point,
    id,
  ];

  if (id === parentId)
    return res.status(400).json({
      message: "id and parent id should not be equal",
    });
  db.query(sqlQuery, queryParams, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length === 0)
      return res.status(404).json({
        success: false,
        message: `no exam found with id ${id}`,
      });

    if (data) {
      res.send({ success: true, message: "exam updated" });
    }
  });
};
const getExams = (req, res) => {
  const sqlQuery = `
  SELECT 
  p.*,
  s.title AS studiengangstitle,
  Professor.firstname AS pruefer_firstname,
  Professor.lastname AS pruefer_lastname

  FROM Pruefungen p
  LEFT JOIN Studiengang s ON p.studiengangId = s.id
  LEFT JOIN 
    Professor ON p.pruefer = Professor.id;

  `;

  db.query(sqlQuery, (err, data) => {
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

const deleteExamById = (req, res) => {
  const id = req.params.id;
  const sqlQuery = `delete from Pruefungen WHERE id="${id}" `;
  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.status(200).json({
        success: true,
        message: "exam deleted successfull",
      });
    }
  });
};
const getExamById = (req, res) => {
  const id = req.params.id;
  const sqlQuery = `SELECT * FROM Pruefungen WHERE id="${id}" `;
  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.status(200).json({
        success: true,
        message: "exam get successfull",
        exam: data[0],
      });
    }
  });
};
export { addExam, getExams, deleteExamById, getExamById, updateExam };
