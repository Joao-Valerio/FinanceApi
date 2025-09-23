import { Link } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faSquarePollVertical, faChartLine } from '@fortawesome/free-solid-svg-icons';

export const Sobre = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen dark:bg-gray-900">

      {/* Botão sidebar */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="m-4 p-2 text-3xl text-black dark:text-white rounded hover:bg-green-700 transition"
      >
        ☰
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-400 dark:bg-gray-800 text-black dark:text-white p-6 shadow-lg transform transition-transform duration-300 z-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-4xl font-bold mb-6">Painel</h2>
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="hover:text-green-400 font-semibold">Dashboard</Link></li>
          <li><Link to="#" className="hover:text-green-400 font-semibold">Gastos</Link></li>
          <li><Link to="#" className="hover:text-green-400 font-semibold">Metas</Link></li>
          <li><Link to="#" className="hover:text-green-400 font-semibold">Relatórios</Link></li>
          <li><Link to="#" className="hover:text-green-400 font-semibold">Recursos</Link></li>
          <li><Link to="/sobre" className="hover:text-green-400 font-semibold">Sobre</Link></li>
          <li><Link to="#" className="hover:text-green-400 font-semibold">Contato</Link></li>
          <li><Link to="/" className="hover:text-red-700 font-semibold">Sair</Link></li>
        </ul>

        {/* Usuário logado */}
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

      {/* Conteúdo principal */}
      <main>
        <section className="bg-white dark:bg-gray-900 pt-8 px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-center text-gray-900 dark:text-white leading-tight mb-6">
            <span>Sua<span className="text-green-600 dark:text-green-400"> vida financeira</span> sob controle, <span className="text-green-600 dark:text-green-400">em um só lugar</span></span>
          </h1>

          <div className="max-w-4xl ml-5 text-gray-800 dark:text-gray-100 text-lg md:text-xl leading-relaxed space-y-8">
            <p>
              Uma aplicação de controle financeiro desenvolvida para transformar a forma como você lida com o seu dinheiro. Com uma interface intuitiva e recursos inteligentes, ela permite que você:
            </p>

            <ul className="space-y-6">
              <li>
                <span className="block text-left text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  Acompanhe seus gastos com precisão:
                </span>
                Registre despesas automaticamente ou manualmente, classifique por categoria e identifique onde está gastando mais. Tenha uma visão clara do seu comportamento financeiro.
              </li>
              <li>
                <span className="block text-left text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  Defina metas financeiras realistas e motivadoras:
                </span>
                Seja economizar para uma viagem, comprar um carro ou montar uma reserva de emergência, você pode criar objetivos personalizados e acompanhar seu progresso com indicadores visuais e alertas.
              </li>
              <li>
                <span className="block text-left text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  Analise seu progresso com relatórios inteligentes:
                </span>
                Gráficos comparativos, tendências de consumo e resumos mensais ajudam você a entender sua evolução e tomar decisões mais conscientes. Tudo isso em um ambiente seguro e fácil de usar.
              </li>
            </ul>

            <p className=" text-xl font-medium text-gray-900 dark:text-white mt-8">
              Mais do que uma ferramenta, é seu parceiro na jornada rumo à liberdade financeira
            </p>
          </div>
        </section>

        {/* Cards */}
        <div className="px-12 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 py-20 px-8 bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-lg">
            <div className="flex flex-col items-center text-center gap-4">
              <FontAwesomeIcon icon={faCoins} className="text-green-500 text-7xl drop-shadow-md" />
              <span className="text-4xl font-semibold text-gray-800 dark:text-white mb-2">Controle de gastos</span>
              <span className="text-2xl text-gray-800 dark:text-white tracking-wide">
                Tenha total visibilidade sobre suas despesas diárias, semanais e mensais. Categorize seus gastos, identifique padrões de consumo e descubra onde é possível economizar.
              </span>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <FontAwesomeIcon icon={faChartLine} className="text-green-500 text-7xl drop-shadow-md" />
              <span className="text-4xl font-semibold text-gray-900 dark:text-white mb-2">Análise de metas</span>
              <span className="text-2xl text-gray-800 dark:text-white tracking-wide">
                Estabeleça objetivos financeiros claros, como juntar dinheiro para uma viagem, quitar dívidas ou montar uma reserva de emergência.
              </span>
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <FontAwesomeIcon icon={faSquarePollVertical} className="text-green-500 text-7xl drop-shadow-md" />
              <span className="text-4xl font-semibold text-gray-900 dark:text-white mb-2">Relatórios automáticos</span>
              <span className="text-2xl text-gray-800 dark:text-white tracking-wide">
                Visualize seu desempenho financeiro com relatórios detalhados e gráficos comparativos. É como ter um consultor financeiro na palma da mão.
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sobre;
