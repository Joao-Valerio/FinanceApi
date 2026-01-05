// src/pages/Relatorios.tsx
import { Link } from "react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Sidebar } from "./relatoriossidebar";

const Relatorios = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [periodo, setPeriodo] = useState("mensal");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
            <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="m-4 p-2 text-3xl text-black rounded hover:bg-green-700 transition dark:text-white"
      >
        ☰
      </button>


      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="p-8 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 text-white">
        {/* Cabeçalho + filtros */}
        <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md lg:col-span-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Visualize um resumo detalhado dos seus ganhos, gastos e saldo em diferentes períodos.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setPeriodo("mensal")}
              className={`px-4 py-2 rounded-3xl text-sm font-semibold ${
                periodo === "mensal" ? "bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setPeriodo("trimestral")}
              className={`px-4 py-2 rounded-3xl text-sm font-semibold ${
                periodo === "trimestral" ? "bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              Trimestral
            </button>
            <button
              onClick={() => setPeriodo("anual")}
              className={`px-4 py-2 rounded-3xl text-sm font-semibold ${
                periodo === "anual" ? "bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              Anual
            </button>
          </div>
        </section>

        {/* Cards de resumo numérico */}
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
            <CardHeader>
              <CardTitle>Entradas no período</CardTitle>
              <CardDescription>{periodo.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">R$ 8.750,00</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
            <CardHeader>
              <CardTitle>Saídas no período</CardTitle>
              <CardDescription>{periodo.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-500">R$ 5.430,00</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
            <CardHeader>
              <CardTitle>Saldo final</CardTitle>
              <CardDescription>{periodo.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-500">R$ 3.320,00</p>
            </CardContent>
          </Card>
        </section>

        {/* Tabela simples de categorias */}
        <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md lg:col-span-2 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Resumo por categoria</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Categoria</th>
                <th className="text-right py-2">Total gasto (R$)</th>
                <th className="text-right py-2">% do total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">Alimentação</td>
                <td className="py-2 text-right">R$ 1.250,00</td>
                <td className="py-2 text-right">23%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Transporte</td>
                <td className="py-2 text-right">R$ 600,00</td>
                <td className="py-2 text-right">11%</td>
              </tr>
              <tr className="border-b border-gray-700">
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

        {/* Geração de relatório com IA (placeholder) */}
        <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-2">Relatório inteligente (IA)</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Em versões futuras, aqui a IA vai gerar um texto completo com insights, comparação com meses anteriores e um PDF pronto para download.
          </p>
          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-3xl font-semibold"
          >
            Gerar relatório descritivo
          </button>
        </section>
      </main>
    </div>
  );
};

export default Relatorios;
