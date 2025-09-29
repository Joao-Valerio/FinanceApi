import Metas from "../components/metas/metas";

export function meta() {
  return [
    { title: "Metas - Finance Api" },
    { name: "description", content: "Metas - Finance Api" },
  ];
}

export default function MetasRoute() {
  return <Metas />;
}