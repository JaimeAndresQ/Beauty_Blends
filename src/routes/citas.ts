import  express  from 'express'
import { actualizarEstadoCita, agendarCita, consultarCitasAsignadas, consultarCitasAsignadasAdministrador, getHorarioCitasDisponibles, registrarDisponibilidadCitas } from '../controllers/citas.controllers'
import validateToken from './validate-token'

const router = express.Router()

router.get('/:especialidad',validateToken, getHorarioCitasDisponibles)
router.post('/CreateCita', validateToken, registrarDisponibilidadCitas)
router.put('/asignarCita/:id_cita',validateToken, agendarCita)
router.get('/citasAsignadas/:id_correo',validateToken,consultarCitasAsignadas)
router.get('/Administador/citasProgramadas', validateToken, consultarCitasAsignadasAdministrador)
router.put('/UpdateStatus/:id_cita',validateToken, actualizarEstadoCita)

export default router