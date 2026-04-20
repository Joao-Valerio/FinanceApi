import { useEffect, useState, type FormEvent } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

type SaldoResponse = {
  saldoAtual: number;
  totalEntradas: number;
  totalSaidas: number;
};

const chartConfig = {
  Entradas: { label: "Entradas", color: "#16a34a" },
  Saídas: { label: "Saídas", color: "#dc2626" },
} satisfies ChartConfig;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

function formatarBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
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
            className="aspect-auto h-[240px] w-full sm:h-[280px]"
          >
            <AreaChart data={filteredData} className="w-full">
              <defs>
                <linearGradient id="fillEntradas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillSaidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={20}
                interval="preserveStartEnd"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="max-w-[160px] text-xs sm:max-w-[220px] sm:text-sm"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("pt-BR", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="Saídas"
                type="natural"
                fill="url(#fillSaidas)"
                stroke="#dc2626"
                stackId="a"
              />
              <Area
                dataKey="Entradas"
                type="natural"
                fill="url(#fillEntradas)"
                stroke="#16a34a"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
        {/* isMobile preservado para uso futuro quando os dados do back chegarem */}
        <span className="sr-only">{isMobile ? "mobile" : "desktop"}</span>
      </CardContent>
    </Card>
  );
}

export const Dashboard: React.FC = () => {
  const [saldo, setSaldo] = useState<number | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<"ENTRADA" | "SAIDA">("ENTRADA");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarTudo() {
    setCarregando(true);
    try {
      const [saldoResp, listaResp] = await Promise.all([
        api<SaldoResponse>("/relatorios/saldo"),
        api<Transacao[]>("/transacoes?limit=10"),
      ]);
      setSaldo(saldoResp.saldoAtual);
      setTransacoes(listaResp);
    } catch {
      setSaldo(null);
      setTransacoes([]);
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
    setSalvando(true);
    try {
      await api<Transacao>("/transacoes", {
        method: "POST",
        body: {
          descricao,
          valor: Number(valor),
          tipo,
          data: new Date().toISOString(),
        },
      });
      setDescricao("");
      setValor("");
      setTipo("ENTRADA");
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
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "ENTRADA" | "SAIDA")}
              className="sm:col-span-2 w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Tipo de transação"
            >
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
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
              className="sm:col-span-2 w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
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
                <li key={t.id} className="flex justify-between py-2">
                  <span>{t.descricao}</span>
                  <span
                    className={
                      t.tipo === "ENTRADA"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500"
                    }
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
