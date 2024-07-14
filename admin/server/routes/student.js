import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addStudenten,
  deleteStudentById,
  getStudenten,
} from "../controllers/student.js";
const studentenRouter = Router();

studentenRouter.route("/add").post(verifyToken, addStudenten);
studentenRouter.route("/get").get(verifyToken, getStudenten);
studentenRouter.route("/delete/:id").delete(verifyToken, deleteStudentById);

export default studentenRouter;
