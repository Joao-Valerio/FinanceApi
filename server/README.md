# FinanceApi — Backend

API REST do FinanceApi feita com **Node.js + Express + Prisma + PostgreSQL + TypeScript**.

## Pré-requisitos

- Node.js 20+
- Docker Desktop (para subir o Postgres localmente) **ou** uma instância Postgres acessível

## 1. Instalar dependências

```bash
cd server
npm install
```

## 2. Subir o Postgres com Docker

```bash
docker compose up -d
```

Isso sobe um container `financeapi-postgres` em `localhost:5432` com usuário/senha/banco iguais a `financeapi`.

## 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Se você subiu o Postgres via `docker compose`, a `DATABASE_URL` do `.env.example` já funciona.
**Troque o `JWT_SECRET` por algo seguro.**

## 4. Rodar migrations e gerar o client do Prisma

```bash
npm run prisma:migrate
```

(Na primeira vez ele pede um nome para a migration — pode usar `init`.)

## 5. (Opcional) Popular com usuário demo

```bash
npm run db:seed
```

Cria um usuário `demo@financeapi.com` com senha `123456` e as categorias padrão.

## 6. Rodar em desenvolvimento

```bash
npm run dev
```

API disponível em `http://localhost:3333`. Teste com:

```bash
curl http://localhost:3333/api/health
```

## Endpoints principais

Todas as rotas (exceto `/auth/signup` e `/auth/login`) precisam do header:

```
Authorization: Bearer <token>
```

### Autenticação — `/api/auth`
- `POST /signup` — `{ nome, email, senha }`
- `POST /login` — `{ email, senha }` → `{ token, user }`
- `GET /me` — retorna o usuário autenticado

### Transações — `/api/transacoes`
- `GET /` — aceita `?tipo=ENTRADA|SAIDA&de=YYYY-MM-DD&ate=YYYY-MM-DD&categoriaId=&limit=`
- `GET /:id`
- `POST /` — `{ descricao, valor, tipo, data, categoriaId? }`
- `PUT /:id`
- `DELETE /:id`

### Categorias — `/api/categorias`
- `GET / POST / PUT /:id / DELETE /:id`

### Metas — `/api/metas`
- `GET / POST / PUT /:id / DELETE /:id`
- `PATCH /:id/depositar` — `{ valor }`

### Relatórios — `/api/relatorios`
- `GET /saldo` → `{ saldoAtual, totalEntradas, totalSaidas }`
- `GET /fluxo?range=7d|30d|90d` → `[{ date, Entradas, Saídas }]`
- `GET /gastos-periodo?range=...` → `[{ date, gastos }]`
- `GET /gastos-por-categoria?range=...` → `[{ categoriaId, nome, cor, total }]`

### Usuário — `/api/users`
- `PUT /me` — atualiza nome/email
- `PUT /me/senha` — `{ senhaAtual, novaSenha }`

## Scripts úteis

- `npm run dev` — inicia com hot reload
- `npm run build` — compila TS para `dist/`
- `npm start` — roda a versão compilada
- `npm run prisma:studio` — abre UI visual do banco
- `npm run prisma:migrate` — cria/aplica migrations

## Próximos passos

1. Plugar o front (`VITE_API_URL=http://localhost:3333/api`) no `signup.tsx` e `login.tsx`.
2. Substituir os dados mockados em `dashboard.tsx`, `gastos.tsx` e `metas.tsx` pelas chamadas aos endpoints de `/transacoes`, `/relatorios` e `/metas`.
3. Criar um wrapper `api()` no front que injeta o `Authorization` automaticamente.
