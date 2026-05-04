import { prisma } from "../../db/prisma";
import { AppError } from "../../utils/AppError";
import { compararSenha, hashSenha } from "../../utils/hash";
import type {
  AlterarSenhaInput,
  AtualizarPerfilInput,
} from "./users.schemas";

export async function atualizarPerfil(
  userId: string,
  data: AtualizarPerfilInput
) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, nome: true, email: true, createdAt: true },
  });
}

export async function alterarSenha(userId: string, data: AlterarSenhaInput) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError("Usuário não encontrado", 404);

  const ok = await compararSenha(data.senhaAtual, user.senhaHash);
  if (!ok) throw new AppError("Senha atual incorreta", 400);

  const senhaHash = await hashSenha(data.novaSenha);
  await prisma.user.update({ where: { id: userId }, data: { senhaHash } });
}

export async function obterEstatisticasPerfil(userId: string) {
  const [totalTransacoes, totalMetas, totalCategorias] = await Promise.all([
    prisma.transacao.count({ where: { userId } }),
    prisma.meta.count({ where: { userId } }),
    prisma.categoria.count({ where: { userId } }),
  ]);
  return { totalTransacoes, totalMetas, totalCategorias };
}
