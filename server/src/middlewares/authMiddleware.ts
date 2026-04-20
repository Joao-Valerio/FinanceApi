import type { NextFunction, Request, Response } from "express";
import { verificarToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Token não fornecido", 401);
  }

  const token = header.substring(7);
  try {
    const payload = verificarToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    throw new AppError("Token inválido ou expirado", 401);
  }
}
