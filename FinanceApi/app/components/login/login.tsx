import { Link, useNavigate } from "react-router";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleSignUp() {
    console.log("Cadastro realizado!");
    navigate("/dashboard");
  }
  return (
    <div>
      <div className="flex flex-row justify-between items-center px-8 py-6 ">
        <Link
          to="/"
          className="px-6 py-3 text-lg font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/signup"
          className="px-6 py-3 text-lg font-semibold text-white border-2 border-green-600 rounded-full bg-green-600 hover:bg-white hover:text-green-600 transition"
        >
          Sign up
        </Link>
      </div>

<main className="p-8">
  <h1 className="text-5xl font-bold text-center">Login</h1>

<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-4">
  <input
    type="email"
    placeholder="Email"
    className="w-full mb-4 px-4 py-3 rounded-md dark:bg-gray-700 text-white bg-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  <input
    type="password"
    placeholder="Senha"
    className="w-full mb-6 px-4 py-3 rounded-md dark:bg-gray-700 bg-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  <Link to="/dashboard">
  <button onClick={handleSignUp} className="w-full bg-green-500 border-green-500 text-white font-semibold py-3 rounded-md duration-300 hover:bg-white hover:text-green-600   transition">
    Entrar
  </button>
</Link>
  <button onClick={() => setIsOpen(true)} className="block mx-auto text-center text-sm text-gray-400 hover:text-gray-500 dark:hover:text-white mt-4">
    Esqueceu sua senha?
  </button>
    {isOpen && (
<div className="fixed inset-0 flex items-center justify-center bg-opacity-60  backdrop-blur-sm z-50">
  <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
    <h2 className="text-2xl font-bold text-white mb-4">Esqueceu sua senha?</h2>
    <p className="text-gray-300 mb-6">
      Digite seu endereço de email e enviaremos um link para redefinir sua senha.
    </p>

    <input
      type="email"
      placeholder="Email"
      className="w-full mb-6 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    <div className="flex justify-between">
      <button
        onClick={() => setIsOpen(false)}
        className="px-6 py-2 border border-green-500 text-green-500 bg-gray-900 rounded-lg hover:bg-green-500 hover:border-green-500 hover:text-white transition"
      >
        Cancelar
      </button>
      <button
        onClick={() => setIsOpen(false)}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-white hover:text-green-500 hover:border hover:border-green-500 transition"
      >
        Enviar
      </button>
    </div>
  </div>
</div>

    )}

  </div>

</main>

    </div>
  );
}