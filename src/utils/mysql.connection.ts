import {createPool, Pool} from 'mysql'
import { DATA_SOURCES } from '../config/vars.config'

const dataSource = DATA_SOURCES.mysqldbSourse

export let pool: Pool

export const init = () => {
    try{
        pool = createPool({
            connectionLimit: dataSource.connectionLimit,
            host: dataSource.host,
            user: dataSource.username,
            password: dataSource.password,
            database: dataSource.database
        })
        console.debug('MySql Adapter Pool generated succesfully')

    }
    catch(error){
        console.error('MySql Connector Error: ' + error)   
        throw new Error('Failed to initialized Pool')
    }
}

export const execute = <T>(query: string, params: string[] ): Promise<T> => {
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.')
        
        return new Promise<T>((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error) reject(error)
                else resolve(results)
            })
        })
        
    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error)
        throw new Error('failed to execute MySQL query')
    }
}

