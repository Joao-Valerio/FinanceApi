import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import * as controller from "./metas.controller";

export const metasRoutes = Router();

metasRoutes.use(authMiddleware);

metasRoutes.get("/", controller.listar);
metasRoutes.get("/:id", controller.buscarPorId);
metasRoutes.post("/", controller.criar);
metasRoutes.put("/:id", controller.atualizar);
metasRoutes.patch("/:id/depositar", controller.depositar);
metasRoutes.delete("/:id", controller.remover);
