import { Router } from "express";
import {
  addProfessor,
  deleteProfessorById,
  getProfessors,
} from "../controllers/professor.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const professorRouter = Router();

professorRouter.route("/add").post(verifyToken, addProfessor);
professorRouter.route("/get").get(verifyToken, getProfessors);
professorRouter.route("/delete/:id").delete(verifyToken, deleteProfessorById);

export default professorRouter;
