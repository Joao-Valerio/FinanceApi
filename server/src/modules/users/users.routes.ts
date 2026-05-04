import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import * as controller from "./users.controller";

export const usersRoutes = Router();

usersRoutes.use(authMiddleware);

usersRoutes.get("/me/estatisticas", controller.obterEstatisticasPerfil);
usersRoutes.put("/me", controller.atualizarPerfil);
usersRoutes.put("/me/senha", controller.alterarSenha);
