import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { ChartConfig } from "../ui/chart";
import { AppLayout } from "../layout/AppLayout";

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

const chartData: ChartDataItem[] = [
  { date: "2024-04-01", Entradas: 222, Saídas: 150 },
  { date: "2024-04-02", Entradas: 97, Saídas: 180 },
  { date: "2024-04-03", Entradas: 167, Saídas: 120 },
  { date: "2024-04-04", Entradas: 242, Saídas: 260 },
  { date: "2024-04-05", Entradas: 373, Saídas: 290 },
  { date: "2024-04-06", Entradas: 301, Saídas: 340 },
  { date: "2024-04-07", Entradas: 245, Saídas: 180 },
  { date: "2024-04-08", Entradas: 409, Saídas: 320 },
  { date: "2024-04-09", Entradas: 59, Saídas: 110 },
  { date: "2024-04-10", Entradas: 261, Saídas: 190 },
  { date: "2024-04-11", Entradas: 327, Saídas: 350 },
  { date: "2024-04-12", Entradas: 292, Saídas: 210 },
  { date: "2024-04-13", Entradas: 342, Saídas: 380 },
  { date: "2024-04-14", Entradas: 137, Saídas: 220 },
  { date: "2024-04-15", Entradas: 120, Saídas: 170 },
  { date: "2024-04-16", Entradas: 138, Saídas: 190 },
  { date: "2024-04-17", Entradas: 446, Saídas: 360 },
  { date: "2024-04-18", Entradas: 364, Saídas: 410 },
  { date: "2024-04-19", Entradas: 243, Saídas: 180 },
  { date: "2024-04-20", Entradas: 89, Saídas: 150 },
  { date: "2024-04-21", Entradas: 137, Saídas: 200 },
  { date: "2024-04-22", Entradas: 224, Saídas: 170 },
  { date: "2024-04-23", Entradas: 138, Saídas: 230 },
  { date: "2024-04-24", Entradas: 387, Saídas: 290 },
  { date: "2024-04-25", Entradas: 215, Saídas: 250 },
  { date: "2024-04-26", Entradas: 75, Saídas: 130 },
  { date: "2024-04-27", Entradas: 383, Saídas: 420 },
  { date: "2024-04-28", Entradas: 122, Saídas: 180 },
  { date: "2024-04-29", Entradas: 315, Saídas: 240 },
  { date: "2024-04-30", Entradas: 454, Saídas: 380 },
  { date: "2024-05-01", Entradas: 165, Saídas: 220 },
  { date: "2024-05-02", Entradas: 293, Saídas: 310 },
  { date: "2024-05-03", Entradas: 247, Saídas: 190 },
  { date: "2024-05-04", Entradas: 385, Saídas: 420 },
  { date: "2024-05-05", Entradas: 481, Saídas: 390 },
  { date: "2024-05-06", Entradas: 498, Saídas: 520 },
  { date: "2024-05-07", Entradas: 388, Saídas: 300 },
  { date: "2024-05-08", Entradas: 149, Saídas: 210 },
  { date: "2024-05-09", Entradas: 227, Saídas: 180 },
  { date: "2024-05-10", Entradas: 293, Saídas: 330 },
  { date: "2024-05-11", Entradas: 335, Saídas: 270 },
  { date: "2024-05-12", Entradas: 197, Saídas: 240 },
  { date: "2024-05-13", Entradas: 197, Saídas: 160 },
  { date: "2024-05-14", Entradas: 448, Saídas: 490 },
  { date: "2024-05-15", Entradas: 473, Saídas: 380 },
  { date: "2024-05-16", Entradas: 338, Saídas: 400 },
  { date: "2024-05-17", Entradas: 499, Saídas: 420 },
  { date: "2024-05-18", Entradas: 315, Saídas: 350 },
  { date: "2024-05-19", Entradas: 235, Saídas: 180 },
  { date: "2024-05-20", Entradas: 177, Saídas: 230 },
  { date: "2024-05-21", Entradas: 82, Saídas: 140 },
  { date: "2024-05-22", Entradas: 81, Saídas: 120 },
  { date: "2024-05-23", Entradas: 252, Saídas: 290 },
  { date: "2024-05-24", Entradas: 294, Saídas: 220 },
  { date: "2024-05-25", Entradas: 201, Saídas: 250 },
  { date: "2024-05-26", Entradas: 213, Saídas: 170 },
  { date: "2024-05-27", Entradas: 420, Saídas: 460 },
  { date: "2024-05-28", Entradas: 233, Saídas: 190 },
  { date: "2024-05-29", Entradas: 78, Saídas: 130 },
  { date: "2024-05-30", Entradas: 340, Saídas: 280 },
  { date: "2024-05-31", Entradas: 178, Saídas: 230 },
  { date: "2024-06-01", Entradas: 178, Saídas: 200 },
  { date: "2024-06-02", Entradas: 470, Saídas: 410 },
  { date: "2024-06-03", Entradas: 103, Saídas: 160 },
  { date: "2024-06-04", Entradas: 439, Saídas: 380 },
  { date: "2024-06-05", Entradas: 88, Saídas: 140 },
  { date: "2024-06-06", Entradas: 294, Saídas: 250 },
  { date: "2024-06-07", Entradas: 323, Saídas: 370 },
  { date: "2024-06-08", Entradas: 385, Saídas: 320 },
  { date: "2024-06-09", Entradas: 438, Saídas: 480 },
  { date: "2024-06-10", Entradas: 155, Saídas: 200 },
  { date: "2024-06-11", Entradas: 92, Saídas: 150 },
  { date: "2024-06-12", Entradas: 492, Saídas: 420 },
  { date: "2024-06-13", Entradas: 81, Saídas: 130 },
  { date: "2024-06-14", Entradas: 426, Saídas: 380 },
  { date: "2024-06-15", Entradas: 307, Saídas: 350 },
  { date: "2024-06-16", Entradas: 371, Saídas: 310 },
  { date: "2024-06-17", Entradas: 475, Saídas: 520 },
  { date: "2024-06-18", Entradas: 107, Saídas: 170 },
  { date: "2024-06-19", Entradas: 341, Saídas: 290 },
  { date: "2024-06-20", Entradas: 408, Saídas: 450 },
  { date: "2024-06-21", Entradas: 169, Saídas: 210 },
  { date: "2024-06-22", Entradas: 317, Saídas: 270 },
  { date: "2024-06-23", Entradas: 480, Saídas: 530 },
  { date: "2024-06-24", Entradas: 132, Saídas: 180 },
  { date: "2024-06-25", Entradas: 141, Saídas: 190 },
  { date: "2024-06-26", Entradas: 434, Saídas: 380 },
  { date: "2024-06-27", Entradas: 448, Saídas: 490 },
  { date: "2024-06-28", Entradas: 149, Saídas: 200 },
  { date: "2024-06-29", Entradas: 103, Saídas: 160 },
  { date: "2024-06-30", Entradas: 446, Saídas: 400 },
];

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

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");

    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;

    if (isMobile) daysToSubtract = Math.floor(daysToSubtract / 2);

    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

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
      </CardContent>
    </Card>
  );
}

export const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <main className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <section className="md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm flex flex-col justify-center min-h-[160px]">
          <h3 className="text-2xl sm:text-3xl font-bold mb-1">Saldo atual</h3>
          <p className="text-3xl sm:text-4xl font-semibold text-green-600 dark:text-green-400">
            R$ 3.250,00
          </p>
        </section>

        <section className="md:col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Adicionar transação
          </h3>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Descrição"
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Valor"
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              className="sm:col-span-2 w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Tipo de transação"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
            <button
              type="submit"
              className="sm:col-span-2 w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl font-semibold transition"
            >
              Adicionar
            </button>
          </form>
        </section>

        <section className="md:col-span-3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Histórico de transações
          </h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="flex justify-between py-2">
              <span>Salário</span>
              <span className="text-green-600 dark:text-green-400">
                + R$ 5.000,00
              </span>
            </li>
            <li className="flex justify-between py-2">
              <span>Supermercado</span>
              <span className="text-red-500">- R$ 320,00</span>
            </li>
            <li className="flex justify-between py-2">
              <span>Netflix</span>
              <span className="text-red-500">- R$ 39,90</span>
            </li>
          </ul>
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
