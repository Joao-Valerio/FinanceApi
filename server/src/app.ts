import "express-async-errors";
import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { transacoesRoutes } from "./modules/transacoes/transacoes.routes";
import { categoriasRoutes } from "./modules/categorias/categorias.routes";
import { metasRoutes } from "./modules/metas/metas.routes";
import { relatoriosRoutes } from "./modules/relatorios/relatorios.routes";

export const app = express();

const allowedOrigins = env.FRONTEND_URL.split(",").map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite chamadas sem origin (ex: Postman, curl, SSR)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origem não permitida — ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/transacoes", transacoesRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/metas", metasRoutes);
app.use("/api/relatorios", relatoriosRoutes);

app.use(errorHandler);
