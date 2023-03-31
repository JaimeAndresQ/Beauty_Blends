import  express  from 'express'
import { agendarCita, consultarCitasAsignadas, getHorarioCitasDisponibles, registrarDisponibilidadCitas } from '../controllers/citas.controllers'
import validateToken from './validate-token'

const router = express.Router()

router.get('/:especialidad',validateToken, getHorarioCitasDisponibles)
router.post('/CreateCita', validateToken, registrarDisponibilidadCitas)
router.put('/asignarCita/:id_cita',validateToken, agendarCita)
router.get('/citasAsignadas/:id_correo',validateToken,consultarCitasAsignadas)

export default router