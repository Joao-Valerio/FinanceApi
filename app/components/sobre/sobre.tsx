import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faSquarePollVertical,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { AppLayout } from "../layout/AppLayout";

export const Sobre = () => {
  return (
    <AppLayout>
      <main>
        <section className="pt-6 sm:pt-10 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-center text-gray-900 dark:text-white leading-tight mb-6">
            Sua{" "}
            <span className="text-green-600 dark:text-green-400">
              vida financeira
            </span>{" "}
            sob controle,{" "}
            <span className="text-green-600 dark:text-green-400">
              em um só lugar
            </span>
          </h1>

          <div className="text-gray-800 dark:text-gray-100 text-base sm:text-lg leading-relaxed space-y-6">
            <p>
              Uma aplicação de controle financeiro desenvolvida para transformar
              a forma como você lida com o seu dinheiro. Com uma interface
              intuitiva e recursos inteligentes, ela permite que você:
            </p>

            <ul className="space-y-5">
              <li>
                <span className="block text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                  Acompanhe seus gastos com precisão:
                </span>
                Registre despesas automaticamente ou manualmente, classifique
                por categoria e identifique onde está gastando mais.
              </li>
              <li>
                <span className="block text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                  Defina metas financeiras realistas:
                </span>
                Seja economizar para uma viagem, comprar um carro ou montar uma
                reserva de emergência — acompanhe seu progresso com indicadores
                visuais.
              </li>
              <li>
                <span className="block text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                  Analise seu progresso com relatórios inteligentes:
                </span>
                Gráficos comparativos, tendências e resumos mensais ajudam você
                a entender sua evolução e tomar decisões mais conscientes.
              </li>
            </ul>

            <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white pt-2">
              Mais do que uma ferramenta, é seu parceiro na jornada rumo à
              liberdade financeira.
            </p>
          </div>
        </section>

        <div className="px-4 sm:px-8 lg:px-16 py-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-10 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
            <div className="flex flex-col items-center text-center gap-3">
              <FontAwesomeIcon
                icon={faCoins}
                className="text-green-500 text-5xl sm:text-6xl drop-shadow-md"
              />
              <span className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                Controle de gastos
              </span>
              <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Visibilidade total sobre suas despesas diárias, semanais e
                mensais.
              </span>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-green-500 text-5xl sm:text-6xl drop-shadow-md"
              />
              <span className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                Análise de metas
              </span>
              <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Objetivos financeiros claros para viagens, dívidas ou reserva.
              </span>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <FontAwesomeIcon
                icon={faSquarePollVertical}
                className="text-green-500 text-5xl sm:text-6xl drop-shadow-md"
              />
              <span className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                Relatórios automáticos
              </span>
              <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Gráficos comparativos como um consultor na palma da mão.
              </span>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Sobre;
