import Recursos from "../components/recursos/recursos";

export function meta() {
  return [
    { title: "Recursos - Finance Api" },
    { name: "description", content: "Recursos - Finance Api" },
  ];
}

export default function RecursosRoute() {
  return <Recursos />;
}