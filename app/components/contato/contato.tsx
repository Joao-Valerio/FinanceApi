import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export const Contato: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    setError("");
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <div className="relative min-h-screen dark:bg-gray-900">
      {/* Sidebar */}
      <button         
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="m-4 p-2 text-3xl text-black rounded hover:bg-green-700 transition dark:text-white">
        ☰
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10"
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
          <li><Link to="/relatorios"className="hover:text-green-400 font-semibold">Relatórios</Link></li>
          <li><Link to="/recursos"className="hover:text-green-400 font-semibold">Recursos</Link></li>
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

        <main className="flex-1 px-4 py-4 sm:px-8 md:px-12 lg:px-20 
                flex items-center justify-center">
          <section className="w-full max-w-4xl  p-6 bg-gray-200 dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-300 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
              Fale com o Suporte
            </h2>

            <div className="md:flex md:gap-10">
              {/* Infos */}
              <div className="md:w-1/2 space-y-4 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Ajuda com suas finanças
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
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


              <form
                onSubmit={handleSubmit}
                className="md:w-1/2 flex flex-col gap-4 text-gray-900 dark:text-white"
              >
                <h2 className="font-semibold">Nome</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={form.name}
                  onChange={handleChange}
                />

                <h2 className="font-semibold">Email</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="seuemail@exemplo.com"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={form.email}
                  onChange={handleChange}
                />

                <h2 className="font-semibold">Mensagem</h2>
                <textarea
                  name="message"
                  placeholder="Descreva sua dúvida, erro ou sugestão sobre o controle financeiro"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                  value={form.message}
                  onChange={handleChange}
                />

                {error && <span className="text-red-600">{error}</span>}
                {submitted && (
                  <span className="text-green-600 dark:text-green-400">
                    Mensagem enviada com sucesso! Em breve você receberá um retorno
                    do suporte.
                  </span>
                )}

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>

            {/* Redes sociais */}
            <div className="mt-8 flex gap-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-green-500 transition-colors"
              >
                <FaInstagram className="text-2xl" />
                <span>Instagram</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-green-500 transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
                <span>WhatsApp</span>
              </a>
            </div>
          </section>
        </main>
    </div>
  );
};

export default Contato;