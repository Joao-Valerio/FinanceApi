import type { Request, Response } from "express";
import { loginSchema, signupSchema } from "./auth.schemas";
import * as authService from "./auth.service";
import { AppError } from "../../utils/AppError";

export async function signupController(req: Request, res: Response) {
  const data = signupSchema.parse(req.body);
  const result = await authService.signup(data);
  return res.status(201).json(result);
}

export async function loginController(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);
  const result = await authService.login(data);
  return res.json(result);
}

export async function meController(req: Request, res: Response) {
  if (!req.userId) throw new AppError("Não autenticado", 401);
  const user = await authService.me(req.userId);
  return res.json(user);
}
