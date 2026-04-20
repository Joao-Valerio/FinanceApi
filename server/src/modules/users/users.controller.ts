import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import {
  alterarSenhaSchema,
  atualizarPerfilSchema,
} from "./users.schemas";
import * as service from "./users.service";

function getUserId(req: Request): string {
  if (!req.userId) throw new AppError("Não autenticado", 401);
  return req.userId;
}

export async function atualizarPerfil(req: Request, res: Response) {
  const body = atualizarPerfilSchema.parse(req.body);
  res.json(await service.atualizarPerfil(getUserId(req), body));
}

export async function alterarSenha(req: Request, res: Response) {
  const body = alterarSenhaSchema.parse(req.body);
  await service.alterarSenha(getUserId(req), body);
  res.status(204).send();
}
