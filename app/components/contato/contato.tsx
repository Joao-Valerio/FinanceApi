import React, { useState } from 'react'
import { Link } from 'react-router';

export const Contato = () => {
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
    </div>
  )
}

export default Contato