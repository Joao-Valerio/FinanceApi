import { prisma } from "../../db/prisma";
import { AppError } from "../../utils/AppError";
import type {
  AtualizarMetaInput,
  CriarMetaInput,
  DepositarMetaInput,
} from "./metas.schemas";

export function listar(userId: string) {
  return prisma.meta.findMany({
    where: { userId },
    orderBy: { prazo: "asc" },
  });
}

export async function buscarPorId(userId: string, id: string) {
  const meta = await prisma.meta.findFirst({ where: { id, userId } });
  if (!meta) throw new AppError("Meta não encontrada", 404);
  return meta;
}

export function criar(userId: string, data: CriarMetaInput) {
  return prisma.meta.create({ data: { ...data, userId } });
}

export async function atualizar(
  userId: string,
  id: string,
  data: AtualizarMetaInput
) {
  await buscarPorId(userId, id);
  return prisma.meta.update({ where: { id }, data });
}

export async function depositar(
  userId: string,
  id: string,
  data: DepositarMetaInput
) {
  const meta = await buscarPorId(userId, id);
  const novoAtual = Number(meta.atual) + data.valor;
  return prisma.meta.update({
    where: { id },
    data: { atual: novoAtual },
  });
}

export async function remover(userId: string, id: string) {
  await buscarPorId(userId, id);
  await prisma.meta.delete({ where: { id } });
}
