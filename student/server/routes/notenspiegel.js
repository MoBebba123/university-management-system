import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { generatePdf, getNotenspiegel } from "../controllers/notenspiegel.js";
const notenspiegelRouter = Router();

notenspiegelRouter.route("/get").get(verifyToken, getNotenspiegel);
notenspiegelRouter.route("/generate-pdf").post(verifyToken, generatePdf);

export default notenspiegelRouter;
