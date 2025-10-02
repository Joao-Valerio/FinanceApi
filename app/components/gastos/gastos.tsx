import React, { useState } from 'react';
import { Link } from 'react-router';
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import type { ChartConfig } from "../ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"

export const description = "Gráfico de gastos do cliente"

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
  { date: "2024-04-11", gastos: 327 },
  { date: "2024-04-12", gastos: 292 },
  { date: "2024-04-13", gastos: 342 },
  { date: "2024-04-14", gastos: 137 },
  { date: "2024-04-15", gastos: 120 },
  { date: "2024-04-16", gastos: 138 },
  { date: "2024-04-17", gastos: 446 },
  { date: "2024-04-18", gastos: 364 },
  { date: "2024-04-19", gastos: 243 },
  { date: "2024-04-20", gastos: 89 },
  { date: "2024-04-21", gastos: 137 },
  { date: "2024-04-22", gastos: 224 },
  { date: "2024-04-23", gastos: 138 },
  { date: "2024-04-24", gastos: 387 },
  { date: "2024-04-25", gastos: 215 },
  { date: "2024-04-26", gastos: 75 },
  { date: "2024-04-27", gastos: 383 },
  { date: "2024-04-28", gastos: 122 },
  { date: "2024-04-29", gastos: 315 },
  { date: "2024-04-30", gastos: 454 },
  { date: "2024-05-01", gastos: 165 },
  { date: "2024-05-02", gastos: 293 },
  { date: "2024-05-03", gastos: 247 },
  { date: "2024-05-04", gastos: 385 },
  { date: "2024-05-05", gastos: 481 },
  { date: "2024-05-06", gastos: 498 },
  { date: "2024-05-07", gastos: 388 },
  { date: "2024-05-08", gastos: 149 },
  { date: "2024-05-09", gastos: 227 },
  { date: "2024-05-10", gastos: 293 },
  { date: "2024-05-11", gastos: 335 },
  { date: "2024-05-12", gastos: 197 },
  { date: "2024-05-13", gastos: 197 },
  { date: "2024-05-14", gastos: 448 },
  { date: "2024-05-15", gastos: 473 },
  { date: "2024-05-16", gastos: 338 },
  { date: "2024-05-17", gastos: 499 },
  { date: "2024-05-18", gastos: 315 },
  { date: "2024-05-19", gastos: 235 },
  { date: "2024-05-20", gastos: 177 },
  { date: "2024-05-21", gastos: 82 },
  { date: "2024-05-22", gastos: 81 },
  { date: "2024-05-23", gastos: 252 },
  { date: "2024-05-24", gastos: 294 },
  { date: "2024-05-25", gastos: 201 },
  { date: "2024-05-26", gastos: 213 },
  { date: "2024-05-27", gastos: 420 },
  { date: "2024-05-28", gastos: 233 },
  { date: "2024-05-29", gastos: 78 },
  { date: "2024-05-30", gastos: 340 },
  { date: "2024-05-31", gastos: 178 },
  { date: "2024-06-01", gastos: 178 },
  { date: "2024-06-02", gastos: 470 },
  { date: "2024-06-03", gastos: 103 },
  { date: "2024-06-04", gastos: 439 },
  { date: "2024-06-05", gastos: 88 },
  { date: "2024-06-06", gastos: 294 },
  { date: "2024-06-07", gastos: 323 },
  { date: "2024-06-08", gastos: 385 },
  { date: "2024-06-09", gastos: 438 },
  { date: "2024-06-10", gastos: 155 },
  { date: "2024-06-11", gastos: 92 },
  { date: "2024-06-12", gastos: 492 },
  { date: "2024-06-13", gastos: 81 },
  { date: "2024-06-14", gastos: 426 },
  { date: "2024-06-15", gastos: 307 },
  { date: "2024-06-16", gastos: 371 },
  { date: "2024-06-17", gastos: 475 },
  { date: "2024-06-18", gastos: 107 },
  { date: "2024-06-19", gastos: 341 },
  { date: "2024-06-20", gastos: 408 },
  { date: "2024-06-21", gastos: 169 },
  { date: "2024-06-22", gastos: 317 },
  { date: "2024-06-23", gastos: 480 },
  { date: "2024-06-24", gastos: 132 },
  { date: "2024-06-25", gastos: 141 },
  { date: "2024-06-26", gastos: 434 },
  { date: "2024-06-27", gastos: 448 },
  { date: "2024-06-28", gastos: 149 },
  { date: "2024-06-29", gastos: 103 },
  { date: "2024-06-30", gastos: 446 },
]

const chartConfig = {
  gastos: {
    label: "Gastos do Cliente",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartLineGastosCliente() {
  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.gastos, 0),
    []
  )

  const saldo = 1250; // exemplo de saldo do cliente

  return (
    <Card className="py-4 sm:py-0">
      {/* Saldo pequeno em cima do gráfico */}
      <div className="px-6 mb-2">
        <span className="text-xs text-muted-foreground">Saldo atual</span>
        <p className="text-sm font-semibold">R$ {saldo.toLocaleString()}</p>
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
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                })
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
                    })
                  }}
                />
              }
            />
            <Line
              dataKey="gastos"
              type="monotone"
              stroke={`var(--color-gastos)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const Gastos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Tela principal */}
      <div className="relative min-h-screen dark:bg-gray-900">
        {/* Botão do menu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="m-4 p-2 text-3xl text-black rounded hover:bg-green-700 transition dark:text-white"
        >
          ☰
        </button>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-10"
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

          {/* Usuário */}
          <div className="absolute bottom-6 left-6 flex items-center space-x-4">
            <img
              src="https://i.pravatar.cc/100?u=joao"
              alt="Foto de Joao"
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
            <div>
              <Link to="/">
                <p className="text-sm font-semibold">Joao</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico com saldo em cima */}
      <main className="p-4">
        <ChartLineGastosCliente />
      </main>
    </div>
  );
};

export default Gastos;
