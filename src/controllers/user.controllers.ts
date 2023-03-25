import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { paciente, usuario } from '../models/user'
import jwt from 'jsonwebtoken'


export const newUserPaciente = async (req: Request, res: Response) => {
  
    //Primeramente se agrega los datos de usuario
    const { id_correo, contrasenia} = req.body

    //Luego se agrega la información correspondiente al usuario
    const {id_paciente, nombres, apellido_paterno ,apellido_materno, telefono, fecha_nacimiento, genero } = req.body


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

            //Crear el usuario en la base de datos con los datos ingresados con el rol de paciente (POR DEFAULT)
            usuario.create({
                id_usuario_correo: id_correo,
                usu_contrasenia: hashedPassword,
                usu_rol: 'P',
                usu_estado: 1
            })

            //Crear el paciente con los datos personales para luego relacionarlo con el usuario que quiera registrar
            await paciente.create({
                id_paciente: id_paciente,
                pa_nombres: nombres,
                pa_apellido_paterno: apellido_paterno,
                pa_apellido_materno: apellido_materno,
                pa_telefono: telefono,
                pa_fecha_nacimiento: fecha_nacimiento,
                pa_genero: genero,
                fk_id_usuario_correo: id_correo
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
    const usuarioActivo: any = await usuario.findOne({where: {usu_estado: 1}})

    //Validamos si el usuario existe en la base de datos
    const usuarioExistente: any = await usuario.findOne({ where: {id_usuario_correo: id_correo}})
    if(!usuarioExistente && usuarioActivo){
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
    }, process.env.SECRET_KEY || 'N35kxkHHhCz49eVge6X0C@GckT!@', {expiresIn: '3600000'})

    res.json({token})

}

//Función para traer los datos de un usuario en especifico
export const getUserInfoUpdate = async ( req: Request, res: Response): Promise<void> => {
    
    const {id_correo} = req.params
    const user = await usuario.findByPk(id_correo)
    const userPaciente  = await paciente.findOne({where: { fk_id_usuario_correo:id_correo }})

    try{
        if(!user){
            res.status(404).json({
                msg: `No se encontró un usuario con el correo ${id_correo} en la base de datos`
            })
        }
        else{
            res.status(200).json({
                nombres: userPaciente?.getDataValue('pa_nombres'),
                apellido_materno: userPaciente?.getDataValue('pa_apellido_materno'),
                apellido_paterno: userPaciente?.getDataValue('pa_apellido_paterno'),
                telefono: userPaciente?.getDataValue('pa_telefono'),
                fecha_nacimiento: userPaciente?.getDataValue('pa_fecha_nacimiento'),
                pa_genero: userPaciente?.getDataValue('pa_genero')
            })
            
        }}catch(error) {
        res.status(500).json({ 
            msg: 'Ups ocurrio un error',
            error
        })
    }
}

//Función para ctualizar datos del usuario
export const updateInfoUser = async (req: Request, res: Response):Promise<void> => {
    
    const {nombres,apellido_paterno,apellido_materno, telefono, fecha_nacimiento,pa_genero } = req.body
    const {id_correo} = req.params

    try {
        //Buscar el usuario que quiere actualizar sus datos
        const userPaciente = await paciente.findOne({where: {fk_id_usuario_correo: id_correo}})
        const id_paciente = await userPaciente?.getDataValue('id_paciente')

        if(userPaciente){
            //Existe el usuario que intenta actualizar datos.... 
            //Proceder con la consulta 

            await paciente.update(
                {pa_nombres: nombres, 
                    pa_apellido_paterno:apellido_paterno, 
                    pa_apellido_materno:apellido_materno, 
                    pa_fecha_nacimiento:fecha_nacimiento, 
                    pa_genero: pa_genero,
                    pa_telefono:telefono},
                {where: {id_paciente:id_paciente}})
            res.status(200).json({
                msg: 'El usuario se ha actualizado!'
            })
                    
        }else{
            res.status(404).json({
                msg: `No existe un usuario con el correo ${id_correo}`
            })
        }
    }catch(error) {
        res.status(500).json({ 
            msg: 'Ups ocurrio un error',
            error
        })}
}

//Función para cambiar contraseña
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
    const {contrasenia} = req.body
    const {id_correo} = req.params
    
    try {
        //Buscar el usuario que quiere actualizar su contraseña
        const user = await usuario.findByPk(id_correo)

        //Validar que la contraseña que ingresa es diferente a la anterior
        if(user){
            const contraseniaActual = await usuario.findOne({where: {id_usuario_correo: id_correo}})

            //Validamos la contrasenia del usuario
            const contraseniaValida = await bcrypt.compare(contrasenia, contraseniaActual?.getDataValue('usu_contrasenia'))
            if(!contraseniaValida){
                //Encripta la contrasenia para agregarla en la base de datos
                const hashedPassword = await bcrypt.hash(contrasenia, 10)
                await usuario.update({usu_contrasenia: hashedPassword}, {where: {id_usuario_correo: id_correo}})
                res.status(200).json({
                    msg: 'Contrasenia válida'
                })
            }
            //En caso de que sea la misma contraseña devolver un mensaje (error 400)
            else{
                res.status(400).json({
                    msg: '¡Estas ingresando tu actual contraseña!'
                })
            }
        } else{
        //En caso de no encontrar al usuario (Devolver 404)
            res.status(404).json({
                msg: `No se encontró un usuario con el correo ${id_correo} en la base de datos`
            })
        }}
    catch(error) {
        res.status(500).json({ 
            msg: 'Ups ocurrio un error',
            error
        })}
}
