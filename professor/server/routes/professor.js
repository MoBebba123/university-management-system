import { Router } from "express";

import { getUserDetails } from "../controllers/professor.js";
import { verifyToken } from "../middleware/verifyToken.js";
const professorRouter = Router();

professorRouter.route("/get-details").get(verifyToken, getUserDetails);

export default professorRouter;
