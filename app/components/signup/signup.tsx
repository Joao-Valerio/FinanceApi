import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  function handleSignUp() {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-dvh bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="flex flex-row justify-between items-center gap-3 px-4 sm:px-8 py-4 sm:py-6">
        <Link
          to="/"
          className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold text-white border-2 border-green-600 rounded-full bg-green-600 hover:bg-transparent hover:text-green-600 transition"
        >
          Login
        </Link>
      </div>

      <main className="px-4 sm:px-8 pb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">Cadastro</h1>

        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm w-full max-w-md mx-auto mt-6">
          <input
            type="text"
            placeholder="Nome"
            aria-label="Digite seu nome"
<<<<<<< HEAD
            className="w-full mb-4 px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
=======
            className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
>>>>>>> a3f6e489cb38d454626ead9f3ba6f11c218f500c
          />

          <input
            type="email"
            placeholder="Email"
            aria-label="Digite seu email"
<<<<<<< HEAD
            className="w-full mb-4 px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
=======
            className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
>>>>>>> a3f6e489cb38d454626ead9f3ba6f11c218f500c
          />

          <input
            type="password"
            placeholder="Senha"
            aria-label="Digite sua senha"
<<<<<<< HEAD
            className="w-full mb-6 px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
=======
            className="w-full mb-6 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
>>>>>>> a3f6e489cb38d454626ead9f3ba6f11c218f500c
          />

          <button
            type="button"
            onClick={handleSignUp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
          >
            Cadastrar
          </button>

          <Link
            to="/login"
            className="block text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mt-4 transition"
          >
            Já tem uma conta?{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              Login
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
