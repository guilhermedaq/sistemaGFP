import express from 'express'
import router  from './routes/routeAuth.js';
import categoria_route from './routes/routeCategorias.js';
import gastos_route from './routes/routeGastos.js';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', router);
app.use('/categorias', categoria_route);
app.use('/gastos', gastos_route);


app.listen('3000', ()=>{
    console.log('servidor rodando !!!!!!!!!!!!')
});
