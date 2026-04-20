import Perfil from "../components/perfil/perfil";

export function meta() {
  return [
    { title: "Meu perfil - Finance Api" },
    { name: "description", content: "Gerenciar dados da conta" },
  ];
}

export default function PerfilRoute() {
  return <Perfil />;
}
