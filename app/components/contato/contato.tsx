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

      <main className="flex-1 px-4 py-4 sm:px-8 md:px-12 lg:px-20 flex items-center justify-center">
        <section className="w-full max-w-4xl p-6 bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700">
          
          <h2 className="text-3xl font-bold mb-6 text-green-600">Fale com o Suporte</h2>

          <div className="md:flex gap-4 ">
            <div className="md:w-1/2 space-y-4 mb-6 md:mb-0">
               <h3 className="text-xl font-bold">Ajuda com suas finanças</h3>
               <p>
                  Está com dúvidas sobre lançamentos, metas, relatórios ou
                  assinatura? Envie uma mensagem e a equipe de suporte financeiro
                  responde o mais rápido possível.
                </p>
                 <div>
                  <span className="block font-medium text-gray-900 dark:text-white">
                    Email:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    suporte@meusgastos.app
                  </span>
                </div>

                <div>
                  <span className="block font-medium text-gray-900 dark:text-white">
                    Telefone:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    (11) 4000-1234
                  </span>
                </div>

                <div>
                  <span className="block font-medium text-gray-900 dark:text-white">
                    Horário de atendimento:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Segunda a sexta, 9h às 18h
                  </span>
                </div>

            </div>

            <ContactForm />
          </div>            
          <div className="mt-8 flex gap-2 ">
            <FaInstagram /> <FaWhatsapp />
          </div>
        </section>
      </main>
    </div>
  );
};