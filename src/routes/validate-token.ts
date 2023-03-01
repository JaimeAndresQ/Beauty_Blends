import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']

    if(headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //Tiene token y por lo tanto vamos a verificarlo
        try{
            const bearerToken =   headerToken.slice(7)
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'N35kxkHHhCz49eVge6X0C@GckT!@')
  
            next()
        }catch(error){
            res.status(401).json({
                msg: 'Token no válido'
            })
        }
        
    } else {
        res.status(401).json({ 
            msg: 'Acceso denegado'
        })
    }
}

export default validateToken