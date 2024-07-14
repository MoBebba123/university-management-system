import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB, db } from "./config/db.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import ipify from "ipify";
import { readFile as _readFile } from "fs";
import cors from "cors";
import authRouter from "./routes/auth.js";
import studentRouter from "./routes/student.js";
import examRouter from "./routes/exam.js";
import ameldeListeRouter from "./routes/anmeldeList.js";
import notenspiegelRouter from "./routes/notenspiegel.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

const allowedOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];

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
  // Allow the necessary HTTP methods
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS,PATCH, HEAD"
  );

  // Allow the necessary headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Content-Disposition,x-forwarded-for"
  );
  res.header("Access-Control-Allow-Credentials", true);
  // Handle OPTIONS method
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

connectDB();
// server routes

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);
app.use("/api/exam", examRouter);
app.use("/api/anmeldeliste", ameldeListeRouter);
app.use("/api/notenspiegel", notenspiegelRouter);
app.get("/", async (req, res) => {
  try {
    const ipV4 = await ipify({ useIPv6: false });
    const ipV6 = await ipify({ useIPv6: true });
    res.json({ ipV4, ipV6 });
  } catch (error) {
    console.error("Error fetching IP address:", error);
    res.status(500).json({ error: "Internal Server Error:" + error });
  }
});

app.use(errorMiddleware);

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
    exit(0);
  });
});
