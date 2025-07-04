import { Link } from "react-router";

export function Login() {
  return (
    <div className="p-4">
      <h1>Login</h1>
      {/* Botão para voltar à Home */}
      <Link to="/" className="text-blue-500 underline">
        Voltar para a Home
      </Link>
    </div>
  );
}