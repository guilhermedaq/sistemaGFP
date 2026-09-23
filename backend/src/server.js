import express from 'express'
import router  from './routes/routeAuth.js';
import categoria_route from './routes/routeCategorias.js'


const app = express();
app.use(express.json());

app.use('/auth', router);
app.use('/categorias', categoria_route);


app.listen('3000', ()=>{
    console.log('servidor rodando !!!!!!!!!!!!')
});
