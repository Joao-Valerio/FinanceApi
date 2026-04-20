import { Link, useNavigate } from "react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "../../lib/auth";
import { ApiError } from "../../lib/api";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      await signup(nome, email, senha);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setErro(err.message);
      } else {
        setErro("Não foi possível criar sua conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
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

        <form
          onSubmit={handleSignUp}
          className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm w-full max-w-md mx-auto mt-6"
        >
          <input
            type="text"
            placeholder="Nome"
            aria-label="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            minLength={2}
            className="w-full mb-4 px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Email"
            aria-label="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-4 px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            aria-label="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
            className="w-full mb-4 px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {erro && (
            <p
              role="alert"
              className="mb-4 px-3 py-2 rounded-md text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-800"
            >
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
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
        </form>
      </main>
    </div>
  );
};

export default SignUp;
