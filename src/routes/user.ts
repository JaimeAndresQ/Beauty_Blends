import express from 'express'
import { newUserPaciente, loginUser, getUserInfoUpdate, updatePassword, updateInfoUser, newUserMedico, newUserEmpleado } from '../controllers/user.controllers'

const router = express.Router()

router.post('/createPaciente/', newUserPaciente)
router.post('/login/', loginUser)
router.get('/userInfo/:id_correo', getUserInfoUpdate)
router.put('/updatePassword/:id_correo', updatePassword)
router.put('/updateInfo/:id_correo', updateInfoUser)
router.post('/createMedico/', newUserMedico)
router.post('/createEmpleado/',newUserEmpleado)

export default router