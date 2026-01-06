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
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={onClose} />
      )}  
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-800 p-6 shadow-xl z-30 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        <div className="flex justify-content items-center mb-10">
          <h2 className="text-3xl font-bold text-green-600">Painel</h2>
        </div>

        <nav>
          <ul className="space-y-4">
            <li><Link to="/dashboard" className="block p-2 hover:bg-green-100 dark:hover:bg-green-900 rounded font-semibold text-gray-700 dark:text-gray-200">Dashboard</Link></li>
            <li><Link to="/gastos" className="block p-2 hover:bg-green-100 dark:hover:bg-green-900 rounded font-semibold text-gray-700 dark:text-gray-200">Gastos</Link></li>
            <li><Link to="/metas" className="block p-2 hover:bg-green-100 dark:hover:bg-green-900 rounded font-semibold text-gray-700 dark:text-gray-200">Metas</Link></li>
            <li><Link to="/relatorios" className="block p-2 hover:bg-green-100 dark:hover:bg-green-900 rounded font-semibold text-gray-700 dark:text-gray-200">Relatórios</Link></li>
            <li><Link to="/recursos" className="block p-2 hover:bg-green-100 dark:hover:bg-green-900 rounded font-semibold text-gray-700 dark:text-gray-200">Recursos</Link></li>
            <li><Link to="/sobre" className="block p-2 bg-green-600 text-white rounded font-semibold shadow-md">Sobre</Link></li>
            <li><Link to="/contato" className=" block p-2 hover:bg-green-100 dark:hover:bg-green-900 rounded font-semibold text-gray-700 dark:text-gray-200">Contato</Link></li>
          </ul>
        </nav>

        <div className="absolute bottom-6 left-6 w-full pr-12">
           <Link to="/" className="flex items-center space-x-3 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600 font-semibold">
             <span>Sair</span>
           </Link>
           
           <div className="flex items-center space-x-3 mt-4 border-t pt-4 border-gray-300 dark:border-gray-700">
            <img
              src="https://i.pravatar.cc/100?u=joao"
              alt="Foto de Joao"
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-white">Joao</p>
              <p className="text-xs text-gray-500">Usuário Premium</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};