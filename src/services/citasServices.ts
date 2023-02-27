import { citasEntry } from '../types'
import citasData from './citas.json'
import {execute} from '../utils/mysql.connection'

// const citas: Array<citasEntry> = citasData as Array<citasEntry>

export const getAreas = async (): Promise<[]> => {
    return await execute<[]>('SELECT * FROM area_tratamiento;', [])
}

export const findCitasById = (id: number): citasEntry | undefined => {
    const entry = citasData.find(citas => citas.id === id)
    return entry
}

export const addEntriesCitas = () => undefined



