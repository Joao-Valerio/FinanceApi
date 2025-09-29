import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("", "routes/root.tsx", {}, [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("sobre", "routes/sobre.tsx"),
    route("gastos", "routes/gastos.tsx"),
    route("metas", "routes/metas.tsx"),
    route("relatorios", "routes/relatorios.tsx"),
    route("recursos", "routes/recursos.tsx"),
    route("contato", "routes/contato.tsx"),
  ]),
] satisfies RouteConfig;