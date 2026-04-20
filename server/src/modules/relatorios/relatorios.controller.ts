import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { rangeSchema } from "./relatorios.schemas";
import * as service from "./relatorios.service";

function getUserId(req: Request): string {
  if (!req.userId) throw new AppError("Não autenticado", 401);
  return req.userId;
}

export async function saldo(req: Request, res: Response) {
  res.json(await service.saldo(getUserId(req)));
}

export async function fluxo(req: Request, res: Response) {
  const { range } = rangeSchema.parse(req.query);
  res.json(await service.fluxo(getUserId(req), range));
}

export async function gastosPeriodo(req: Request, res: Response) {
  const { range } = rangeSchema.parse(req.query);
  res.json(await service.gastosPeriodo(getUserId(req), range));
}

export async function gastosPorCategoria(req: Request, res: Response) {
  const { range } = rangeSchema.parse(req.query);
  res.json(await service.gastosPorCategoria(getUserId(req), range));
}
