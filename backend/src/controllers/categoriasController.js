import buscarCategoriasService from "../services/categoriasService.js";


export const buscarCategoriasController = async (req, res)=>{
    try{
        const resultado = await buscarCategoriasService()
        return res.status(200).json({message: 'Categorias acessadas com sucesso.', categorias: resultado})
    } catch(err){
        return res.status(500).json({message: `Erro: ${err}`})
    }
};