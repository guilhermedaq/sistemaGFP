import { Router } from 'express'
import  {gastosController}  from '../controllers/gastosController.js'

const router = Router()

router.get('/:ano_mes', gastosController);

export default router