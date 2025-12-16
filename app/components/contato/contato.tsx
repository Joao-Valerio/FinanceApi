import React, { useState } from "react";
import { ContactForm } from "./contatoForm";
import { Sidebar } from "./contatoSidebar";   
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export const Contato: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen dark:bg-gray-900">
      
      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="absolute m-4 p-2 text-3xl text-black dark:text-white hover:bg-green-700 rounded z-30"
        >
          ☰
        </button>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 px-4 py-4 sm:px-8 md:px-12 lg:px-20 flex items-center justify-center">
        <section className="w-full max-w-4xl p-6 bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700">
          
          <h2 className="text-3xl font-bold mb-6 text-green-600">Fale com o Suporte</h2>

          <div className="md:flex md:gap-10">
            <div className="md:w-1/2 space-y-4 mb-6 md:mb-0">
               <h3 className="text-xl font-bold">Ajuda com suas finanças</h3>
               <p>Texto de ajuda...</p>
            </div>

            <ContactForm />
            
          </div>
          
          <div className="mt-8 flex gap-6">
             <FaInstagram /> <FaWhatsapp />
          </div>

        </section>
      </main>
    </div>
  );
};