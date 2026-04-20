import { Link, useNavigate } from "react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "../../lib/auth";
import { ApiError } from "../../lib/api";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      await login(email, senha);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setErro(err.message);
      } else {
        setErro("Não foi possível entrar. Tente novamente.");
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
          to="/signup"
          className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold text-white border-2 border-green-600 rounded-full bg-green-600 hover:bg-transparent hover:text-green-600 transition"
        >
          Sign up
        </Link>
      </div>

      <main className="px-4 sm:px-8 pb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">Login</h1>

        <form
          onSubmit={handleLogin}
          className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm w-full max-w-md mx-auto mt-6"
        >
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
            placeholder="Senha"
            aria-label="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
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
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="block mx-auto text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mt-4 transition"
          >
            Esqueceu sua senha?
          </button>

          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  Esqueceu sua senha?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                  Digite seu email e enviaremos um link para redefinir sua
                  senha.
                </p>

                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Digite seu email para recuperação"
                  autoFocus
                  className="w-full mb-6 px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 border-2 border-green-600 text-green-600 bg-transparent rounded-lg hover:bg-green-600 hover:text-white transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default Login;
