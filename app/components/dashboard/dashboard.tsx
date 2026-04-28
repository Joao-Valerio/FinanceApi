import { useEffect, useState, type FormEvent } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "../ui/chart";
import { AppLayout } from "../layout/AppLayout";
import { api, ApiError } from "../../lib/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type ChartDataItem = {
  date: string;
  Entradas: number;
  Saídas: number;
};

export type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: "ENTRADA" | "SAIDA";
  data: string;
};

type Categoria = {
  id: string;
  nome: string;
};

type SaldoResponse = {
  saldoAtual: number;
  totalEntradas: number;
  totalSaidas: number;
};

const chartConfig = {
  Entradas: { label: "Entradas", color: "#16a34a" },
  Saídas: { label: "Saídas", color: "#dc2626" },
} satisfies ChartConfig;

function formatarBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("90d");
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    api<ChartDataItem[]>(`/relatorios/fluxo?range=${timeRange}`)
      .then((dados) => {
        if (!cancelado) setChartData(dados);
      })
      .catch(() => {
        if (!cancelado) setChartData([]);
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });
    return () => {
      cancelado = true;
    };
  }, [timeRange]);

  const filteredData = chartData;

  const timeRangeLabels: Record<string, string> = {
    "90d": "Últimos 3 meses",
    "30d": "Últimos 30 dias",
    "7d": "Últimos 7 dias",
  };

  return (
    <Card className="pt-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-2 space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1">
          <CardTitle>Entradas x Saídas</CardTitle>
          <CardDescription>
            Resumo dos {timeRangeLabels[timeRange]}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-full sm:w-[160px] rounded-lg sm:ml-auto"
            aria-label="Selecione um valor"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex items-center justify-center h-[240px] sm:h-[280px] text-sm text-gray-500 dark:text-gray-400">
            Carregando...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-[240px] sm:h-[280px] text-center text-sm text-gray-500 dark:text-gray-400">
            Sem dados para exibir no período selecionado.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[260px] w-full sm:h-[300px]"
          >
            <AreaChart
              data={filteredData}
              margin={{ left: 4, right: 4, top: 4, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillEntradas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="fillSaidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                interval="preserveStartEnd"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                width={72}
                tickFormatter={(value: number) =>
                  value >= 1000
                    ? `R$${(value / 1000).toFixed(1)}k`
                    : `R$${value}`
                }
              />
              <ChartTooltip
                cursor={{ stroke: "#94a3b8", strokeWidth: 1 }}
                content={
                  <ChartTooltipContent
                    className="max-w-[180px] text-xs sm:max-w-[240px] sm:text-sm"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    }
                    formatter={(value) =>
                      Number(value).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="Saídas"
                type="monotone"
                fill="url(#fillSaidas)"
                stroke="#dc2626"
                strokeWidth={2}
              />
              <Area
                dataKey="Entradas"
                type="monotone"
                fill="url(#fillEntradas)"
                stroke="#16a34a"
                strokeWidth={2}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export const Dashboard: React.FC = () => {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<"ENTRADA" | "SAIDA">("ENTRADA");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarTudo() {
    setCarregando(true);
    try {
      const [saldoResp, listaResp, categoriasResp] = await Promise.all([
        api<SaldoResponse>("/relatorios/saldo"),
        api<Transacao[]>("/transacoes?limit=10"),
        api<Categoria[]>("/categorias"),
      ]);
      setSaldo(saldoResp.saldoAtual);
      setTransacoes(listaResp);
      setCategorias(categoriasResp);
    } catch {
      setSaldo(null);
      setTransacoes([]);
      setCategorias([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  async function handleAdicionar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    if (tipo === "SAIDA" && !categoria) {
      setErro("Selecione uma categoria para saídas.");
      return;
    }

    setSalvando(true);
    try {
      await api<Transacao>("/transacoes", {
        method: "POST",
        body: {
          descricao,
          valor: Number(valor),
          tipo,
          data: new Date().toISOString(),
          categoriaId: categoria || undefined,
        },
      });
      setDescricao("");
      setValor("");
      setTipo("ENTRADA");
      setCategoria("");
      await carregarTudo();
    } catch (err) {
      setErro(
        err instanceof ApiError
          ? err.message
          : "Não foi possível adicionar a transação."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <AppLayout>
      <main className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <section className="md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm flex flex-col justify-center min-h-[160px]">
          <h3 className="text-2xl sm:text-3xl font-bold mb-1">Saldo atual</h3>
          <p className="text-3xl sm:text-4xl font-semibold text-green-600 dark:text-green-400">
            {carregando ? "..." : saldo === null ? "—" : formatarBRL(saldo)}
          </p>
        </section>

        <section className="md:col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Adicionar transação
          </h3>
          <form
            onSubmit={handleAdicionar}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              className="w-full px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "ENTRADA" | "SAIDA")}
              className="sm:col-span-2 w-full px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Tipo de transação"
            >
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
            </select>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required={tipo === "SAIDA"}
              className="sm:col-span-2 w-full px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Categoria da transação"
            >
              <option value="" disabled>
                {categorias.length === 0
                  ? "Nenhuma categoria disponível"
                  : "Selecione a categoria"}
              </option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
            {erro && (
              <p
                role="alert"
                className="sm:col-span-2 px-3 py-2 rounded-md text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-800"
              >
                {erro}
              </p>
            )}
            <button
              type="submit"
              disabled={salvando}
              className="sm:col-span-2 w-full bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {salvando ? "Salvando..." : "Adicionar"}
            </button>
          </form>
        </section>

        <section className="md:col-span-3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Histórico de transações
          </h3>
          {carregando ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
              Carregando...
            </p>
          ) : transacoes.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
              Nenhuma transação registrada ainda.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {transacoes.map((t) => (
                <li key={t.id} className="flex justify-between items-center gap-3 py-2">
                  <span className="min-w-0 truncate text-sm">{t.descricao}</span>
                  <span
                    className={[
                      "shrink-0 text-sm font-medium",
                      t.tipo === "ENTRADA"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500",
                    ].join(" ")}
                  >
                    {t.tipo === "ENTRADA" ? "+ " : "- "}
                    {formatarBRL(t.valor)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="md:col-span-3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-4 sm:p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Resumo gráfico</h3>
          <ChartAreaInteractive />
        </section>
      </main>
    </AppLayout>
  );
};

export default Dashboard;
