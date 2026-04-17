import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faSquarePollVertical,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export function Welcome() {
  return (
    <div className="min-h-dvh bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <header className="flex flex-wrap gap-3 flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-6">
        <Link
          to="/"
          className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
        >
          Home
        </Link>

        <div className="flex gap-2 sm:gap-4">
          <Link
            to="/login"
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold text-gray-700 dark:text-gray-200 border-2 border-gray-700 dark:border-gray-400 rounded-full hover:bg-gray-700 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold text-white border-2 border-green-600 rounded-full bg-green-600 hover:bg-transparent hover:text-green-600 transition"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 py-6 sm:py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
          Assuma o controle <br className="hidden sm:block" /> de suas{" "}
          <span className="text-green-600 dark:text-green-400">finanças</span>
        </h1>
        <p className="text-base sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 py-6 sm:py-10 max-w-3xl">
          Visualize, planeje e alcance seus objetivos financeiros de forma
          simples e rápida.
        </p>

        <div>
          <Link
            to="/login"
            className="inline-block px-6 sm:px-8 py-3 text-base sm:text-xl font-semibold bg-green-600 text-white border-2 border-green-600 rounded-full hover:bg-transparent hover:text-green-600 transition"
          >
            Comece agora
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 sm:mt-16 py-10 px-6 sm:px-8 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
          <div className="flex flex-col items-center text-center gap-3">
            <FontAwesomeIcon
              icon={faCoins}
              className="text-green-500 text-5xl sm:text-6xl drop-shadow-md"
            />
            <span className="text-xl sm:text-2xl font-semibold">
              Controle de gastos
            </span>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <FontAwesomeIcon
              icon={faChartLine}
              className="text-green-500 text-5xl sm:text-6xl drop-shadow-md"
            />
            <span className="text-xl sm:text-2xl font-semibold">
              Análise de metas
            </span>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <FontAwesomeIcon
              icon={faSquarePollVertical}
              className="text-green-500 text-5xl sm:text-6xl drop-shadow-md"
            />
            <span className="text-xl sm:text-2xl font-semibold">
              Relatórios automáticos
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Welcome;
