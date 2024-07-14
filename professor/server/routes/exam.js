import { Router } from "express";
import { getExams } from "../controllers/exam.js";
const examRouter = Router();

examRouter.route("/get/:id").get(getExams);
export default examRouter;
