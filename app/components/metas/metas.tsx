// src/pages/Metas.tsx
import { Link } from "react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

const Metas = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const metasMock = [
    { id: 1, titulo: "Reserva de emergência", objetivo: 5000, atual: 3250, prazo: "Dez/2025" },
    { id: 2, titulo: "Quitar cartão de crédito", objetivo: 2000, atual: 800, prazo: "Mar/2025" },
    { id: 3, titulo: "Viagem de férias", objetivo: 4000, atual: 1200, prazo: "Jul/2025" },
  ];

  const calcProgresso = (meta: { objetivo: number; atual: number }) =>
    Math.min(100, Math.round((meta.atual / meta.objetivo) * 100));

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
          className="fixed inset-0 bg-black/40 z-10"
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
            <Link to="/">
              <p className="text-sm font-semibold">Joao</p>
            </Link>
          </div>
        </div>
      </div>

      <main className="p-8 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 text-white">
        {/* Cabeçalho */}
        <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md lg:col-span-3 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Metas financeiras</h1>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Crie e acompanhe metas como reserva de emergência, viagem ou quitação de dívidas.
            </p>
          </div>
        </section>

        {/* Lista de metas */}
        <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-2">Metas ativas</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {metasMock.map((meta) => {
              const progresso = calcProgresso(meta);
              return (
                <Card key={meta.id} className="bg-gray-100 dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-lg">{meta.titulo}</CardTitle>
                    <CardDescription>Prazo: {meta.prazo}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      Guardado:{" "}
                      <span className="font-semibold text-green-500">
                        R$ {meta.atual.toFixed(2)}
                      </span>{" "}
                      de R$ {meta.objetivo.toFixed(2)}
                    </p>
                    <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-green-600"
                        style={{ width: `${progresso}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Progresso: {progresso}%
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Criar nova meta (futuro: IA avalia se é realista) */}
        <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Criar nova meta</h2>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Nome da meta (ex: Reserva de emergência)"
              className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Valor objetivo (R$)"
              className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="month"
              className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-3xl font-semibold"
            >
              Salvar meta
            </button>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              Em versões futuras, a IA vai analisar se essa meta é realista com base no seu histórico de gastos.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Metas;
