import { Router } from "express";
import {
  addExam,
  deleteExamById,
  getExamById,
  getExams,
  updateExam,
} from "../controllers/exam.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const examRouter = Router();

examRouter.route("/add").post(verifyToken, addExam);
examRouter.route("/get").get(verifyToken, getExams);
examRouter.route("/get/:id").get(verifyToken, getExamById);
examRouter.route("/delete/:id").delete(verifyToken, deleteExamById);
examRouter.route("/update/:id").put(verifyToken, updateExam);

export default examRouter;
