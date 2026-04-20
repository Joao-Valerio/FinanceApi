import { prisma } from "../../db/prisma";
import { AppError } from "../../utils/AppError";
import type {
  AtualizarCategoriaInput,
  CriarCategoriaInput,
} from "./categorias.schemas";

export function listar(userId: string) {
  return prisma.categoria.findMany({
    where: { userId },
    orderBy: { nome: "asc" },
  });
}

export async function criar(userId: string, data: CriarCategoriaInput) {
  return prisma.categoria.create({ data: { ...data, userId } });
}

async function garantirPropriedade(userId: string, id: string) {
  const cat = await prisma.categoria.findFirst({ where: { id, userId } });
  if (!cat) throw new AppError("Categoria não encontrada", 404);
  return cat;
}

export async function atualizar(
  userId: string,
  id: string,
  data: AtualizarCategoriaInput
) {
  await garantirPropriedade(userId, id);
  return prisma.categoria.update({ where: { id }, data });
}

export async function remover(userId: string, id: string) {
  await garantirPropriedade(userId, id);
  await prisma.categoria.delete({ where: { id } });
}
