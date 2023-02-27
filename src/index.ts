// import express, {Request, Response} from 'express'
// import citasRouter from './routes/citas'
// import * as mysqlConnector from './utils/mysql.connection'
import Server from './models/server'
import dotenv from 'dotenv'

// const app = express()
// app.use(express.json())
// mysqlConnector.init()

// const PORT = 3000


// app.get('/ping', (_req:Request, res:Response) => {
//     console.log('Someone pinged here!!')
//     res.send('Pong')
// })

// app.use('/api/citas', citasRouter)

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })


dotenv.config()
const server = new Server()
server.listen()