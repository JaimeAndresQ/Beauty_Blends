import * as dotenv from 'dotenv'

dotenv.config()

export const DATA_SOURCES = {
    mysqldbSourse: {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        connectionLimit: 100
    }
}