# FinanceApp

Aplicacao full stack para gestao financeira pessoal, com painel de saldo, controle de transacoes, metas, categorias e relatorios por periodo.

## Visao Geral

O projeto e dividido em:

- **Frontend:** interface web com React Router, Vite e Tailwind CSS.
- **Backend:** API REST com Express, Prisma e PostgreSQL.
- **Autenticacao:** login com JWT para proteger rotas privadas.

## Tecnologias Utilizadas

### Frontend

- React 18 + React Router 7
- TypeScript
- Vite
- Tailwind CSS
- Recharts (graficos)
- Radix UI

### Backend

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod (validacao)
- JWT + bcrypt (autenticacao e seguranca)

## Pre-requisitos

Antes de iniciar, tenha instalado:

- Node.js 20 ou superior
- npm 9 ou superior
- Docker Desktop (recomendado para banco local)
- Git

## Instalacao e Uso (Passo a Passo)

### 1) Clonar o repositorio

```bash
git clone <url-do-repositorio>
cd FinanceApp
```

### 2) Instalar dependencias do frontend

```bash
npm install
```

### 3) Configurar e iniciar o backend

```bash
cd server
npm install
docker compose up -d
copy .env.example .env
npm run prisma:migrate
npm run db:seed
npm run dev
```

A API sera iniciada em `http://localhost:3333`.

### 4) Iniciar o frontend

Em outro terminal, na raiz do projeto:

```bash
npm run dev
```

Aplicacao web disponivel em `http://localhost:5173`.

## Variaveis de Ambiente

### Frontend (`.env.local`)

```env
VITE_API_URL=http://localhost:3333/api
```

### Backend (`server/.env`)

Use o `server/.env.example` como base. Campos principais:

- `PORT`
- `FRONTEND_URL`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

## Exemplos de Funcionamento (Imagens/GIFs)

Adicione capturas na pasta `docs/images/` e atualize os caminhos abaixo:

![Tela de Dashboard](docs/images/dashboard.png)
![Fluxo de cadastro e login](docs/images/auth-flow.gif)
![Relatorios de gastos](docs/images/relatorios.gif)

## Scripts Uteis

### Frontend (raiz)

- `npm run dev` - inicia ambiente de desenvolvimento
- `npm run build` - gera build de producao
- `npm run start` - executa build de producao
- `npm run typecheck` - valida tipos TypeScript

### Backend (`server`)

- `npm run dev` - inicia API com hot reload
- `npm run build` - compila TypeScript
- `npm run start` - executa API compilada
- `npm run prisma:migrate` - cria/aplica migrations
- `npm run prisma:studio` - abre Prisma Studio
- `npm run db:seed` - popula dados iniciais

## Contato

Para duvidas, sugestoes ou contribuicoes:

- Abra uma issue neste repositorio
- Envie um pull request com melhorias

## Licenca

Este projeto ainda nao possui uma licenca definida. Recomenda-se adicionar um arquivo `LICENSE` (ex.: MIT) para uso em producao ou contribuicoes abertas.
