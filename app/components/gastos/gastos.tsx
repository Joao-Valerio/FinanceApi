import React, { useEffect, useState } from "react";
import { AppLayout } from "../layout/AppLayout";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "../ui/chart";
import type { ColumnDef } from "@tanstack/react-table";
import { api } from "../../lib/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

export type Gasto = {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
};

export type ChartDataGasto = {
  date: string;
  gastos: number;
};

type TransacaoApi = {
  id: string;
  descricao: string;
  valor: string | number;
  data: string;
  categoria: { nome: string } | null;
};

type SaldoResponse = {
  saldoAtual: number;
  totalEntradas: number;
  totalSaidas: number;
};

function formatarBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const columnHelper = createColumnHelper<Gasto>();

const columns: ColumnDef<Gasto, any>[] = [
  columnHelper.accessor("descricao", {
    header: "Descrição",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("valor", {
    header: "Valor",
    cell: (info) => <span>{formatarBRL(info.getValue())}</span>,
  }),
  columnHelper.accessor("data", {
    header: "Data",
    cell: (info) => new Date(info.getValue()).toLocaleDateString("pt-BR"),
  }),
  columnHelper.accessor("categoria", {
    header: "Categoria",
    cell: (info) => info.getValue(),
  }),
];

export function TabelaGastos() {
  const [dados, setDados] = useState<Gasto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    api<TransacaoApi[]>("/transacoes?tipo=SAIDA&limit=200")
      .then((lista) => {
        if (cancelado) return;
        const convertido: Gasto[] = lista.map((t) => ({
          id: t.id,
          descricao: t.descricao,
          valor: Number(t.valor),
          data: t.data,
          categoria: t.categoria?.nome ?? "Sem categoria",
        }));
        setDados(convertido);
      })
      .catch(() => {
        if (!cancelado) setDados([]);
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const table = useReactTable({
    data: dados,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-green-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-4 sm:px-6 py-3 font-semibold uppercase tracking-wider text-xs sm:text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {carregando ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 sm:px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Carregando...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 sm:px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Nenhum gasto registrado ainda.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-green-50 dark:hover:bg-green-900/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 sm:px-6 py-3 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const description = "Gráfico de gastos do cliente";

const chartConfig = {
  gastos: {
    label: "Gastos",
    color: "#dc2626",
  },
} satisfies ChartConfig;

export function ChartLineGastosCliente() {
  const [chartData, setChartData] = useState<ChartDataGasto[]>([]);
  const [saldo, setSaldo] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    Promise.all([
      api<ChartDataGasto[]>("/relatorios/gastos-periodo?range=90d"),
      api<SaldoResponse>("/relatorios/saldo"),
    ])
      .then(([gastos, saldoResp]) => {
        if (cancelado) return;
        setChartData(gastos);
        setSaldo(saldoResp.saldoAtual);
      })
      .catch(() => {
        if (!cancelado) {
          setChartData([]);
          setSaldo(null);
        }
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.gastos, 0),
    [chartData]
  );

  return (
    <Card className="py-4 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
      <div className="px-6 mb-2">
        <span className="text-2xl sm:text-3xl font-bold">Saldo atual</span>
        <p className="text-2xl sm:text-3xl font-semibold text-green-600 dark:text-green-400 mt-1">
          {carregando ? "..." : saldo === null ? "—" : formatarBRL(saldo)}
        </p>
      </div>

      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Gastos do Cliente</CardTitle>
          <CardDescription>
            Evolução dos gastos nos últimos 3 meses
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              Total de Gastos
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {formatarBRL(total)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        {carregando ? (
          <div className="flex items-center justify-center h-[220px] sm:h-[260px] text-sm text-gray-500 dark:text-gray-400">
            Carregando...
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[220px] sm:h-[260px] text-center text-sm text-gray-500 dark:text-gray-400">
            Sem dados de gastos para exibir.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[240px] sm:h-[280px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 4, right: 12, top: 4, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
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
                    className="w-[170px]"
                    nameKey="gastos"
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
                  />
                }
              />
              <Line
                dataKey="gastos"
                type="monotone"
                stroke="#dc2626"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#dc2626" }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

const Gastos = () => {
  return (
    <AppLayout>
      <main className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 max-w-7xl mx-auto">
        <ChartLineGastosCliente />
        <TabelaGastos />
      </main>
    </AppLayout>
  );
};

export default Gastos;
