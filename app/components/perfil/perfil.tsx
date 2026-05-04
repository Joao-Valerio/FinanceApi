import { useEffect, useState, type FormEvent } from "react";
import { AppLayout } from "../layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuth } from "../../lib/auth";
import { api, ApiError } from "../../lib/api";

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

type Stats = {
  totalTransacoes: number;
  totalMetas: number;
  totalCategorias: number;
};

const Perfil = () => {
  const { user, refresh, loading: authCarregando } = useAuth();

  const [stats, setStats] = useState<Stats | null>(null);
  const [carregandoStats, setCarregandoStats] = useState(true);

  const [editando, setEditando] = useState(false);
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const [erroPerfil, setErroPerfil] = useState<string | null>(null);
  const [sucessoPerfil, setSucessoPerfil] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [alterandoSenha, setAlterandoSenha] = useState(false);
  const [salvandoSenha, setSalvandoSenha] = useState(false);
  const [erroSenha, setErroSenha] = useState<string | null>(null);
  const [sucessoSenha, setSucessoSenha] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    if (authCarregando) return;

    if (!user) {
      setStats(null);
      setCarregandoStats(false);
      return;
    }

    let cancelado = false;
    setCarregandoStats(true);
    api<Stats>("/users/me/estatisticas")
      .then((data) => {
        if (!cancelado) setStats(data);
      })
      .catch(() => {
        if (!cancelado) setStats(null);
      })
      .finally(() => {
        if (!cancelado) setCarregandoStats(false);
      });
    return () => {
      cancelado = true;
    };
  }, [user, authCarregando]);

  function abrirEdicao() {
    setNome(user?.nome ?? "");
    setEmail(user?.email ?? "");
    setErroPerfil(null);
    setSucessoPerfil(false);
    setEditando(true);
  }

  function cancelarEdicao() {
    setEditando(false);
    setErroPerfil(null);
  }

  async function handleSalvarPerfil(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErroPerfil(null);
    setSucessoPerfil(false);
    setSalvandoPerfil(true);
    try {
      await api("/users/me", {
        method: "PUT",
        body: { nome, email },
      });
      await refresh();
      setSucessoPerfil(true);
      setEditando(false);
    } catch (err) {
      setErroPerfil(
        err instanceof ApiError ? err.message : "Erro ao salvar alterações."
      );
    } finally {
      setSalvandoPerfil(false);
    }
  }

  function abrirAlterarSenha() {
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setErroSenha(null);
    setSucessoSenha(false);
    setAlterandoSenha(true);
  }

  function cancelarAlterarSenha() {
    setAlterandoSenha(false);
    setErroSenha(null);
  }

  async function handleAlterarSenha(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErroSenha(null);
    setSucessoSenha(false);

    if (novaSenha.length < 6) {
      setErroSenha("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErroSenha("A confirmação não coincide com a nova senha.");
      return;
    }

    setSalvandoSenha(true);
    try {
      await api("/users/me/senha", {
        method: "PUT",
        body: { senhaAtual, novaSenha },
      });
      setSucessoSenha(true);
      setAlterandoSenha(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err) {
      setErroSenha(
        err instanceof ApiError ? err.message : "Erro ao atualizar senha."
      );
    } finally {
      setSalvandoSenha(false);
    }
  }

  const nomeExibicao = user?.nome ?? "Sem nome";
  const emailExibicao = user?.email ?? "—";

  return (
    <AppLayout>
      <main className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Cabeçalho do perfil */}
        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl sm:text-4xl font-bold border-4 border-green-500 shrink-0 select-none">
              {user ? getIniciais(user.nome) : "?"}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">
                {nomeExibicao}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
                {emailExibicao}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Conta criada em {formatarData(user?.createdAt ?? null)}
              </p>
            </div>
          </div>
        </section>

        {/* Cards de estatísticas */}
        <section className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Transações</CardTitle>
              <CardDescription>Total registradas na sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                {carregandoStats ? "..." : (stats?.totalTransacoes ?? "—")}
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
                {carregandoStats ? "..." : (stats?.totalMetas ?? "—")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Categorias</CardTitle>
              <CardDescription>Cadastradas por você</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                {carregandoStats ? "..." : (stats?.totalCategorias ?? "—")}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Dados da conta */}
        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-bold">Dados da conta</h2>
            {!editando && (
              <button
                type="button"
                onClick={abrirEdicao}
                className="px-4 py-2 text-sm font-semibold text-green-600 border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                Editar
              </button>
            )}
          </div>

          {sucessoPerfil && (
            <p className="px-3 py-2 rounded-md text-sm text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300 border border-green-300 dark:border-green-800">
              Perfil atualizado com sucesso!
            </p>
          )}

          {editando ? (
            <form onSubmit={handleSalvarPerfil} className="space-y-3">
              <label className="block">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Nome
                </span>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                  minLength={2}
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
                  required
                  className="mt-1 w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </label>

              {erroPerfil && (
                <p
                  role="alert"
                  className="px-3 py-2 rounded-md text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-800"
                >
                  {erroPerfil}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  disabled={salvandoPerfil}
                  className="px-6 py-2 border-2 border-green-600 text-green-600 bg-transparent rounded-xl hover:bg-green-600 hover:text-white transition font-semibold disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvandoPerfil}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {salvandoPerfil ? "Salvando..." : "Salvar alterações"}
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
                  {formatarData(user?.createdAt ?? null)}
                </dd>
              </div>
            </dl>
          )}
        </section>

        {/* Segurança / Senha */}
        <section className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">Segurança</h2>

          {sucessoSenha && (
            <p className="px-3 py-2 rounded-md text-sm text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300 border border-green-300 dark:border-green-800">
              Senha atualizada com sucesso!
            </p>
          )}

          {alterandoSenha ? (
            <form onSubmit={handleAlterarSenha} className="space-y-3">
              <input
                type="password"
                placeholder="Senha atual"
                aria-label="Senha atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                required
                className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Nova senha (mín. 6 caracteres)"
                aria-label="Nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
                minLength={6}
                className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Confirmar nova senha"
                aria-label="Confirmar nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                className="w-full p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {erroSenha && (
                <p
                  role="alert"
                  className="px-3 py-2 rounded-md text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-800"
                >
                  {erroSenha}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={cancelarAlterarSenha}
                  disabled={salvandoSenha}
                  className="px-6 py-2 border-2 border-green-600 text-green-600 bg-transparent rounded-xl hover:bg-green-600 hover:text-white transition font-semibold disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvandoSenha}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {salvandoSenha ? "Atualizando..." : "Atualizar senha"}
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
                onClick={abrirAlterarSenha}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl font-semibold transition"
              >
                Alterar senha
              </button>
            </>
          )}
        </section>

        {/* Zona de perigo */}
        <section className="bg-gray-100 dark:bg-gray-900 border border-red-200 dark:border-red-900/40 text-gray-900 dark:text-white p-6 rounded-2xl shadow-sm lg:col-span-3">
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-red-600 dark:text-red-400">
            Zona de perigo
          </h2>
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
