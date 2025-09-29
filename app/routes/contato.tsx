import Contato from "../components/contato/contato";

export function meta() {
  return [
    { title: "Contato - Finance Api" },
    { name: "description", content: "Contato - Finance Api" },
  ];
}

export default function ContatoRoute() {
  return <Contato />;
}