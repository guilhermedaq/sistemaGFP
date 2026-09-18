import express from 'express'
import { router } from './routes/routeAuth.js';


const app = express();
app.use(express.json());

app.use('/auth', router)


app.listen('3000', ()=>{
    console.log('servidor rodando !!!!!!!!!!!!')
})
