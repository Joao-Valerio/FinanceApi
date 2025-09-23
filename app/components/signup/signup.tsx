import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  function handleSignUp() {
    console.log("Cadastro realizado!");
    navigate("/dashboard");
  }
  return (
<<<<<<< HEAD:FinanceApi/app/components/signup/signup.tsx
    <div>
=======
    <div className="min-h-screen dark:bg-gray-900">
>>>>>>> bf5597c5a60cb934a637808e5c30cbd5212414f7:app/components/signup/signup.tsx
      <div className="flex flex-row justify-between items-center px-8 py-6 ">
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

<main className="p-8 dark:bg-gray-900">
  <h1 className="text-5xl font-bold text-center dark:text-white">Sing Up</h1>

<<<<<<< HEAD:FinanceApi/app/components/signup/signup.tsx
<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-4">
  <input
    type="string"
    placeholder="Nome"
    className="w-full mb-4 px-4 py-3 rounded-md dark:bg-gray-700 dark:text-white bg-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
=======
<div className="dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-4 ">
  <input
    type="string"
    placeholder="Nome"
    className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
>>>>>>> bf5597c5a60cb934a637808e5c30cbd5212414f7:app/components/signup/signup.tsx
  />

  <input
    type="email"
    placeholder="Email"
<<<<<<< HEAD:FinanceApi/app/components/signup/signup.tsx
    className="w-full mb-4 px-4 py-3 rounded-md dark:bg-gray-700 bg-gray-300 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
=======
    className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
>>>>>>> bf5597c5a60cb934a637808e5c30cbd5212414f7:app/components/signup/signup.tsx
  />

    <input
    type="password"
    placeholder="Senha"
<<<<<<< HEAD:FinanceApi/app/components/signup/signup.tsx
    className="w-full mb-6 px-4 py-3 rounded-md dark:bg-gray-700 bg-gray-300 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
  <Link to="/dashboard">
    <button onClick={handleSignUp} className="w-full bg-green-500 border-green-500 text-white font-semibold py-3 rounded-md duration-300 hover:bg-white hover:text-green-600   transition">
      Entrar
    </button>
  </Link>
  <Link to="/login" className="block text-center text-sm text-gray-400 hover:text-gray-500 dark:hover:text-white mt-4">
=======
    className="w-full mb-6 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  <button onClick={handleSignUp} className="w-full bg-green-500 border-green-500 text-white font-semibold py-3 rounded-md duration-300 hover:bg-white hover:text-green-600   transition">
    Entrar
  </button>

  <Link to="/login" className="block text-center text-sm text-black hover:text-gray-500 mt-4 dark:text-gray-400 dark:hover:text-white">
>>>>>>> bf5597c5a60cb934a637808e5c30cbd5212414f7:app/components/signup/signup.tsx
    Já tem uma conta?Login
  </Link>
</div>


</main>

    </div>
  );
}

export default SignUp