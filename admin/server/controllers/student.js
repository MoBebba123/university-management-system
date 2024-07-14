import { db } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { generateMatrikelNummer } from "../functions/students.js";

const addStudenten = (req, res) => {
  const { username, firstname, lastname, email, password, studiengangId } =
    req.body;
  const id = uuidv4();
  const matrikelnummer = generateMatrikelNummer();
  //Hash the password and create a user
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const sqlQuery = `INSERT INTO Studenten(id, username, firstname, lastname, email, password,studiengangId,matrikelnummer) VALUES(?,?,?,?,?,?,?,?)`;

  let queryParams = [
    id,
    username,
    firstname,
    lastname,
    email,
    hashed_password,
    studiengangId,
    matrikelnummer,
  ];

  db.query(sqlQuery, queryParams, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.send({ success: true, message: "Studenten created" });
    }
  });
};

const getStudenten = (req, res) => {
  const sqlQuery = `SELECT * FROM Studenten ORDER BY created_at DESC`;

  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.send({
        success: true,
        message: "StudentenList get succussfull",
        studentList: data,
      });
    }
  });
};

const deleteStudentById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const sqlQuery = `delete from Studenten WHERE id="${id}" `;
  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.json({
        success: true,
        message: "student deleted successfull",
      });
    }
  });
};
export { addStudenten, getStudenten, deleteStudentById };
