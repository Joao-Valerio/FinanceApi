import Relatorios from "../components/relatorios/relatorios";

export function meta() {
  return [
    { title: "Relatorios - Finance Api" },
    { name: "description", content: "Relatórios - Finance Api" },
  ];
}

export default function RelatoriosRoute() {
  return <Relatorios />;
}