import React, { useState } from "react";
import { Sidebar } from "../sidebar/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col w-full">
        <header className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-2xl rounded-lg text-gray-800 dark:text-gray-100 hover:bg-green-500 dark:hover:bg-green-900/40 transition"
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <span className="font-semibold text-green-600 dark:text-green-400">
            FinançasApp
          </span>
        </header>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
