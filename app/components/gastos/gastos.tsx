import React from "react";
import { AppLayout } from "../layout/AppLayout";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import type { ChartConfig } from "../ui/chart";
import type { ColumnDef } from "@tanstack/react-table";

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
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
};

export type ChartDataGasto = {
  date: string;
  gastos: number;
};

const dados: Gasto[] = [
  {
    descricao: "Conta de luz",
    valor: 150.75,
    data: "2024-09-01",
    categoria: "Serviços",
  },
  {
    descricao: "Supermercado",
    valor: 230.1,
    data: "2024-09-05",
    categoria: "Alimentação",
  },
  {
    descricao: "Assinatura streaming",
    valor: 29.9,
    data: "2024-09-10",
    categoria: "Entretenimento",
  },
];

const columnHelper = createColumnHelper<Gasto>();

const columns: ColumnDef<Gasto, any>[] = [
  columnHelper.accessor("descricao", {
    header: "Descrição",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("valor", {
    header: "Valor",
    cell: (info) => <span>R$ {info.getValue().toFixed(2)}</span>,
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-green-50 dark:hover:bg-green-900/30"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 sm:px-6 py-3 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const description = "Gráfico de gastos do cliente";

const chartData: ChartDataGasto[] = [
  { date: "2024-04-01", gastos: 222 },
  { date: "2024-04-02", gastos: 97 },
  { date: "2024-04-03", gastos: 167 },
  { date: "2024-04-04", gastos: 242 },
  { date: "2024-04-05", gastos: 373 },
  { date: "2024-04-06", gastos: 301 },
  { date: "2024-04-07", gastos: 245 },
  { date: "2024-04-08", gastos: 409 },
  { date: "2024-04-09", gastos: 59 },
  { date: "2024-04-10", gastos: 261 },
];

const chartConfig = {
  gastos: {
    label: "Gastos do Cliente",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLineGastosCliente() {
  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.gastos, 0),
    []
  );

  const saldo = 1250;

  return (
    <Card className="py-4 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
      <div className="px-6 mb-2">
        <span className="text-2xl sm:text-3xl font-bold">Saldo atual</span>
        <p className="text-2xl sm:text-3xl font-semibold text-green-600 dark:text-green-400 mt-1">
          R$ {saldo.toLocaleString("pt-BR")}
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
              R$ {total.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[220px] sm:h-[260px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
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
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="gastos"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Line
              dataKey="gastos"
              type="monotone"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
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
