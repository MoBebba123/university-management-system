import { db } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const addStudiengang = (req, res) => {
  const { title, po_version } = req.body;
  const id = uuidv4();

  const sqlQuery = `INSERT INTO Studiengang(id,title,po_version) VALUES(?,?,?)`;

  let queryParams = [id, title, po_version];

  db.query(sqlQuery, queryParams, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.send({ success: true, message: "Studiengang created" });
    }
  });
};
const updateStudiengang = (req, res) => {
  const id = req.params.id;
  const { title, po_version } = req.body;
  if (!title || !po_version) {
    return res
      .status(400)
      .send({ success: false, message: "please complete all fields" });
  }
  const sqlQuery = `
    UPDATE Studiengang 
    SET title=?, po_version=?, updated_at= CURRENT_TIMESTAMP
    WHERE id=?`;

  const queryParams = [title, po_version, id];

  db.query(sqlQuery, queryParams, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.send({ success: true, message: "Studiengang updated" });
    }
  });
};
const getStudiengang = (req, res) => {
  const sqlQuery = `SELECT * FROM Studiengang`;

  db.query(sqlQuery, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data) {
      res.send({
        success: true,
        message: "StudiengangList get succussfull",
        studiengangList: data,
      });
    }
  });
};

const deleteStudiengangById = (req, res) => {
  const id = req.params.id;
  const sqlQuery = `delete from Studiengang WHERE id="${id}" `;
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
export {
  addStudiengang,
  getStudiengang,
  deleteStudiengangById,
  updateStudiengang,
};
