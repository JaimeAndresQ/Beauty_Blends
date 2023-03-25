import express from 'express'
import { newUserPaciente, loginUser, getUserInfoUpdate, updatePassword, updateInfoUser } from '../controllers/user.controllers'

const router = express.Router()

router.post('/', newUserPaciente)
router.post('/login', loginUser)
router.get('/:id_correo', getUserInfoUpdate)
router.put('/updatePassword/:id_correo', updatePassword)
router.put('/updateInfo/:id_correo', updateInfoUser)

export default router