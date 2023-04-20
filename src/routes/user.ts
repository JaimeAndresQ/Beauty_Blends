import express from 'express'
import { newUserPaciente, loginUser, getUserInfoUpdate, updatePassword, updateInfoUser, newUserMedico, newUserEmpleado, solicitarDarDeBajaCuenta, gestionarEstadoUsuario, updateInfoUserMedico, getUserByStatus, getUserMedicoInfoUpdate } from '../controllers/user.controllers'

const router = express.Router()

router.post('/createPaciente/', newUserPaciente)
router.post('/login/', loginUser)
router.get('/userInfo/:id_correo', getUserInfoUpdate)
router.put('/updatePassword/:id_correo', updatePassword)
router.put('/updateInfo/:id_correo', updateInfoUser)
router.post('/createMedico/', newUserMedico)
router.post('/createEmpleado/',newUserEmpleado)
router.put('/solicitarBajaCuenta/:id_correo', solicitarDarDeBajaCuenta)
router.put('/updateStatus/:id_correo', gestionarEstadoUsuario)
router.put('/updateInfoMedico/:id_correo', updateInfoUserMedico)
router.get('/administrador/estadoUsuario/:estado', getUserByStatus)
router.get('/userMedicoInfo/:id_correo', getUserMedicoInfoUpdate)

export default router