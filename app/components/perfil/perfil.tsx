import { useState } from "react";
import { AppLayout } from "../layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  createdAt: string;
};

function getIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
}

function formatarData(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const Perfil = () => {
  const usuario: Usuario | null = null;

  const totalTransacoes: number | null = null;
  const totalMetas: number | null = null;
  const totalCategorias: number | null = null;

  const [editando, setEditando] = useState(false);
  const [alterandoSenha, setAlterandoSenha] = useState(false);

  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");

  const nomeExibicao = usuario?.nome ?? "Sem nome";
  const emailExibicao = usuario?.email ?? "—";

  return (
    <AppLayout>
      <main className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl sm:text-4xl font-bold border-4 border-green-500 shrink-0">
              {getIniciais(usuario?.nome ?? "")}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">
                {nomeExibicao}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
                {emailExibicao}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Conta criada em {formatarData(usuario?.createdAt ?? null)}
              </p>
            </div>
          </div>
        </section>

        <section className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Transações
              </CardTitle>
              <CardDescription>Total registradas na sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                {totalTransacoes ?? "—"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Metas</CardTitle>
              <CardDescription>Metas criadas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                {totalMetas ?? "—"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Categorias
              </CardTitle>
              <CardDescription>Cadastradas por você</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                {totalCategorias ?? "—"}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-bold">Dados da conta</h2>
            {!editando && (
              <button
                type="button"
                onClick={() => setEditando(true)}
                className="px-4 py-2 text-sm font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                Editar
              </button>
            )}
          </div>

          {editando ? (
            <form className="space-y-3">
              <label className="block">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Nome
                </span>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="mt-1 w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="mt-1 w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </label>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditando(false)}
                  className="px-6 py-2 border-2 border-green-600 text-green-600 bg-transparent rounded-xl hover:bg-green-600 hover:text-white transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
                >
                  Salvar alterações
                </button>
              </div>
            </form>
          ) : (
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-600 dark:text-gray-300">
                  Nome
                </dt>
                <dd className="font-semibold">{nomeExibicao}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 dark:text-gray-300">
                  Email
                </dt>
                <dd className="font-semibold break-all">{emailExibicao}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 dark:text-gray-300">
                  Membro desde
                </dt>
                <dd className="font-semibold">
                  {formatarData(usuario?.createdAt ?? null)}
                </dd>
              </div>
            </dl>
          )}
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">Segurança</h2>
          {alterandoSenha ? (
            <form className="space-y-3">
              <input
                type="password"
                placeholder="Senha atual"
                aria-label="Senha atual"
                className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Nova senha"
                aria-label="Nova senha"
                className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Confirmar nova senha"
                aria-label="Confirmar nova senha"
                className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAlterandoSenha(false)}
                  className="px-6 py-2 border-2 border-green-600 text-green-600 bg-transparent rounded-xl hover:bg-green-600 hover:text-white transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold"
                >
                  Atualizar senha
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Recomendamos trocar sua senha periodicamente para manter sua
                conta segura.
              </p>
              <button
                type="button"
                onClick={() => setAlterandoSenha(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl font-semibold transition"
              >
                Alterar senha
              </button>
            </>
          )}
        </section>

        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-3">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Zona de perigo</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Ao excluir sua conta, todas as suas transações, metas e categorias
            serão permanentemente removidas. Essa ação não pode ser desfeita.
          </p>
          <button
            type="button"
            className="px-6 py-2 text-sm font-semibold text-red-600 border-2 border-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
          >
            Excluir minha conta
          </button>
        </section>
      </main>
    </AppLayout>
  );
};

export default Perfil;
