import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faSquarePollVertical, faChartLine } from '@fortawesome/free-solid-svg-icons';

export function Welcome() {
  console.log("🏠 Home carregada");
  return (
    <>
      <div className="flex flex-row justify-between items-center px-8 py-6 shadow-md">
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

      <main className="px-12 py-12">
        <h1 className="text-8xl">Assuma o controle <br /> de suas finanças</h1>
        <p className="text-4xl text-gray-700 py-12">
          Visualize, planeje e alcance seus objetivos <br />
          financeiros de forma simples e rápida
        </p>

        <div className="text-4xl">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-green-500 text-white border-2 border-green-500 rounded-full hover:bg-transparent hover:text-green-500 transition"
          >
            Comece agora
          </Link>
        </div>

        <div className="flex flex-row justify-between mt-8 py-20">
          <div className="flex items-center gap-5">
            <FontAwesomeIcon icon={faCoins} className="text-green-500" />
            <span className="text-2xl">Controle de gastos</span>
          </div>
          <div className="flex items-center gap-5">
            <FontAwesomeIcon icon={faChartLine} className="text-green-500" />
            <span className="text-2xl">Análise de metas</span>
          </div>
          <div className="flex items-center gap-5">
            <FontAwesomeIcon icon={faSquarePollVertical} className="text-green-500" />
            <span className="text-2xl">Relatórios automáticos</span>
          </div>
        </div>
      </main>
    </>
  );
}
