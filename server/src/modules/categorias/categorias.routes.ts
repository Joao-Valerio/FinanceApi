import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import * as controller from "./categorias.controller";

export const categoriasRoutes = Router();

categoriasRoutes.use(authMiddleware);

categoriasRoutes.get("/", controller.listar);
categoriasRoutes.post("/", controller.criar);
categoriasRoutes.put("/:id", controller.atualizar);
categoriasRoutes.delete("/:id", controller.remover);
