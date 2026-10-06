import orcamentoService from '../services/orcamentoService.js';

class OrcamentoController {
  async buscarPorMes(req, res) {
    try {
      const { mes } = req.query;

      if (!mes) {
        return res.status(400).json({ erro: 'O parâmetro mês é obrigatório.' });
      }

      const valores = await orcamentoService.buscarPorMes(mes);
      return res.status(200).json(valores);
    } catch (error) {
      console.error('Erro no OrcamentoController.buscarPorMes:', error);
      return res.status(500).json({ erro: 'Erro interno ao buscar dados do mês.' });
    }
  }

  async salvarMes(req, res) {
    try {
      const { mes, valores } = req.body;

      if (!mes || !valores) {
        return res.status(400).json({ erro: 'Mês e valores são obrigatórios.' });
      }

      await orcamentoService.salvarMes(mes, valores);
      return res.status(200).json({ mensagem: 'Mês salvo com sucesso!' });
    } catch (error) {
      console.error('Erro no OrcamentoController.salvarMes:', error);
      return res.status(500).json({ erro: 'Erro interno ao salvar mês.' });
    }
  }
}

export default new OrcamentoController();