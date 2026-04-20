import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import * as controller from "./relatorios.controller";

export const relatoriosRoutes = Router();

relatoriosRoutes.use(authMiddleware);

relatoriosRoutes.get("/saldo", controller.saldo);
relatoriosRoutes.get("/fluxo", controller.fluxo);
relatoriosRoutes.get("/gastos-periodo", controller.gastosPeriodo);
relatoriosRoutes.get("/gastos-por-categoria", controller.gastosPorCategoria);
