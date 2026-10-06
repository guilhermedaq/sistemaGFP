import pool from '../config/db.js'; // Seu arquivo de conexão do pg com import/export

class OrcamentoService {
  async buscarPorMes(mes) {
    const query = `
      SELECT categoria_id, valor 
      FROM orcamentos_mensais 
      WHERE mes_referencia = $1
    `;
    const result = await pool.query(query, [mes]);

    // Mapeia de [{ categoria_id: 1, valor: "150.00" }] -> { 1: 150.00 }
    const mapaValores = {};
    result.rows.forEach((row) => {
      mapaValores[row.categoria_id] = Number(row.valor);
    });

    return mapaValores;
  }

  async salvarMes(mes, valores) {
    const entries = Object.entries(valores);

    for (const [categoriaId, valor] of entries) {
      if (valor !== '' && valor !== null && valor !== undefined) {
        const query = `
          INSERT INTO orcamentos_mensais (categoria_id, mes_referencia, valor)
          VALUES ($1, $2, $3)
          ON CONFLICT (categoria_id, mes_referencia)
          DO UPDATE SET valor = EXCLUDED.valor
        `;
        await pool.query(query, [categoriaId, mes, valor]);
      }
    }
  }
}

export default new OrcamentoService();