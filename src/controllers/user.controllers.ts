import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { paciente, usuario } from '../models/user'
import jwt from 'jsonwebtoken'


export const newUser = async (req: Request, res: Response) => {
  
    //Primeramente se agregando los datos de la persona
    const {id_paciente, nombres, apellido_paterno ,apellido_materno, telefono, fecha_nacimiento, genero} = req.body

    //Despues de crear el paciente (agregando los datos personales), se procede a crear el usuario para relacionarlo con el correspondiente paciente.
    const { id_correo, contrasenia} = req.body

    //Validamos si el usuario ya existe en la base de datos....
    const usuarioExistente = await usuario.findOne({ where: {id_usuario_correo: id_correo}})
    const pacienteExistente = await paciente.findOne({ where: {id_paciente: id_paciente}})

    // "PENDING": Determinar si es necesario hacer dos validaciones (Para verificar si es correo o identtificacion invalida)
    if(usuarioExistente || pacienteExistente){
        res.status(400).json({
            msg: `Ya existe un usuario con el correo ${id_correo} O numero de identificacion ${id_paciente}`
        })
    }else {
        //Encripta la contrasenia para agregarla en la base de datos
        const hashedPassword = await bcrypt.hash(contrasenia, 10)

        try {

            //Crear el paciente con los datos personales para luego relacionarlo con el usuario que quiera registrar
            await paciente.create({
                id_paciente: id_paciente,
                pa_nombres: nombres,
                pa_apellido_paterno: apellido_paterno,
                pa_apellido_materno: apellido_materno,
                pa_telefono: telefono,
                pa_fecha_nacimiento: fecha_nacimiento,
                pa_genero: genero
            })

            //Crear el usuario en la base de datos con los datos ingresados
            usuario.create({
                id_usuario_correo: id_correo,
                usu_contrasenia: hashedPassword,
                Paciente_id_paciente: id_paciente
            })
            res.json({
                msg: `Usuario ${id_correo} creado exitosamente`,
            })
        }catch(error){
            res.status(400).json({
                msg: 'Ups ocurrio un error',
                error
            })
        }
    }
}

export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
    
    const {id_correo, contrasenia } = req.body

    //Validar estado del usuario (ACTIVO)


    //Validamos si el usuario existe en la base de datos
    const usuarioExistente: any = await usuario.findOne({ where: {id_usuario_correo: id_correo}})
    if(!usuarioExistente){
        return res.status(400).json({
            msg: `No existe un usuario con el correo ${id_correo} en la base de datos`
        })
    }

    //Validamos la contrasenia del usuario
    const contraseniaValida = await bcrypt.compare(contrasenia, usuarioExistente?.usu_contrasenia)
    if(!contraseniaValida){
        return res.status(400).json({
            msg: 'Contrasenia incorrecta'
        })
    }

    //Generamos un JWT Token para proteger las rutas de acceso
    const token = jwt.sign({
        correo: id_correo,
    }, process.env.SECRET_KEY || 'N35kxkHHhCz49eVge6X0C@GckT!@')

    res.json({token})

}