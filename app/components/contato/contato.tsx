import React, { useState } from "react";
import { ContactForm } from "./contatoForm";
import { Sidebar } from "./contatoSidebar";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export const Contato: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <main 
        className={`transition-all duration-300 min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-gray-900 
        ${sidebarOpen ? "md:ml-64" : "ml-0"}`}
      >
        
        <div className="
          w-full max-w-5xl bg-gray-200 dark:bg-gray-800 rounded-[2rem]
          shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-5/12 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-green-600 mb-2">Fale com o Suporte</h2>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Ajuda com suas finanças</h3>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  Está com dúvidas sobre lançamentos, metas, relatórios ou
                  assinatura? Envie uma mensagem e a equipe de suporte financeiro
                  responde o mais rápido possível.
                </p>
                
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 dark:text-white">Email:</p>
                  <p>suporte@financeapi.com</p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 dark:text-white">Horário:</p>
                  <p>Segunda a Sexta, 9h às 18h</p>
                </div>
              </div>
            </div>

            <div className="mt-9 md:mt-auto flex gap-6 text-2xl text-gray-500">
               <a href="#" className="hover:text-green-600 transition-colors gap-6"><FaInstagram /></a>
               <a href="#" className="hover:text-green-600 transition-colors gap-6"><FaWhatsapp /></a>
            </div>
          </div>
          <div className="md:w-7/12 bg-gray-200 dark:bg-gray-700 p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
};