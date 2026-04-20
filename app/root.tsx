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
import { AuthProvider } from "./lib/auth";

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

// Aplica a classe `dark` ANTES do React hidratar, seguindo a preferência do navegador.
// Assim evitamos "flash" de tema claro antes do escuro (FOUC).
const themeScript = `
  (function () {
    try {
      var root = document.documentElement;
      var mql = window.matchMedia('(prefers-color-scheme: dark)');
      var apply = function (isDark) {
        root.classList.toggle('dark', isDark);
        root.style.colorScheme = isDark ? 'dark' : 'light';
      };
      apply(mql.matches);
      if (mql.addEventListener) {
        mql.addEventListener('change', function (e) { apply(e.matches); });
      } else if (mql.addListener) {
        mql.addListener(function (e) { apply(e.matches); });
      }
    } catch (e) {}
  })();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#030712"
          media="(prefers-color-scheme: dark)"
        />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Ocorreu um erro inesperado!";
  let details = "Tente recarregar a página.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erro";
    details =
      error.status === 404 ? "Página não encontrada" : error.statusText || details;
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
      <body className="bg-white dark:bg-gray-950">
        <div className="p-6 font-sans">
          <h1 className="text-2xl font-bold text-red-600">{message}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{details}</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
