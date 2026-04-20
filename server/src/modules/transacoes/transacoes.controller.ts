import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import {
  atualizarTransacaoSchema,
  criarTransacaoSchema,
  listarTransacoesSchema,
} from "./transacoes.schemas";
import * as service from "./transacoes.service";

function getUserId(req: Request): string {
  if (!req.userId) throw new AppError("Não autenticado", 401);
  return req.userId;
}

export async function listar(req: Request, res: Response) {
  const filtros = listarTransacoesSchema.parse(req.query);
  const data = await service.listar(getUserId(req), filtros);
  res.json(data);
}

export async function buscarPorId(req: Request, res: Response) {
  const data = await service.buscarPorId(getUserId(req), req.params.id);
  res.json(data);
}

export async function criar(req: Request, res: Response) {
  const body = criarTransacaoSchema.parse(req.body);
  const data = await service.criar(getUserId(req), body);
  res.status(201).json(data);
}

export async function atualizar(req: Request, res: Response) {
  const body = atualizarTransacaoSchema.parse(req.body);
  const data = await service.atualizar(getUserId(req), req.params.id, body);
  res.json(data);
}

export async function remover(req: Request, res: Response) {
  await service.remover(getUserId(req), req.params.id);
  res.status(204).send();
}
