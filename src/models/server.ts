import express,{Application} from 'express'
import cors from 'cors'
import routesCitas from '../routes/citas'
import routesUser from '../routes/user'
import sequelize from '../db/connection'
import { citas } from './citas'
import { paciente, usuario } from './user'
import routesConsultasMedicas from '../routes/consultas_medicas'

class Server {
    private app: Application
    private port: number
    private host: string

    constructor() {
        this.app = express()
        this.port = Number(process.env.SERVER_PORT) || 3001
        this.host = process.env.HOSTNAME || '25.0.53.159'
        this.midlewares()
        this.routes()
        this.dbConnect()
    }

    listen()  {
        this.app.listen(this.port, this.host, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port)
        })
    }

    routes() {
        this.app.use('/api/citas', routesCitas)
        this.app.use('/api/users', routesUser)
        this.app.use('/api/consultasMedicas',routesConsultasMedicas)
    }

    midlewares() {
        this.app.use(express.json())
        this.app.use(cors())
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