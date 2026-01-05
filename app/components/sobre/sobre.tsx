import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faSquarePollVertical, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from "./sobreSidebar";

export const Sobre = () => {
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
