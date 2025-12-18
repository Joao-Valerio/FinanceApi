import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import type { LinksFunction } from "react-router";

import stylesheet from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Ocorreu um erro inesperado!";
  let details = "Tente recarregar a página.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erro";
    details = error.status === 404 ? "Página não encontrada" : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <html lang="pt-br">
      <head>
        <title>Erro</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="p-4 font-sans">
          <h1 className="text-2xl font-bold text-red-600">{message}</h1>
          <p className="mt-2 text-gray-600">{details}</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}