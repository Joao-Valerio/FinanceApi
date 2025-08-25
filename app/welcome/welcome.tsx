import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faSquarePollVertical, faChartLine } from '@fortawesome/free-solid-svg-icons';

export function Welcome() {
  console.log("🏠 Home carregada");
  return (
    <>
      <div className="flex flex-row justify-between items-center px-8 py-6 dark:bg-gray-900">
        <Link
          to="/"
          className="px-6 py-3 text-lg font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
        >
          Home
        </Link>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 text-lg font-semibold text-gray-700 border-2 border-gray-700 rounded-full hover:bg-gray-700 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 text-lg font-semibold text-white border-2 border-green-600 rounded-full bg-green-600 hover:bg-white hover:text-green-600 transition"
          >
            Sign up
          </Link>
        </div>
      </div>

      <main className="px-12 py-12 dark:bg-gray-900">
        <h1 className="text-8xl dark:text-white">Assuma o controle <br /> de suas finanças</h1>
        <p className="text-4xl text-gray-700 py-12">
          Visualize, planeje e alcance seus objetivos <br />
          financeiros de forma simples e rápida
        </p>

        <div className="text-4xl">
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-green-500 text-white border-2 border-green-500 rounded-full hover:bg-transparent hover:text-green-500 transition"
          >
            Comece agora
          </Link>
        </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 py-20 px-8 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg">
  <div className="flex flex-col items-center text-center gap-4">
    <FontAwesomeIcon icon={faCoins} className="text-green-500 text-7xl drop-shadow-md" />
    <span className="text-4xl font-semibold text-gray-900 dark:text-white">Controle de gastos</span>
  </div>

  <div className="flex flex-col items-center text-center gap-4">
    <FontAwesomeIcon icon={faChartLine} className="text-green-500 text-7xl drop-shadow-md" />
    <span className="text-4xl font-semibold text-gray-900 dark:text-white">Análise de metas</span>
  </div>

  <div className="flex flex-col items-center text-center gap-4">
    <FontAwesomeIcon icon={faSquarePollVertical} className="text-green-500 text-7xl drop-shadow-md" />
    <span className="text-4xl font-semibold text-gray-900 dark:text-white">Relatórios automáticos</span>
  </div>
</div>
      </main>
    </>
  );
}
