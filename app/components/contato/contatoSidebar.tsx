// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div>


      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-10" onClick={onClose} />
      )}


      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-400 dark:bg-gray-800 p-6 shadow-lg z-20 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">Painel</h2>
        </div>

        <ul className="space-y-4">
          <li><Link to="/dashboard" className="hover:text-green-400 font-semibold" onClick={onClose}>Dashboard</Link></li>
          <li><Link to="/gastos" className="hover:text-green-400 font-semibold">Gastos</Link></li>
          <li><Link to="/metas" className="hover:text-green-400 font-semibold">Metas</Link></li>
          <li><Link to="/relatorios" className="hover:text-green-400 font-semibold">Relatórios</Link></li>
          <li><Link to="/recursos" className="hover:text-green-400 font-semibold">Recursos</Link></li>
          <li><Link to="/sobre" className="hover:text-green-400 font-semibold">Sobre</Link></li>
          <li><Link to="/contato" className="hover:text-green-400 font-semibold">Contato</Link></li>
          <li><Link to="/" className="hover:text-red-700 font-semibold">Sair</Link></li>

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
        </ul>
      </div >


    </div >
  );
};