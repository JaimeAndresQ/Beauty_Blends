import  express  from 'express'
import { } from '../controllers/citas.controllers'
import validateToken from './validate-token'
import { agregarHistoriaMedica, createNotasConsulta, getInfoHistoriaMedica, getNotasConsultasById, updateHistoriaMedica } from '../controllers/consultas_medicas.controllers'

const router = express.Router()

router.post('/historiaMedica/Create/',validateToken, agregarHistoriaMedica)
router.get('/historiaMedica/consultar/:id_paciente',validateToken, getInfoHistoriaMedica)
router.put('/historiaMedica/actualizar/:id_paciente', validateToken, updateHistoriaMedica) 
router.post('/notasConsulta/Create/',validateToken, createNotasConsulta)
router.get('/notasConsulta/consultarNotas/:id_correo', getNotasConsultasById)
export default router;