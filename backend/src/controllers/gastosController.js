import { gastosService } from "../services/gastosService.js";


export const gastosController = async (req, res)=>{
    try{
        const {ano_mes} = req.params;
        const resultado = await gastosService(ano_mes)
        return res.status(200).json(resultado)
    } catch(err){
        return res.status(500).json({message: `Erro: ${err}`})
    }
};