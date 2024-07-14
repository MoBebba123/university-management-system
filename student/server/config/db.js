import { createPool } from "mysql";
const db = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "uni",
  port: 3306,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
});

const connectDB = async (req, res) => {
  db.once("connection", () => {
    console.log("db connected");
  });
};
db.on("error", (err) => {
  console.error("MySQL connection error:", err);
});

export { connectDB, db };
