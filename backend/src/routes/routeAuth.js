import { criarUsuarioController, loginUsuarioController } from "../controllers/controllerAuth.js";
import { Router } from "express";

const router = Router();

router.post('/cadastro', criarUsuarioController);
router.post('/login',  loginUsuarioController)

export default router

