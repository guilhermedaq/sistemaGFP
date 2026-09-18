import { criarUsuarioController, loginUsuarioController } from "../controllers/controllerAuth.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";
import { Router } from "express";

const router = Router();

router.post('/cadastro', autenticarToken, criarUsuarioController);
router.post('/login', autenticarToken, loginUsuarioController)

export default router

