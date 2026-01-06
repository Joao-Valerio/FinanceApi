import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  function handleSignUp() {
    console.log("Cadastro realizado!");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Navbar */}
      <div className="flex flex-row justify-between items-center px-8 py-6">
        <Link
          to="/"
          className="px-6 py-3 text-lg font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 text-lg font-semibold text-white border-2 border-green-600 rounded-full bg-green-600 hover:bg-white hover:text-green-600 transition"
        >
          Login
        </Link>
      </div>

      {/* Conteúdo principal */}
      <main className="p-8 dark:bg-gray-900">
        <h1 className="text-5xl font-bold text-center dark:text-white">Sign Up</h1>

        <div className="dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-4">
          <input
            type="text"
            placeholder="Nome"
            aria-label="Digite seu nome"
            className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Email"
            aria-label="Digite seu email"
            className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Senha"
            aria-label="Digite sua senha"
            className="w-full mb-6 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="button"
            onClick={handleSignUp}
            className="w-full bg-green-500 border-green-500 text-white font-semibold py-3 rounded-md duration-300 hover:bg-white hover:text-green-600 transition"
          >
            Cadastrar
          </button>

          <Link
            to="/login"
            className="block text-center text-sm text-black hover:text-gray-500 mt-4 dark:text-gray-400 dark:hover:text-white"
          >
            Já tem uma conta? <span className="font-semibold">Login</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
