// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-10" onClick={onClose} />
      )}


      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-400 dark:bg-gray-800 p-6 shadow-lg z-20 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-4xl font-bold">Painel</h2>

           <button onClick={onClose} className="text-red-500 font-bold text-xl">X</button>
        </div>
        
        <ul className="space-y-4">
          <li><Link to="/dashboard" onClick={onClose}>Dashboard</Link></li>
        </ul>
      </div>
    </>
  );
};