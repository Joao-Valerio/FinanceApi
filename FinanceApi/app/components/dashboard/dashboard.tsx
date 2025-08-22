import { Link } from "react-router";
import { useState } from "react";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-900">

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="m-4 p-2 text-3xl text-white rounded hover:bg-green-700 transition"
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
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 shadow-lg transform transition-transform duration-300 z-20 ${
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
  <section className="bg-gray-800 p-4 rounded-2xl shadow-md md:col-span-1 flex flex-col justify-center">
    <h3 className="text-6xl font-bold mb-1 ">Saldo Atual</h3>
    <p className="text-4xl font-semibold text-green-400">R$ 3.250,00</p>
  </section>

  {/* ➕ Adicionar transação */}
  <section className="bg-gray-800 p-6 rounded-2xl shadow-md md:col-span-2">
    <h3 className="text-xl font-bold mb-4">Adicionar Transação</h3>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Descrição"
        className="w-full p-2 rounded-3xl bg-gray-700 text-white"
      />
      <input
        type="number"
        placeholder="Valor"
        className="w-full p-2 rounded-3xl bg-gray-700 text-white"
      />
      <select className="w-full p-2 rounded-3xl bg-gray-700 text-white md:col-span-2">
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
  <section className="bg-gray-800 p-6 rounded-2xl shadow-md md:col-span-3">
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
  <section className="bg-gray-800 p-6 rounded-2xl shadow-md md:col-span-3">
    <h3 className="text-xl font-bold mb-4">Resumo Gráfico</h3>
    <div className="bg-gray-700 rounded-2xl p-4 text-center text-gray-400">
      [Gráfico será exibido aqui]
    </div>
  </section>
</main>
    </div>
  );
};

export default Dashboard;