import { prisma } from "../../db/prisma";
import { AppError } from "../../utils/AppError";
import { compararSenha, hashSenha } from "../../utils/hash";
import { gerarToken } from "../../utils/jwt";
import type { LoginInput, SignupInput } from "./auth.schemas";

const CATEGORIAS_PADRAO = [
  { nome: "Alimentação", cor: "#f97316" },
  { nome: "Transporte", cor: "#3b82f6" },
  { nome: "Moradia", cor: "#a855f7" },
  { nome: "Lazer", cor: "#ec4899" },
  { nome: "Saúde", cor: "#10b981" },
  { nome: "Serviços", cor: "#eab308" },
  { nome: "Salário", cor: "#16a34a" },
];

export async function signup(data: SignupInput) {
  const existente = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existente) {
    throw new AppError("Email já cadastrado", 409);
  }

  const senhaHash = await hashSenha(data.senha);

  const user = await prisma.user.create({
    data: {
      nome: data.nome,
      email: data.email,
      senhaHash,
      categorias: {
        create: CATEGORIAS_PADRAO,
      },
    },
    select: { id: true, nome: true, email: true, createdAt: true },
  });

  const token = gerarToken(user.id);
  return { token, user };
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw new AppError("Credenciais inválidas", 401);
  }

  const ok = await compararSenha(data.senha, user.senhaHash);
  if (!ok) {
    throw new AppError("Credenciais inválidas", 401);
  }

  const token = gerarToken(user.id);
  return {
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
}

export async function me(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, nome: true, email: true, createdAt: true },
  });
  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }
  return user;
}
