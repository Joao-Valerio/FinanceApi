import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import {
  atualizarMetaSchema,
  criarMetaSchema,
  depositarMetaSchema,
} from "./metas.schemas";
import * as service from "./metas.service";

function getUserId(req: Request): string {
  if (!req.userId) throw new AppError("Não autenticado", 401);
  return req.userId;
}

export async function listar(req: Request, res: Response) {
  res.json(await service.listar(getUserId(req)));
}

export async function buscarPorId(req: Request, res: Response) {
  res.json(await service.buscarPorId(getUserId(req), req.params.id));
}

export async function criar(req: Request, res: Response) {
  const body = criarMetaSchema.parse(req.body);
  res.status(201).json(await service.criar(getUserId(req), body));
}

export async function atualizar(req: Request, res: Response) {
  const body = atualizarMetaSchema.parse(req.body);
  res.json(await service.atualizar(getUserId(req), req.params.id, body));
}

export async function depositar(req: Request, res: Response) {
  const body = depositarMetaSchema.parse(req.body);
  res.json(await service.depositar(getUserId(req), req.params.id, body));
}

export async function remover(req: Request, res: Response) {
  await service.remover(getUserId(req), req.params.id);
  res.status(204).send();
}
