import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getStudentById } from "../controllers/student.js";
const studentRouter = Router();

studentRouter.route("/get-student-details").get(verifyToken, getStudentById);

export default studentRouter;
