import express from 'express'
import { newUser, loginUser } from '../controllers/user.controllers'

const router = express.Router()

router.post('/', newUser)
router.post('/login', loginUser)

export default router