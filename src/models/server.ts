import express,{Application} from 'express'
import routesCitas from '../routes/citas'
import routesUser from '../routes/user'
import sequelize from '../db/connection'
import { citas } from './citas'
import { paciente, usuario } from './user'

class Server {
    private app: Application
    private port: string

    constructor() {
        this.app = express()
        this.port = process.env.SERVER_PORT || '3001'
        this.midlewares()
        this.routes()
        this.dbConnect()
    }

    listen()  {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port)
        })
    }

    routes() {
        this.app.use('/api/citas', routesCitas)
        this.app.use('/api/users', routesUser)
    }

    midlewares() {
        this.app.use(express.json())
    }

    async dbConnect() {
        try {
            await sequelize.authenticate()
            console.log('Conexion con la DB ha sido establecidad successfully')
            await citas.sync()
            await paciente.sync()
            await usuario.sync()
        } catch(error) {
            console.log('Conexion fallida. No ha sido capaz de conectarse a la DB' + error)
        }
    }
}

export default Server