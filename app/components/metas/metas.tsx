import { AppLayout } from "../layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

export type Meta = {
  id: number;
  titulo: string;
  objetivo: number;
  atual: number;
  prazo: string;
};

const metasMock: Meta[] = [
  {
    id: 1,
    titulo: "Reserva de emergência",
    objetivo: 5000,
    atual: 3250,
    prazo: "Dez/2025",
  },
  {
    id: 2,
    titulo: "Quitar cartão de crédito",
    objetivo: 2000,
    atual: 800,
    prazo: "Mar/2025",
  },
  {
    id: 3,
    titulo: "Viagem de férias",
    objetivo: 4000,
    atual: 1200,
    prazo: "Jul/2025",
  },
];

const calcProgresso = (meta: Meta) =>
  Math.min(100, Math.round((meta.atual / meta.objetivo) * 100));

const Metas = () => {
  return (
    <AppLayout>
      <main className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-3">
          <h1 className="text-2xl sm:text-3xl font-bold">Metas financeiras</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Crie e acompanhe metas como reserva de emergência, viagem ou
            quitação de dívidas.
          </p>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Metas ativas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {metasMock.map((meta) => {
              const progresso = calcProgresso(meta);
              return (
                <Card
                  key={meta.id}
                  className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                >
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">
                      {meta.titulo}
                    </CardTitle>
                    <CardDescription>Prazo: {meta.prazo}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      Guardado:{" "}
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        R$ {meta.atual.toFixed(2)}
                      </span>{" "}
                      de R$ {meta.objetivo.toFixed(2)}
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-green-600 transition-all"
                        style={{ width: `${progresso}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Progresso: {progresso}%
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Criar nova meta</h2>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Nome da meta (ex: Reserva de emergência)"
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Valor objetivo (R$)"
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="month"
              aria-label="Prazo da meta"
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl font-semibold transition"
            >
              Salvar meta
            </button>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Em versões futuras, a IA vai analisar se essa meta é realista com
              base no seu histórico de gastos.
            </p>
          </form>
        </section>
      </main>
    </AppLayout>
  );
};

export default Metas;
