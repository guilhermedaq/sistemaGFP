import pool from '../config/db.js'


export const criarUsuarioService = async (nome, email, senhaHash)=>{
    const resultado = await pool.query('INSERT INTO usuarios (nome, email, senhahash) VALUES($1, $2, $3) RETURNING *', [nome, email, senhaHash]);
    return resultado.rows[0]
};

export const buscarUsuario = async (email)=>{
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email=$1', [email]);
    return resultado.rows[0];
};
