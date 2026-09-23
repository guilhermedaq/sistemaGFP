import {Router} from 'express';
import { buscarCategoriasController } from '../controllers/categoriasController.js';

const router = Router();

router.get('/', buscarCategoriasController);

export default router;