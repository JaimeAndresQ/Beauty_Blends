import express, {Request, Response} from 'express'

import citasRouter from './routes/citas'

const app = express()
app.use(express.json())


const PORT = 3000


app.get('/ping', (_req:Request, res:Response) => {
    console.log('Someone pinged here!!')
    res.send('Pong')
})

app.use('/api/citas', citasRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})