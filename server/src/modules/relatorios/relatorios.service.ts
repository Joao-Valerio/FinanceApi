import { prisma } from "../../db/prisma";
import type { RangeInput } from "./relatorios.schemas";

function inicioDoRange(range: RangeInput["range"]): Date {
  const dias = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const d = new Date();
  d.setDate(d.getDate() - dias);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toISODate(d: Date): string {
  return d.toISOString().substring(0, 10);
}

export async function saldo(userId: string) {
  const agregado = await prisma.transacao.groupBy({
    by: ["tipo"],
    where: { userId },
    _sum: { valor: true },
  });

  let entradas = 0;
  let saidas = 0;
  for (const linha of agregado) {
    const total = Number(linha._sum.valor ?? 0);
    if (linha.tipo === "ENTRADA") entradas = total;
    else saidas = total;
  }

  return {
    saldoAtual: entradas - saidas,
    totalEntradas: entradas,
    totalSaidas: saidas,
  };
}

export async function fluxo(userId: string, range: RangeInput["range"]) {
  const desde = inicioDoRange(range);

  const transacoes = await prisma.transacao.findMany({
    where: { userId, data: { gte: desde } },
    select: { data: true, tipo: true, valor: true },
  });

  const porDia = new Map<string, { Entradas: number; Saídas: number }>();
  for (const t of transacoes) {
    const chave = toISODate(t.data);
    const atual = porDia.get(chave) ?? { Entradas: 0, Saídas: 0 };
    const valor = Number(t.valor);
    if (t.tipo === "ENTRADA") atual.Entradas += valor;
    else atual["Saídas"] += valor;
    porDia.set(chave, atual);
  }

  return Array.from(porDia.entries())
    .map(([date, v]) => ({ date, Entradas: v.Entradas, Saídas: v["Saídas"] }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function gastosPeriodo(userId: string, range: RangeInput["range"]) {
  const desde = inicioDoRange(range);
  const transacoes = await prisma.transacao.findMany({
    where: { userId, tipo: "SAIDA", data: { gte: desde } },
    select: { data: true, valor: true },
  });

  const porDia = new Map<string, number>();
  for (const t of transacoes) {
    const chave = toISODate(t.data);
    porDia.set(chave, (porDia.get(chave) ?? 0) + Number(t.valor));
  }

  return Array.from(porDia.entries())
    .map(([date, gastos]) => ({ date, gastos }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function gastosPorCategoria(
  userId: string,
  range: RangeInput["range"]
) {
  const desde = inicioDoRange(range);
  const agregado = await prisma.transacao.groupBy({
    by: ["categoriaId"],
    where: { userId, tipo: "SAIDA", data: { gte: desde } },
    _sum: { valor: true },
  });

  const categorias = await prisma.categoria.findMany({ where: { userId } });
  const mapaCategorias = new Map(categorias.map((c) => [c.id, c]));

  return agregado
    .map((linha) => {
      const cat = linha.categoriaId
        ? mapaCategorias.get(linha.categoriaId)
        : null;
      return {
        categoriaId: linha.categoriaId,
        nome: cat?.nome ?? "Sem categoria",
        cor: cat?.cor ?? "#94a3b8",
        total: Number(linha._sum.valor ?? 0),
      };
    })
    .sort((a, b) => b.total - a.total);
}
