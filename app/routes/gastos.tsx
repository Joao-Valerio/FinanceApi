import Gastos from "../components/gastos/gastos";

export function meta() {
  return [
    { title: "Gastos - Finance Api" },
    { name: "description", content: "Gastos - Finance Api" },
  ];
}

export default function GastosRoute() {
  return <Gastos />;
}