import { Router } from "express";
import {

  getExams,
} from "../controllers/exam.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const examRouter = Router();

examRouter.route("/get").get(verifyToken, getExams);

export default examRouter;