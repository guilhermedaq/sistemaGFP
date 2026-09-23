import pool from "../config/db.js";

export const gastosService = async (ano_mes)=>{
    const resultado = await pool.query(`
  SELECT 
    COALESCE(SUM(g.valor_acumulado) FILTER (WHERE c.tipo = 'receita'), 0) AS total_receita,
    COALESCE(SUM(g.valor_acumulado) FILTER (WHERE c.tipo = 'despesa'), 0) AS total_despesa,
    (
      COALESCE(SUM(g.valor_acumulado) FILTER (WHERE c.tipo = 'receita'), 0) - 
      COALESCE(SUM(g.valor_acumulado) FILTER (WHERE c.tipo = 'despesa'), 0)
    ) AS saldo_geral
  FROM gastos_por_categoria g
  JOIN categorias c ON g.id_categoria = c.id
  WHERE g.ano_mes = $1;
`, [ano_mes]);

    return resultado.rows[0]
}