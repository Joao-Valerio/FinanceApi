import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  loginController,
  meController,
  signupController,
} from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", authMiddleware, meController);
