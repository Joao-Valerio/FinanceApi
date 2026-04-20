import { prisma } from "../../db/prisma";
import { AppError } from "../../utils/AppError";
import type {
  AtualizarTransacaoInput,
  CriarTransacaoInput,
  ListarTransacoesInput,
} from "./transacoes.schemas";

export async function listar(userId: string, filtros: ListarTransacoesInput) {
  return prisma.transacao.findMany({
    where: {
      userId,
      tipo: filtros.tipo,
      categoriaId: filtros.categoriaId,
      data: {
        gte: filtros.de,
        lte: filtros.ate,
      },
    },
    include: { categoria: true },
    orderBy: { data: "desc" },
    take: filtros.limit,
  });
}

export async function buscarPorId(userId: string, id: string) {
  const transacao = await prisma.transacao.findFirst({
    where: { id, userId },
    include: { categoria: true },
  });
  if (!transacao) throw new AppError("Transação não encontrada", 404);
  return transacao;
}

export async function criar(userId: string, data: CriarTransacaoInput) {
  if (data.categoriaId) {
    const cat = await prisma.categoria.findFirst({
      where: { id: data.categoriaId, userId },
    });
    if (!cat) throw new AppError("Categoria inválida", 400);
  }

  return prisma.transacao.create({
    data: { ...data, userId },
    include: { categoria: true },
  });
}

export async function atualizar(
  userId: string,
  id: string,
  data: AtualizarTransacaoInput
) {
  await buscarPorId(userId, id);

  if (data.categoriaId) {
    const cat = await prisma.categoria.findFirst({
      where: { id: data.categoriaId, userId },
    });
    if (!cat) throw new AppError("Categoria inválida", 400);
  }

  return prisma.transacao.update({
    where: { id },
    data,
    include: { categoria: true },
  });
}

export async function remover(userId: string, id: string) {
  await buscarPorId(userId, id);
  await prisma.transacao.delete({ where: { id } });
}
