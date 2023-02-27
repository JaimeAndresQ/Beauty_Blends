import { Request,Response } from 'express'
import * as citasServices from '../services/citasServices'

export const getAreasTratamiento = async (_req: Request, res: Response) => {
    try {
        const area = await citasServices.getAreas()
        res.status(200).json({
            area
        })
    } catch (error) {
        console.error('[Users.controller][getUserById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error)
        res.status(500).json({
            message: 'There was an error when fetching User'
        })
    }}