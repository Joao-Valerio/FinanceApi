import { Login } from "../login/login";

export function meta() {
  return [
    { title: "Login - Finance Api" },
    { name: "description", content: "Página de login Finance Api" },
  ];
}

export default function LoginRoute() {
  return <Login />;
}