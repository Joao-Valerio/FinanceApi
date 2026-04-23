import { AppLayout } from "../layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

const Recursos = () => {
  return (
    <AppLayout>
      <main className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-3">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Recursos de IA</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Central de ferramentas inteligentes: classificação automática,
            previsões, simulador e assistente em linguagem natural.
          </p>
        </section>

        <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle>Classificação automática de despesas</CardTitle>
            <CardDescription>
              A IA sugere categorias com base na descrição da transação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              type="text"
              placeholder="Ex: Uber, McDonald's, PIX academia..."
              className="w-full px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-xl font-semibold transition"
            >
              Sugerir categoria (IA)
            </button>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              No backend, a descrição pode ser enviada para uma API de IA e
              retornar a categoria mais provável.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
          <CardHeader>
            <CardTitle>Previsão e planejamento</CardTitle>
            <CardDescription>
              Estime saldo futuro e risco financeiro com base no histórico.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              type="number"
              placeholder="Saldo atual (R$)"
              className="w-full px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              aria-label="Horizonte de previsão"
              className="w-full px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Próximos 30 dias</option>
              <option>Próximos 3 meses</option>
              <option>Próximos 12 meses</option>
            </select>
            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-xl font-semibold transition"
            >
              Gerar previsão (IA)
            </button>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Em versões futuras, séries temporais podem prever gastos fixos e
              saldo projetado.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white lg:col-span-1">
          <CardHeader>
            <CardTitle>Assistente financeiro</CardTitle>
            <CardDescription>
              Faça perguntas em linguagem natural sobre seus gastos e metas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              rows={4}
              placeholder="Ex: Quanto gastei com mercado no último mês?"
              className="w-full px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-xl font-semibold transition"
            >
              Perguntar à IA
            </button>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Quando conectado ao banco, o assistente lerá seus dados reais.
            </p>
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
};

export default Recursos;
