import  express  from 'express'
import { actualizarEstadoCita, agendarCita, cancelarCitas, consultarCitasAsignadas, consultarCitasAsignadasAdministrador, consultarCitasProximas, getCitasDisponiblesMedico, getHorarioCitasDisponibles, registrarDisponibilidadCitas } from '../controllers/citas.controllers'
import validateToken from './validate-token'

const router = express.Router()

router.get('/:especialidad',validateToken, getHorarioCitasDisponibles)
router.post('/CreateCita', validateToken, registrarDisponibilidadCitas)
router.put('/asignarCita/:id_cita',validateToken, agendarCita)
router.get('/citasAsignadas/:id_correo',validateToken,consultarCitasAsignadas)
router.get('/Administador/citasProgramadas', validateToken, consultarCitasAsignadasAdministrador)
router.put('/UpdateStatus/:id_cita',validateToken, actualizarEstadoCita)
router.get('/medico/citasProgramadas/:id_correo', getCitasDisponiblesMedico)
router.put('/cancelarCita/:id_cita', validateToken, cancelarCitas)
router.get('/citasProximas/:id_correo',validateToken,consultarCitasProximas)

export default router