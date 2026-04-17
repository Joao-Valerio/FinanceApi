import { useState } from "react";
import { AppLayout } from "../layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

type Periodo = "mensal" | "trimestral" | "anual";

const periodos: { id: Periodo; label: string }[] = [
  { id: "mensal", label: "Mensal" },
  { id: "trimestral", label: "Trimestral" },
  { id: "anual", label: "Anual" },
];

const Relatorios = () => {
  const [periodo, setPeriodo] = useState<Periodo>("mensal");

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
                R$ 8.750,00
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
                R$ 5.430,00
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle>Saldo final</CardTitle>
              <CardDescription>{periodo.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl sm:text-2xl font-bold text-blue-500">
                R$ 3.320,00
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-4 sm:p-6 rounded-2xl shadow-sm lg:col-span-2 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Resumo por categoria
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <th className="text-left py-2">Categoria</th>
                <th className="text-right py-2">Total gasto (R$)</th>
                <th className="text-right py-2">% do total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2">Alimentação</td>
                <td className="py-2 text-right">R$ 1.250,00</td>
                <td className="py-2 text-right">23%</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2">Transporte</td>
                <td className="py-2 text-right">R$ 600,00</td>
                <td className="py-2 text-right">11%</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2">Contas fixas</td>
                <td className="py-2 text-right">R$ 1.800,00</td>
                <td className="py-2 text-right">33%</td>
              </tr>
              <tr>
                <td className="py-2">Lazer</td>
                <td className="py-2 text-right">R$ 450,00</td>
                <td className="py-2 text-right">8%</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold mb-2">
            Relatório inteligente (IA)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Em versões futuras, a IA vai gerar um texto com insights, comparação
            com meses anteriores e um PDF para download.
          </p>
          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl font-semibold transition"
          >
            Gerar relatório descritivo
          </button>
        </section>
      </main>
    </AppLayout>
  );
};

export default Relatorios;
