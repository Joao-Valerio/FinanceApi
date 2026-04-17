import React from "react";
import { ContactForm } from "./contatoForm";
import { AppLayout } from "../layout/AppLayout";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export const Contato: React.FC = () => {
  return (
    <AppLayout>
      <main className="px-4 py-6 sm:px-6 md:px-10 lg:px-20 flex items-start justify-center">
        <section className="w-full max-w-4xl p-6 sm:p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
            Fale com o Suporte
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold">
                Ajuda com suas finanças
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Dúvidas sobre lançamentos, metas, relatórios ou assinatura?
                Envie uma mensagem e a equipe de suporte responde o mais rápido
                possível.
              </p>

              <div>
                <span className="block font-medium">Email:</span>
                <span className="text-gray-700 dark:text-gray-300">
                  suporte@meusgastos.app
                </span>
              </div>

              <div>
                <span className="block font-medium">Telefone:</span>
                <span className="text-gray-700 dark:text-gray-300">
                  (11) 4000-1234
                </span>
              </div>

              <div>
                <span className="block font-medium">Horário:</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Segunda a sexta, 9h às 18h
                </span>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="mt-8 flex items-center gap-4 text-2xl text-gray-700 dark:text-gray-200">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default Contato;
