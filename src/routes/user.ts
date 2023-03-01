import express from 'express'
import { newUserPaciente, loginUser } from '../controllers/user.controllers'

const router = express.Router()

router.post('/', newUserPaciente)
router.post('/login', loginUser)

export default router