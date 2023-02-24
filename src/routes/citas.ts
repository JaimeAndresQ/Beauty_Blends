import  express  from 'express'
import * as citasServices from '../services/citasServices'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(citasServices.getEntriesCitas())
})

router.get('/:id', (req, res) => {
    const cita = citasServices.findCitasById(+req.params.id)
    return(cita != null)
        ? res.send(cita)
        :res.send(404)
})


router.post('/', (_req, res) => {
    res.send('Guardando una cita!!')
})

export default router