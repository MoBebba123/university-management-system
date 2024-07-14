import { db } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
/**
 * @description API für das Einfügen von Prüfungsdatensätzen in die Notenspiegel- und Anmeldeliste-Datenbank.
 * Ermöglicht das Einfügen von Anfangsdatensätzen sowie einzelnen Prüfungsdatensätzen.
 * @version 1.0.2
 * @author Mohamed Bebba
 */

/**
 * @description Masseneinfügung von Anfangsprüfungsdatensätzen mit Eltern-Kind-Beziehungen.
 * @function
 * @name insertInitialRecords
 * @param {Array} exams - Ein Array von Prüfungsdaten.
 * @param {string|null} parentId - Die optionale Eltern-ID.
 * @param {string} studentId - Die ID des Studenten.
 * @param {Object} res - Response-Instanz für die Verarbeitung von Rückgabewerten.e
 */
const insertInitialRecords = async (exams, parentId = null, studentId, res) => {
  // Prüfen, ob exams ein Array ist und nicht leer
  if (!Array.isArray(exams) || exams.length === 0) {
    return; // Keine Prüfungen zum Einfügen
  }

  const insertRecords = async () => {
    for (const exam of exams) {
      const { pruefungensnr, title, credit_point, id: pruefungsId } = exam;
      const id = uuidv4();

      const insertQuery = `
        INSERT INTO Notenspiegel
        (id, studentId, pruefungsId, parentId, pruefungsnr, pruefungstext, cp_to_achieve)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `;
      const insertValues = [
        id,
        studentId,
        pruefungsId,
        parentId || null,
        pruefungensnr,
        title,
        credit_point,
      ];

      try {
        await new Promise((resolve, reject) => {
          //  Promise to wait for the query to complete
          db.query(insertQuery, insertValues, (insertErr, insertResult) => {
            if (insertErr) {
              reject(insertErr);
            } else {
              resolve();
            }
          });
        });

        // Recursively insert records for children
        if (exam.children && exam.children.length > 0) {
          await insertInitialRecords(exam.children, id, studentId, res);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error",
        });
        return;
      }
    }
  };

  // Call the async function
  insertRecords();
};
const insertExamRecord = (req, res) => {
  const studentId = req.student.id;
  const { desiredExam } = req.body;
  const examToRegister = JSON.parse(desiredExam);
  const {
    pruefungensnr,
    title,
    parentId,
    pruefer,
    datum,
    credit_point,
    id: examId,
    semester,
  } = examToRegister;
  const selectQuery =
    "SELECT * FROM Notenspiegel WHERE studentId=? AND pruefungsId=?";
  const values = [studentId, parentId.toString()];
  // const parsedDate = new Date(datum);

  // const formattedDate = parsedDate.toISOString().slice(0, 10);
  const formattedDate = datum
    ? new Date(datum).toISOString().slice(0, 10)
    : null;
  db.query(selectQuery, values, (err, data) => {
    if (err) {
      console.error("Error in SELECT query:", err);
      return res.status(500).send(err);
    }

    if (data.length) {
      const id = uuidv4();
      const newParentId = data[0].id;
      const insertQuery = `
      INSERT INTO Notenspiegel
      (id, studentId, pruefungsId, parentId, prueferId, pruefungsnr, pruefungstext, versuch, status, pruefungsdatum, cp_to_achieve,semester)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
      `;
      const insertValues = [
        id,
        studentId,
        examId,
        newParentId,
        pruefer,
        pruefungensnr,
        title,
        1,
        "angemeldet",
        formattedDate,
        credit_point,
        semester,
      ];
      db.query(insertQuery, insertValues, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json({
          success: true,
          message: "pruefung angemeldet",
        });
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "no records found",
      });
    }
  });
};

const registerStudentForExam = (studentId, examsId, res) => {
  const anmeldelistenId = uuidv4();
  const sqlQuery = `INSERT INTO Anmeldelisten(id,studentId, pruefungsId, anmeldedatum) VALUES(?,?,?,CURRENT_TIMESTAMP)`;
  const queryParams = [anmeldelistenId, studentId, examsId];

  db.query(sqlQuery, queryParams, (err, data) => {
    if (err)
      return res.status(500).json({
        succuss: false,
        err,
      });
  });
};

const registerForExam = (req, res, next) => {
  const { initialdata, desiredExam } = req.body;
  const examToRegister = JSON.parse(desiredExam);
  const initialExamsDataDataArray = JSON.parse(initialdata);
  const studentId = req.student.id;
  const {
    pruefungensnr,
    title,
    parentId,
    pruefer,
    datum,
    credit_point,
    id: examId,
    semester,
  } = examToRegister;
  if (!semester || !pruefer || !credit_point || !pruefungensnr || !title) {
    return res.status(400).send({
      success: false,
      message:
        "Can not register for the exam due to insufficient exams data please contact your university",
    });
  }
  // check if the student has regeistered for the first exam for the first time
  const sqlQuery = "SELECT * FROM Notenspiegel WHERE studentId=?";
  db.query(sqlQuery, [studentId], (err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
    if (data.length === 0) {
      db.getConnection((getConnectionErr, connection) => {
        if (getConnectionErr) return res.status(500).send(getConnectionErr);

        connection.beginTransaction((beginTransactionErr) => {
          if (beginTransactionErr) {
            connection.release(); // Release the connection in case of an error
            return res.status(500).send(beginTransactionErr);
          }

          // Insert initial records
          insertInitialRecords(initialExamsDataDataArray, null, studentId, res);

          registerStudentForExam(studentId, examId, res);
          // Commit the transaction
          connection.commit((commitErr) => {
            if (commitErr) {
              console.error(commitErr);
              connection.rollback(); // Rollback the transaction in case of an error
              connection.release(); // Release the connection
              return res.status(500).json({
                success: false,
                message: "Transaction Failed",
              });
            }

            // Release the connection after a successful commit
            connection.release();
            return res.status(200).json({
              success: true,
              message: "pruefung angemeldet",
            });
          });
        });
      });
    } else {
      //the student has already registred for an exam in the past
      //check how many time the student has registred for the  exam
      const sqlQuery = `SELECT * FROM Notenspiegel WHERE studentId='${studentId}' AND pruefungstext='${title}' AND status="nicht bestanden"`;
      db.query(sqlQuery, (err, data) => {
        if (err) return res.status(500).send(err);
        // return res.send(data);

        var numbersOfFailure = data.length;
        // if yes create Notenspiegel with versuch = versuch +1
        if (data.length > 0) {
          const id = uuidv4();
          const versuch = numbersOfFailure + 1;

          const formattedDate = datum
            ? new Date(datum).toISOString().slice(0, 10)
            : null;

          const insertQuery = `
          INSERT INTO Notenspiegel
          (id, studentId, pruefungsId, parentId, prueferId, pruefungsnr, pruefungstext, versuch, status, pruefungsdatum, cp_to_achieve,semester)
          VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
          const insertValues = [
            id,
            studentId,
            examId,
            data[0].parentId,
            pruefer,
            pruefungensnr,
            title,
            versuch,
            "angemeldet",
            formattedDate,
            credit_point,
            semester,
          ];

          db.query(insertQuery, insertValues, (err, data) => {
            if (err) return res.status(500).send(err);
            if (data) {
              const anmeldelistenId = uuidv4();
              const insertQuery = `INSERT INTO Anmeldelisten(id,studentId, pruefungsId, anmeldedatum) VALUES(?,?,?,CURRENT_TIMESTAMP)`;
              const queryParams = [anmeldelistenId, studentId, examId];

              db.query(insertQuery, queryParams, (err, data) => {
                if (err) return res.status(500).send(err);
                if (data) {
                  return res.status(201).json({
                    succuss: true,
                    message: "pruefung angemeldet",
                  });
                }
              });
            }
          });
        } else {
          const formattedDate = datum
            ? new Date(datum).toISOString().slice(0, 10)
            : null;
          const sqlQuery =
            "SELECT id FROM Notenspiegel WHERE studentId = ? AND pruefungsId = ?";
          const sqlParams = [studentId, parentId];

          db.query(sqlQuery, sqlParams, (err, data) => {
            if (err)
              return res.status(500).json({
                succuss: false,
                err,
              });
            if (data.length) {
              const newParentId = data[0].id;
              const id = uuidv4();
              const versuch = numbersOfFailure + 1;
              const insertQuery = `
              INSERT INTO Notenspiegel
              (id, studentId, pruefungsId, parentId, prueferId, pruefungsnr, pruefungstext, versuch, status, pruefungsdatum, cp_to_achieve, semester)
              VALUES
              (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
             `;
              const insertValues = [
                id,
                studentId,
                examId,
                newParentId,
                pruefer,
                pruefungensnr,
                title,
                versuch,
                "angemeldet",
                formattedDate,
                credit_point,
                semester,
              ];
              db.query(insertQuery, insertValues, (err, data) => {
                if (err) return res.status(500).send(err);
                if (data) {
                  const anmeldelistenId = uuidv4();
                  const insertQuery = `INSERT INTO Anmeldelisten(id,studentId, pruefungsId, anmeldedatum) VALUES(?,?,?,CURRENT_TIMESTAMP)`;
                  const queryParams = [anmeldelistenId, studentId, examId];

                  db.query(insertQuery, queryParams, (err, data) => {
                    if (err) return res.status(500).send(err);
                    if (data) {
                      return res.status(201).json({
                        succuss: true,
                        message: "pruefung angemeldet",
                      });
                    }
                  });
                }
              });
            } else {
              // handle new exams for new initial data
              const selectQuery = `SELECT * FROM Pruefungen WHERE id=?`;
              const queryParams = [parentId];
              db.query(selectQuery, queryParams, (err, data) => {
                if (err) res.send(err);
                if (data.length) {
                  const parentId = data[0].parentId;
                  const examData = { ...data[0] };
                  const selectQuery = `SELECT * FROM Notenspiegel WHERE pruefungsId=? AND studentId=?`;
                  const queryParams = [parentId, studentId];
                  db.query(selectQuery, queryParams, (err, data) => {
                    if (err) res.status(500).send(err);

                    if (data) {
                      // insert records into Notenspiegel
                      const parentExamData = { ...data[0] };
                      const id = uuidv4();
                      const insertQuery = `INSERT INTO Notenspiegel(id, studentId, pruefungsId, parentId, pruefungsnr, pruefungstext,cp_to_achieve) VALUES(?,?,?,?,?,?,?)`;
                      const queryParams = [
                        id,
                        studentId,
                        examData.id,
                        parentExamData.id,
                        examData.pruefungensnr,
                        examData.title,
                        examData.credit_point,
                      ];
                      db.query(insertQuery, queryParams, (err, data) => {
                        if (err) res.send(err);
                        if (data) {
                          // register for the desired exam
                          const formattedDate = datum
                            ? new Date(datum).toISOString().slice(0, 10)
                            : null;
                          const newId = uuidv4();
                          const versuch = 1;
                          const insertQuery = `
                          INSERT INTO Notenspiegel
                          (id, studentId, pruefungsId, parentId, prueferId, pruefungsnr, pruefungstext, versuch, status, pruefungsdatum, cp_to_achieve,semester)
                          VALUES
                          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                        `;

                          const insertValues = [
                            newId,
                            studentId,
                            examId,
                            id,
                            pruefer,
                            pruefungensnr,
                            title,
                            versuch,
                            "angemeldet",
                            formattedDate,
                            credit_point,
                            semester,
                          ];

                          db.query(insertQuery, insertValues, (err, data) => {
                            if (err) return res.status(500).send(err);
                            if (data) {
                              const anmeldelistenId = uuidv4();
                              const insertQuery = `INSERT INTO Anmeldelisten(id,studentId, pruefungsId, anmeldedatum) VALUES(?,?,?,CURRENT_TIMESTAMP)`;
                              const queryParams = [
                                anmeldelistenId,
                                studentId,
                                examId,
                              ];

                              db.query(
                                insertQuery,
                                queryParams,
                                (err, data) => {
                                  if (err) return res.status(500).send(err);
                                  if (data) {
                                    return res.status(201).json({
                                      succuss: true,
                                      message: "pruefung angemeldet",
                                    });
                                  }
                                }
                              );
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

const cancelExam = (req, res) => {
  const examId = req.params.examId;
  const sqlQuery = `DELETE FROM Anmeldelisten WHERE pruefungsId="${examId}"`;
  db.query(sqlQuery, (err, data) => {
    if (err)
      return res.status(500).json({
        succuss: false,
        err,
      });
    if (data) {
      // todo: handle rücktritt fristen
      const sqlQuery = `
      UPDATE Notenspiegel SET vermerk='RT'  
      WHERE pruefungsId = ?
      ORDER BY created_at DESC
      LIMIT 1`;
      const params = [examId];
      db.query(sqlQuery, params, (err, data) => {
        if (err)
          return res.status(500).json({
            succuss: false,
            err,
          });
        if (data) {
          return res.status(200).json({
            succuss: true,
            message: "pruefung abgemeldet",
          });
        }
      });
    }
  });
};

const getAnmeldeListe = (req, res) => {
  const id = req.student.id;
  const sqlQuery = `
  SELECT an.*,
  p.title as pruefungstitle,
  p.pruefungensnr as Pruefungsnr,
  p.semester as semester,
  p.raum as raum,
  p.beginn as beginn,
  p.datum as datum, 
  p.ruecktrittbis as ruecktrittbis,
  pr.lastname as prueferLastname
  FROM Anmeldelisten an 
  LEFT JOIN Pruefungen p ON an.pruefungsId = p.id
  LEFT JOIN Professor pr ON pr.id = p.pruefer
  WHERE studentId=? `;
  const params = [id];
  db.query(sqlQuery, params, (err, data) => {
    if (err) return res.status(500).send(err);

    if (data) {
      return res.status(201).json({
        succuss: true,
        anmeldeliste: data,
      });
    }
  });
};

export { registerForExam, getAnmeldeListe, cancelExam, insertExamRecord };
