import { Request, Response } from 'express'
import { citas } from '../models/citas'

export const getCitas = async (_req: Request, res: Response) => {

    const listCitas = await citas.findAll()

    res.json({
        listCitas
    })
}