import { createPool } from "mysql";
const db = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "uni",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// db.query(
//   "ALTER USER 'sql8670145'@'sql8.freesqldatabase.com' IDENTIFIED WITH 'mysql_native_password' BY '5g4ASfGDMm'; ",
//   (error, results) => {
//     if (error) {
//       console.error("Error altering user:", error);
//     } else {
//       console.log("User altered successfully");
//     }
//   }
// );

const connectDB = async (req, res) => {
  console.log("db connected");
};
db.on("error", (err) => {
  console.error("MySQL connection error:", err);
});

export { connectDB, db };
