import Dashboard from "../components/dashboard/dashboard";

export function meta() {
  return [
    { title: "Dashboard - Finance Api" },
    { name: "description", content: "Início - Finance Api" },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}