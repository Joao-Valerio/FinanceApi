import { useEffect, useState } from "react";
import { AppLayout } from "../layout/AppLayout";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartConfig } from "../ui/chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { api } from "../../lib/api";

type Periodo = "mensal" | "trimestral" | "anual";

type SaldoResponse = {
  saldoAtual: number;
  totalEntradas: number;
  totalSaidas: number;
};

type FluxoItem = {
  date: string;
  Entradas: number;
  "Saídas": number;
};

type CategoriaItem = {
  categoriaId: string | null;
  nome: string;
  cor: string;
  total: number;
};

type ResumoCategoria = {
  categoria: string;
  total: number;
  percentual: number;
  cor: string;
};

const periodos: { id: Periodo; label: string }[] = [
  { id: "mensal", label: "Mensal" },
  { id: "trimestral", label: "Trimestral" },
  { id: "anual", label: "Anual" },
];

const periodoParaRange: Record<Periodo, "30d" | "90d"> = {
  mensal: "30d",
  trimestral: "90d",
  anual: "90d",
};

function formatarBRL(valor: number | null): string {
  if (valor === null) return "—";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const chartConfig = {
  total: {
    label: "Total gasto",
    color: "#dc2626",
  },
} satisfies ChartConfig;

const Relatorios = () => {
  const [periodo, setPeriodo] = useState<Periodo>("mensal");
  const [carregando, setCarregando] = useState(true);

  const [entradas, setEntradas] = useState<number | null>(null);
  const [saidas, setSaidas] = useState<number | null>(null);
  const [saldoAtual, setSaldoAtual] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<ResumoCategoria[]>([]);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);

    const range = periodoParaRange[periodo];

    Promise.all([
      api<SaldoResponse>("/relatorios/saldo"),
      api<FluxoItem[]>(`/relatorios/fluxo?range=${range}`),
      api<CategoriaItem[]>(`/relatorios/gastos-por-categoria?range=${range}`),
    ])
      .then(([saldoResp, fluxo, cats]) => {
        if (cancelado) return;

        setSaldoAtual(saldoResp.saldoAtual);

        const totalEntradas = fluxo.reduce((acc, d) => acc + d.Entradas, 0);
        const totalSaidas = fluxo.reduce((acc, d) => acc + d["Saídas"], 0);
        setEntradas(totalEntradas);
        setSaidas(totalSaidas);

        const totalGeral = cats.reduce((acc, c) => acc + c.total, 0);
        setCategorias(
          cats.map((c) => ({
            categoria: c.nome,
            total: c.total,
            percentual:
              totalGeral > 0
                ? Math.round((c.total / totalGeral) * 100)
                : 0,
            cor: c.cor,
          }))
        );
      })
      .catch(() => {
        if (cancelado) return;
        setEntradas(null);
        setSaidas(null);
        setSaldoAtual(null);
        setCategorias([]);
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [periodo]);

  const saldoPeriodo =
    entradas !== null && saidas !== null ? entradas - saidas : null;

  return (
    <AppLayout>
      <main className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Relatórios</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Visualize um resumo detalhado dos seus ganhos, gastos e saldo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {periodos.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriodo(p.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  periodo === p.id
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        <section className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle>Entradas no período</CardTitle>
              <CardDescription>{periodo.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                {carregando ? "..." : formatarBRL(entradas)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle>Saídas no período</CardTitle>
              <CardDescription>{periodo.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl sm:text-2xl font-bold text-red-500">
                {carregando ? "..." : formatarBRL(saidas)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Saldo do período</CardTitle>
              <CardDescription>{periodo.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p
                className={`text-xl sm:text-2xl font-bold ${
                  saldoPeriodo === null
                    ? "text-gray-500"
                    : saldoPeriodo >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500"
                }`}
              >
                {carregando ? "..." : formatarBRL(saldoPeriodo)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Saldo total acumulado:{" "}
                <span className="font-medium">
                  {carregando ? "..." : formatarBRL(saldoAtual)}
                </span>
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-4 sm:p-6 rounded-2xl shadow-sm lg:col-span-2">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Gastos por categoria
          </h2>

          {carregando ? (
            <div className="flex items-center justify-center h-[240px] text-sm text-gray-500 dark:text-gray-400">
              Carregando...
            </div>
          ) : categorias.length === 0 ? (
            <div className="flex items-center justify-center h-[240px] text-sm text-gray-500 dark:text-gray-400 text-center">
              Sem gastos registrados no período.
            </div>
          ) : (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[220px] sm:h-[280px] w-full"
            >
              <BarChart
                data={categorias}
                margin={{ left: 0, right: 8, top: 4, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value: number) =>
                    value >= 1000
                      ? `R$${(value / 1000).toFixed(1)}k`
                      : `R$${value}`
                  }
                />
                <YAxis
                  type="category"
                  dataKey="categoria"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  width={80}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip
                  cursor={{ fill: "rgba(148,163,184,0.1)" }}
                  content={
                    <ChartTooltipContent
                      className="w-[180px]"
                      formatter={(value) =>
                        Number(value).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }
                    />
                  }
                />
                <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                  {categorias.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-4 sm:p-6 rounded-2xl shadow-sm overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Resumo por categoria
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <th className="text-left py-2">Categoria</th>
                <th className="text-right py-2">Total (R$)</th>
                <th className="text-right py-2">% do total</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Carregando...
                  </td>
                </tr>
              ) : categorias.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Sem dados para o período selecionado.
                  </td>
                </tr>
              ) : (
                categorias.map((linha) => (
                  <tr
                    key={linha.categoria}
                    className="border-b border-gray-200 dark:border-gray-800"
                  >
                    <td className="py-2 flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: linha.cor }}
                      />
                      {linha.categoria}
                    </td>
                    <td className="py-2 text-right">
                      {formatarBRL(linha.total)}
                    </td>
                    <td className="py-2 text-right">{linha.percentual}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </AppLayout>
  );
};

export default Relatorios;
