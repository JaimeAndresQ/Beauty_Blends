import  express  from 'express'
import { getCitas, registrarDisponibilidadCitas } from '../controllers/citas.controllers'
import validateToken from './validate-token'

const router = express.Router()

router.get('/:especialidad',validateToken, getCitas)
router.post('/CreateCita', validateToken, registrarDisponibilidadCitas)

export default router