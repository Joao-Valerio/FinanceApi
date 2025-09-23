import { Link } from "react-router";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"


const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - daysToSubtract);

    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Mostrando visitantes dos últimos 3 meses
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
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
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
  <stop
    offset="5%"
    stopColor="var(--color-chart-1)" 
    stopOpacity={0.8}
  />
  <stop
    offset="95%"
    stopColor="var(--color-chart-1)" 
    stopOpacity={0.1}
  />
</linearGradient>
<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
  <stop
    offset="5%"
    stopColor="var(--color-chart-2)" 
    stopOpacity={0.8}
  />
  <stop
    offset="95%"
    stopColor="var(--color-chart-2)" 
    stopOpacity={0.1}
  />
</linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", { month: "short", day: "numeric" });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
  dataKey="mobile"
  type="natural"
  fill="url(#fillMobile)"
  stroke="var(--color-chart-2)"
  stackId="a"
/>
<Area
  dataKey="desktop"
  type="natural"
  fill="url(#fillDesktop)"
  stroke="var(--color-chart-1)" 
  stackId="a"
/>
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="relative min-h-screen dark:bg-gray-900">

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="m-4 p-2 text-3xl text-black rounded hover:bg-green-700 transition dark:text-white"
      >
        ☰
      </button>


      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-30 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-400 dark:bg-gray-800 text-black dark:text-white p-6 shadow-lg transform transition-transform duration-300 z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-4xl font-bold mb-6">Painel</h2>
        <ul className="space-y-4">
            <li><Link to="/dashboard" className="hover:text-green-400 font-semibold">Dashboard</Link></li>
            <li><Link to="#" className="hover:text-green-400 font-semibold">Gastos</Link></li>
            <li><Link to="#" className="hover:text-green-400 font-semibold">Metas</Link></li>
            <li><Link to="#" className="hover:text-green-400 font-semibold">Relatórios</Link></li>
            <li><Link to="#" className="hover:text-green-400 font-semibold">Recursos</Link></li>
            <li><Link to="/sobre" className="hover:text-green-400 font-semibold">Sobre</Link></li>
            <li><Link to="#" className="hover:text-green-400 font-semibold">Contato</Link></li>
            <li><Link to="/" className="hover:text-red-700 font-semibold">Sair</Link></li>

        </ul>
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

<main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
  {/* 💰 Saldo do usuário */}
  <section className="text-black dark:bg-gray-800 dark:text-white p-4 bg-gray-200 rounded-2xl  shadow-md md:col-span-1 flex flex-col justify-center">
    <h3 className="text-6xl font-bold mb-1 ">Saldo Atual</h3>
    <p className="text-4xl font-semibold text-green-400">R$ 3.250,00</p>
  </section>

  {/* ➕ Adicionar transação */}
  <section className="text-black dark:bg-gray-800 dark:text-white bg-gray-200 p-6 rounded-2xl shadow-md md:col-span-2">
    <h3 className="text-xl font-bold mb-4">Adicionar Transação</h3>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Descrição"
        className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="number"
        placeholder="Valor"
        className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white"
      />
      <select className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white md:col-span-2">
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-3xl font-semibold md:col-span-2"
      >
        Adicionar
      </button>
    </form>
  </section>

  {/* 📜 Histórico de transações */}
  <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md md:col-span-3">
    <h3 className="text-xl font-bold mb-4">Histórico de Transações</h3>
    <ul className="space-y-2">
      <li className="flex justify-between border-b border-gray-700 pb-2">
        <span>Salário</span>
        <span className="text-green-400">+ R$ 5.000,00</span>
      </li>
      <li className="flex justify-between border-b border-gray-700 pb-2">
        <span>Supermercado</span>
        <span className="text-red-400">- R$ 320,00</span>
      </li>
      <li className="flex justify-between border-b border-gray-700 pb-2">
        <span>Netflix</span>
        <span className="text-red-400">- R$ 39,90</span>
      </li>
    </ul>
  </section>

  {/* 📊 Gráfico financeiro */}
  <section className=" bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md md:col-span-3">
    <h3 className="text-xl font-bold mb-4">Resumo Gráfico</h3>
<div className="bg-card dark:bg-card-foreground rounded-2xl p-4 text-center text-foreground">
  <ChartAreaInteractive />
</div>
  </section>
</main>
    </div>
  );
};

export default Dashboard;