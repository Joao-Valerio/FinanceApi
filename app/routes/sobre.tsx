import Sobre from "../Components/sobre/sobre";

export function meta() {
  return [
    { title: "Sobre - Finance Api" },
    { name: "description", content: "Página sobre do Finance Api" },
  ];
}

export default function SobreRoute() {
  return <Sobre />;
}
