import jwt from 'jsonwebtoken'


export const autenticarToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(400).json({message: 'Token não enviado/Erro no Token'});
    }

    try{

        const secretKey = process.env.JWT;
        const usuarioDecodificado = jwt.verify(token, secretKey);

        req.usuario = usuarioDecodificado;
        next()
    }   catch (err) {
        
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }

}