import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const CATEGORIAS_PADRAO = [
  { nome: "Alimentação", cor: "#f97316" },
  { nome: "Transporte", cor: "#3b82f6" },
  { nome: "Moradia", cor: "#a855f7" },
  { nome: "Lazer", cor: "#ec4899" },
  { nome: "Saúde", cor: "#10b981" },
  { nome: "Serviços", cor: "#eab308" },
  { nome: "Salário", cor: "#16a34a" },
];

async function main() {
  const email = "demo@financeapi.com";
  const senhaHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { nome: "Usuário Demo", email, senhaHash },
  });

  for (const cat of CATEGORIAS_PADRAO) {
    await prisma.categoria.upsert({
      where: { userId_nome: { userId: user.id, nome: cat.nome } },
      update: {},
      create: { ...cat, userId: user.id },
    });
  }

  console.log("Seed concluído. Login demo: %s / senha: 123456", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
