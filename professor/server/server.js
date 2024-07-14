import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { readFile as _readFile } from "fs";
import cors from "cors";
import authRouter from "./routes/auth.js";
import professorRouter from "./routes/professor.js";
import examRouter from "./routes/exam.js";
import { db } from "./config/db.js";
const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(fileUpload());

connectDB();

// server routes

app.use("/api/professor", professorRouter);
app.use("/api/auth", authRouter);
app.use("/api/exams", examRouter);

const server = app.listen(4600, () => {
  console.log(`server is running on http://localhost:4600`);
});

// Handling Uncaught Exception

// server.on("UncaughtPromiseRejection", (err, req, res, next) => {
//   res.status(500).send({
//     success: false,
//     message: " server closed due to UncaughtPromiseRejection ",
//   });

//   server.close(() => {
//     exit(1);
//   });
// });
