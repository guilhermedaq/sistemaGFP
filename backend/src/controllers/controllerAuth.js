import {criarUsuarioService, buscarUsuario} from "../services/authService.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const criarUsuarioController = async(req, res) =>{
    try{
        const {nome, email, senha} = req.body;
        if(await buscarUsuario(email)){
            return res.status(400).json({message: "E-mail já existente"})
        }
        const senhaHash = await bcrypt.hash(senha, 10);
        const resultado = await criarUsuarioService(nome, email, senhaHash);
        res.status(201).json({messagem: "usuario criado com sucesso."})

    } catch(err){
        res.status(400).json({message:`erro: ${err}`})
    }
}

export const loginUsuarioController = async(req, res)=>{
    try{
        const {email, senha} = req.body;
        const usuario = await buscarUsuario(email);
        if(!usuario){
            return res.status(400).json({message:'E-mail ou senha inválidos'})
        };

        const senhaCheck = await bcrypt.compare(senha, usuario.senhaHash);
        if(!senhaCheck){
            return res.status(400).json({message: 'E-mail ou senha inválidos'})
        }   

        // configurar o JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, 
            process.env.JWT, 
            { expiresIn: '1h' });


        return res.status(200).json({message: 'Login realizado com sucesso.', token})
            
    } catch(err){
        return res.status(400).json({message: `Erro: ${err}`})
    }
}