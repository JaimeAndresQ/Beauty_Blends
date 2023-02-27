import  express  from 'express'
import * as citasServices from '../services/citasServices'
// import { getAreasTratamiento } from '../services/citas.controllers'
import { getCitas } from '../controllers/citas.controllers'

const router = express.Router()

// router.get('/', (req, res) => {
//     getAreasTratamiento(req, res)
// })

router.get('/:id', (req, res) => {
    const cita = citasServices.findCitasById(+req.params.id)
    return(cita != null)
        ? res.send(cita)
        :res.send(404)
})


router.post('/', (_req, res) => {
    res.send('Guardando una cita!!')
})

router.get('/', getCitas)

export default router