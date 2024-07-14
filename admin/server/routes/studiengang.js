import { Router } from "express";
import {
  addStudiengang,
  deleteStudiengangById,
  getStudiengang,
  updateStudiengang,
} from "../controllers/studiengang.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const studiengangRouter = Router();

studiengangRouter.route("/add").post(verifyToken, addStudiengang);
studiengangRouter.route("/get").get(verifyToken, getStudiengang);
studiengangRouter
  .route("/delete/:id")
  .delete(verifyToken, deleteStudiengangById);
studiengangRouter.route("/update/:id").put(verifyToken, updateStudiengang);

export default studiengangRouter;
