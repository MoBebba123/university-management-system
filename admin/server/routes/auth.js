import { Router } from "express";
import { login, logout } from "../controllers/auth.js";
const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/logout").get(logout);

export default authRouter;
