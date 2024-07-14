import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import { readFile as _readFile } from "fs";
import cors from "cors";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/userRouter.js";
import clientRouter from "./routes/clientRouter.js";
import machineRouter from "./routes/machineRouter.js";
import workerRouter from "./routes/workerRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import chatRouter from "./routes/chatRouter.js";
import departementRouter from "./routes/departementRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

const allowedOrigins = [
  process.env.ORIGIN_URL_1,
  process.env.ORIGIN_URL_2,
  process.env.ORIGIN_URL_3,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());
app.use(fileUpload());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO THE ADMIN SERVER");
});
// server routes

app.use(errorMiddleware);
app.use("/api", authRouter);

app.use("/api", departementRouter);
app.use("/api", uploadRouter);
app.use("/api", chatRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", machineRouter);
app.use("/api", clientRouter);
app.use("/api", workerRouter);
app.use("/api/studiengang", studiengangRouter);
app.use("/api/professor", professorRouter);
app.use("/api/student", studentenRouter);
app.use("/api/exam", examRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
// Handling Uncaught Exception

server.on("UncaughtPromiseRejection", (err, req, res, next) => {
  res.status(500).send({
    success: false,
    message: " server closed due to UncaughtPromiseRejection ",
  });

  server.close(() => {
    exit(1);
  });
});
