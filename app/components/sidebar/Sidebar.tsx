import React from "react";
import { Link, useLocation } from "react-router";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type NavItem = { to: string; label: string };

const navItems: NavItem[] = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/gastos", label: "Gastos" },
  { to: "/metas", label: "Metas" },
  { to: "/relatorios", label: "Relatórios" },
  { to: "/perfil", label: "Meu perfil" },
  { to: "/recursos", label: "Recursos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
];

function getIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const usuario: { nome: string; email: string } | null = null;

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-dvh w-72 max-w-[85vw]
          bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          p-6 shadow-xl z-30 transition-transform duration-300 ease-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
            FinançasApp
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-2xl text-gray-700 dark:text-gray-200 hover:text-green-600 transition"
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={`block px-3 py-2 rounded-lg font-medium transition-colors
                      ${
                        isActive
                          ? "bg-green-600 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/40"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-700 space-y-4">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold transition"
          >
            Sair
          </Link>

          <Link
            to="/perfil"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg p-2 -m-2 hover:bg-green-100 dark:hover:bg-green-900/40 transition"
            aria-label="Ir para meu perfil"
          >
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold border-2 border-green-500 shrink-0">
              {getIniciais(usuario?.nome ?? "")}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                {usuario?.nome ?? "Visitante"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {usuario?.email ?? "Entre na sua conta"}
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
