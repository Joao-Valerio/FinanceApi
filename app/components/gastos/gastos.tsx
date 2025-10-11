import React, { useState } from 'react';
import { Link } from 'react-router';
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

type Gasto = {
  descricao: string;
  valor: number;
  data: string; 
  categoria: string;
};

// Exemplo de dados
const dados: Gasto[] = [
  {
    descricao: "Conta de luz",
    valor: 150.75,
    data: "2024-09-01",
    categoria: "Serviços",
  },
  {
    descricao: "Supermercado",
    valor: 230.10,
    data: "2024-09-05",
    categoria: "Alimentação",
  },
  {
    descricao: "Assinatura streaming",
    valor: 29.90,
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
    cell: (info) => {
      const val = info.getValue();
      return <span>R$ {val.toFixed(2)}</span>;
    },
  }),
  columnHelper.accessor("data", {
    header: "Data",
    cell: (info) => {
      const d = new Date(info.getValue());
      return d.toLocaleDateString("pt-BR");
    },
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
    <div className="mt-8 w-full overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 p-2 sm:p-4">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg text-sm sm:text-base ">
        <thead className="bg-green-600 dark:bg-green-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 dark:border-gray-700 px-2 py-2 sm:px-4 sm:py-3 text-left text-gray-800 dark:text-green-200 text-xs sm:text-sm"
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="even:bg-gray-50 odd:bg-white hover:bg-green-200 dark:even:bg-gray-800 dark:odd:bg-gray-700 dark:hover:bg-green-900"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-gray-300 dark:border-gray-700 px-2 py-2 sm:px-4 sm:py-3 text-gray-800 dark:text-green-200 text-xs sm:text-sm whitespace-nowrap"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export const description = "Gráfico de gastos do cliente";

const chartData = [
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
  // ... seu restante dos dados
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
    <Card className="py-4 sstext-black dark:bg-gray-800 dark:text-white p-4 bg-gray-200">
      <div className="px-6 mb-2">
        <span className="text-4xl font-bold ">Saldo atual</span>
        <p className="text-3xl font-semibold text-green-400 mt-2">R$ {saldo.toLocaleString()}</p>
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
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
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
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="gastos"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="gastos"
              type="monotone"
              stroke={`#22c55e`}
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen dark:bg-gray-900">
      {/* Botão do menu fixo no topo — só aparece quando sidebar está fechada */}
      {!sidebarOpen && (
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="m-4 p-2 text-3xl text-black rounded hover:bg-green-700 transition dark:text-white"
      >
        ☰
      </button>
      )}

      {/* Overlay para fechar a sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-20 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-400 dark:bg-gray-800 text-black dark:text-white p-6 shadow-lg transform transition-transform duration-300 z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-4xl font-bold mb-6">Painel</h2>
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="hover:text-green-400 font-semibold">Dashboard</Link></li>
          <li><Link to="/gastos" className="hover:text-green-400 font-semibold">Gastos</Link></li>
          <li><Link to="/metas" className="hover:text-green-400 font-semibold">Metas</Link></li>
          <li><Link to="/relatorios" className="hover:text-green-400 font-semibold">Relatórios</Link></li>
          <li><Link to="/recursos" className="hover:text-green-400 font-semibold">Recursos</Link></li>
          <li><Link to="/sobre" className="hover:text-green-400 font-semibold">Sobre</Link></li>
          <li><Link to="/contato" className="hover:text-green-400 font-semibold">Contato</Link></li>
          <li><Link to="/" className="hover:text-red-700 font-semibold">Sair</Link></li>
        </ul>
        <div className="absolute bottom-6 left-6 flex items-center space-x-4">
          <img
            src="https://i.pravatar.cc/100?u=joao"
            alt="Foto de Joao"
            className="w-10 h-10 rounded-full border-2 border-green-500"
          />
          <div>
            <Link to="/"><p className="text-sm font-semibold">Joao</p></Link>
          </div>
        </div>
      </div>

<div className="relative gap-8 ">
  <main className="mt-4 px-4 sm:px-20 ">
    <ChartLineGastosCliente />
    <TabelaGastos />
  </main>
</div>

    </div>
  );
};
export default Gastos;