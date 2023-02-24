import { citasEntry } from '../types'
import citasData from './citas.json'

const citas: Array<citasEntry> = citasData as Array<citasEntry>

export const getEntriesCitas = () => citas

export const findCitasById = (id: number): citasEntry | undefined => {
    const entry = citasData.find(citas => citas.id === id)
    return entry
}

export const addEntriesCitas = () => undefined



