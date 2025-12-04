// src/pages/Recursos.tsx
import { Link } from "react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

const Recursos = () => {
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
        <section className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md lg:col-span-3">
          <h1 className="text-3xl font-bold mb-2">Recursos de IA</h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Central de ferramentas inteligentes do seu gerenciador financeiro: classificação automática, previsões, simulador e assistente em linguagem natural.
          </p>
        </section>

        {/* Classificação automática de despesas */}
        <Card className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
          <CardHeader>
            <CardTitle>Classificação automática de despesas</CardTitle>
            <CardDescription>
              A IA sugere categorias com base na descrição da transação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              type="text"
              placeholder="Ex: Uber, McDonald's, PIX academia..."
              className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white"
            />
            <button className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-3xl font-semibold">
              Sugerir categoria (IA)
            </button>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              No backend, você poderá enviar a descrição para uma API de IA e receber a categoria mais provável.
            </p>
          </CardContent>
        </Card>

        {/* Previsão & planejamento */}
        <Card className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
          <CardHeader>
            <CardTitle>Previsão e planejamento</CardTitle>
            <CardDescription>
              Estime saldo futuro e risco financeiro com base no histórico.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              type="number"
              placeholder="Saldo atual (R$)"
              className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white"
            />
            <select className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white">
              <option>Próximos 30 dias</option>
              <option>Próximos 3 meses</option>
              <option>Próximos 12 meses</option>
            </select>
            <button className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-3xl font-semibold">
              Gerar previsão (IA)
            </button>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              Em versões futuras, a IA pode usar séries temporais para prever gastos fixos e saldo projetado.
            </p>
          </CardContent>
        </Card>

        {/* Chatbot financeiro / Simulador */}
        <Card className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white lg:col-span-1">
          <CardHeader>
            <CardTitle>Assistente financeiro</CardTitle>
            <CardDescription>
              Faça perguntas em linguagem natural sobre seus gastos e metas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              rows={4}
              placeholder="Ex: Quanto gastei com mercado no último mês? 
Ex: Se eu guardar 300 por mês, quanto terei em 5 anos?"
              className="w-full p-2 rounded-3xl bg-gray-400 dark:bg-gray-700 dark:text-white"
            />
            <button className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-3xl font-semibold">
              Perguntar à IA
            </button>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              Quando conectado ao banco de dados, o assistente vai ler seus dados reais e responder com números e explicações.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Recursos;
