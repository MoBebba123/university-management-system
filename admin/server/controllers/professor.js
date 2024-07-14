import { db } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const addProfessor = (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  const id = uuidv4();
  //Hash the password and create a user
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const sqlQuery = `INSERT INTO Professor(id, username, firstname, lastname, email, password) VALUES(?,?,?,?,?,?)`;

  let queryParams = [id, username, firstname, lastname, email, hashed_password];

  db.query(sqlQuery, queryParams, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.send({ success: true, message: "Professor created" });
    }
  });
};

const getProfessors = (req, res) => {
  const sqlQuery = `SELECT * FROM Professor ORDER BY created_at DESC`;

  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.send({
        success: true,
        message: "ProfessorList get succussfull",
        professorList: data,
      });
    }
  });
};
const deleteProfessorById = (req, res) => {
  const id = req.params.id;
  const sqlQuery = `delete from Professor WHERE id="${id}" `;
  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.status(200).json({
        success: true,
        message: "student deleted successfull",
      });
    }
  });
};

export { addProfessor, getProfessors, deleteProfessorById };
