import { AppLayout } from "../layout/AppLayout";
import { useEffect, type FormEvent, useState } from "react";
import { useAuth } from "~/lib/auth";
import { api, ApiError } from "../../lib/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

export type Meta = {
  id: string;
  titulo: string;
  objetivo: number;
  atual: number;
  prazo: string;
};

const calcProgresso = (meta: Meta) =>
  Math.min(100, Math.round((meta.atual / meta.objetivo) * 100));


function formatarBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}


const Metas = () => {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { user } = useAuth();
  const [titulo, setTitulo] = useState("");
  const [objetivo, setObjetivo] = useState(0);
  const [prazo, setPrazo] = useState("");
  const [depositos, setDepositos] = useState<Record<string, number>>({});

  async function fetchMetas() {
    try {
      setCarregando(true);

      const data = await api<Meta[]>("/metas");
      setMetas(data);
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    fetchMetas();
  }, [user]);

  async function handleSubmit(e: FormEvent) {
    try {
      await api("/metas", {
        method: "POST",
        body: {
          titulo,
          objetivo,
          prazo,
        },
      });

      fetchMetas();

      setTitulo("");
      setObjetivo(0);
      setPrazo("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDepositar(id: string) {
    const valor = depositos[id];

    if (!valor || valor <= 0) {
      alert("Digite um valor válido");
      return;
    }

    try {
      await api(`/metas/${id}/depositar`, {
        method: "PATCH",
        body: { valor },
      });

      fetchMetas();

      setDepositos((prev) => ({
        ...prev,
        [id]: 0,
      }));
    } catch (err) {
      console.error(err);
    }
  }

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
          {metas.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
              Você ainda não criou nenhuma meta. Use o formulário ao lado para
              começar.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {metas.map((meta) => {
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
                          {formatarBRL(meta.atual)}
                        </span>{" "}
                        de {formatarBRL(meta.objetivo)}
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
                      <div className="mt-3 flex gap-2">
                        <input
                          type="number"
                          placeholder="Valor"
                          value={depositos[meta.id] ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;

                            setDepositos((prev) => ({
                              ...prev,
                              [meta.id]: value === "" ? 0 : Number(value),
                            }));
                          }}
                          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                        />

                        <button
                          onClick={() => handleDepositar(meta.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-lg"
                        >
                          Depositar
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Criar nova meta</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              type="text"
              placeholder="Nome da meta (ex: Reserva de emergência)"
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              value={objetivo}
              onChange={(e) => setObjetivo(Number(e.target.value))}
              type="number"
              min={0}
              step={0.01}
              placeholder="Valor objetivo (R$)"
              className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              value={prazo}
              required
              onChange={(e) => setPrazo(e.target.value)}
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
