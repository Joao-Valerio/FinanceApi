import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import * as controller from "./transacoes.controller";

export const transacoesRoutes = Router();

transacoesRoutes.use(authMiddleware);

transacoesRoutes.get("/", controller.listar);
transacoesRoutes.get("/:id", controller.buscarPorId);
transacoesRoutes.post("/", controller.criar);
transacoesRoutes.put("/:id", controller.atualizar);
transacoesRoutes.delete("/:id", controller.remover);
