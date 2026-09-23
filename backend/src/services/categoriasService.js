    import pool from "../config/db.js";

    const buscarCategoriasService = async ()=>{
        const resultado = await pool.query('SELECT * from categorias ORDER BY nome');
        return resultado.rows;
    };

    export default buscarCategoriasService