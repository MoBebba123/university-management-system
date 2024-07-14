import { createConnection } from "mysql";
const db = createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "uni",
});

const connectDB = async (req, res) => {
  db.connect((err, data) => {
    if (err) throw err;
    console.log("db connected");
  });
};

export { connectDB, db };
