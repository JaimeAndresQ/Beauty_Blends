import  express  from 'express'
import { getCitas } from '../controllers/citas.controllers'
import validateToken from './validate-token'

const router = express.Router()

router.post('/', (_req, res) => {
    res.send('Guardando una cita!!')
})

router.get('/',validateToken, getCitas)

export default router