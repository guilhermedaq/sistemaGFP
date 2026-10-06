import { Router } from 'express';
import orcamentoController from '../controllers/orcamentoController.js';

const router = Router();

// GET /orcamento?mes=2026-10 -> Busca lançamentos do mês
router.get('/', orcamentoController.buscarPorMes);

// POST /orcamento -> Salva/Atualiza a planilha do mês
router.post('/', orcamentoController.salvarMes);

export default router;