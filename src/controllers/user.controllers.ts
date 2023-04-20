import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { medico, paciente, usuario } from '../models/user'
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
            res.status(500).json({
                msg: 'Ups ocurrio un error',
                error
            })
        }
    }
}

export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
    
    const {id_correo, contrasenia } = req.body

    //Validar estado del usuario (ACTIVO)
    const usuarioActivo: any = await usuario.findOne({where: {usu_estado: 1, id_usuario_correo: id_correo}})

    //Validamos si el usuario existe en la base de datos
    const usuarioExistente: any = await usuario.findOne({ where: {id_usuario_correo: id_correo}})
    if(!usuarioExistente || !usuarioActivo){
        return res.status(400).json({
            msg: `No existe un usuario con el correo ${id_correo} en la base de datos o no se encuentra activo`
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

    const userInfo = await usuario.findByPk(id_correo)

    res.json({token,
        rol: userInfo?.getDataValue('usu_rol')
    })
    
}

//Función para traer los datos de un usuario en especifico
export const getUserInfoUpdate = async ( req: Request, res: Response): Promise<void> => {
    
    //Recibimos como parametro el correo del usuario que solicita sus datos
    const {id_correo} = req.params
    const user = await usuario.findByPk(id_correo)
    const rolUser = user?.getDataValue('usu_rol')
    

    try{
        if(user && rolUser == 'P'){
            //Buscamos el paciente asociado al usuario para traer todos los datos
            const userPaciente  = await paciente.findOne({where: { fk_id_usuario_correo:id_correo }})
        //En caso de encontrar el usuario, le mostramos los datos
        res.status(200).json({
            correo: id_correo,
            nombres: userPaciente?.getDataValue('pa_nombres'),
            apellido_materno: userPaciente?.getDataValue('pa_apellido_materno'),
            apellido_paterno: userPaciente?.getDataValue('pa_apellido_paterno'),
            telefono: userPaciente?.getDataValue('pa_telefono'),
            fecha_nacimiento: userPaciente?.getDataValue('pa_fecha_nacimiento'),
            pa_genero: userPaciente?.getDataValue('pa_genero'),
            rolUser
        })
        }
        else{
            //En caso de no encontrar un usuario con dicho correo, devolver un error
            res.status(404).json({
                msg: `No se encontró un usuario de tipo paciente con el correo ${id_correo} en la base de datos`
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
            //No exite el usuario que intenta actualizar sus datos
            res.status(404).json({
                msg: `No se encontró un usuario con el correo ${id_correo} en la base de datos`
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
                    msg: 'Contraseña válida'
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

//Definir método para registrar médicos por parte del administrador
export const newUserMedico = async (req: Request, res: Response) => {
    
    //Primeramente se agrega los datos del usuario (médico)
    const { id_correo, contrasenia} = req.body

    //Luego se agrega la información correspondiente al medico
    const {id_medico, me_nombres, me_apellido_paterno ,me_apellido_materno, me_telefono, me_especialidad, fk_id_area_tratamiento } = req.body

    
    //Se valida que el usuario no se encuentre registrado en la base de datos
    const usuarioExistente = await usuario.findOne({ where: {id_usuario_correo: id_correo}})
    const medicoExistente = await medico.findOne({ where: {id_medico: id_medico}})

    
    if(usuarioExistente || medicoExistente){
        res.status(400).json({
            msg: `Ya existe un usuario con el correo ${id_correo} O numero de identificacion ${id_medico}`
        })
    }else {
        //Se encripta la contraseña para guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(contrasenia, 10)

        try {

            //Crear el usuario en la base de datos con los datos ingresados con el rol de medico (POR DEFAULT = M)
            await usuario.create({
                id_usuario_correo: id_correo,
                usu_contrasenia: hashedPassword,
                usu_rol: 'M',
                usu_estado: 1
            })
    
            //Luego se procede con el registro de los datos del medico
            await medico.create({
                id_medico: id_medico,
                me_nombres: me_nombres,
                me_apellido_paterno: me_apellido_paterno,
                me_apellido_materno: me_apellido_materno,
                me_telefono: me_telefono,
                me_especialidad: me_especialidad,
                fk_tratamiento_id_area_tratamiento: fk_id_area_tratamiento,
                fk_id_usuario_correo: id_correo
            })
            res.status(200).json({
                msg: `Usuario ${id_correo} creado exitosamente`,
            })
        }catch(error){
            res.status(500).json({
                msg: 'Ups ocurrio un error',
                error
            })
        }
    }
}

//Definir método para registrar usuarios (empleados) por parte del administrador
export const newUserEmpleado = async (req: Request, res: Response) => {
    
    //Primeramente se agrega los datos del usuario a registrar
    const { id_correo, contrasenia} = req.body

    //Se valida que el usuario no se encuentre registrado en la base de datos
    const usuarioExistente = await usuario.findByPk(id_correo)

    //En caso de que el usuario exista en la base de datos:
    //No realizar la consulta a la base de datos y devolver un mensaje de error.
    if(usuarioExistente){
        res.status(400).json({
            msg: `Ya existe un usuario con el correo ${id_correo} en el sistema`
        })} else {

        //Se encripta la contraseña para guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(contrasenia, 10)

        try {

            //Crear el usuario en la base de datos con los datos ingresados con el rol de empleado (POR DEFAULT = E)
            usuario.create({
                id_usuario_correo: id_correo,
                usu_contrasenia: hashedPassword,
                usu_rol: 'E',
                usu_estado: 1
            })
            res.status(200).json({
                msg: `Usuario ${id_correo} creado exitosamente`
            })

        }catch(error){
            res.status(500).json({
                msg: 'Ups ocurrio un error',
                error
            })
        }}
}

//En este metodo se debe tener en cuenta que el usuario tiene 3 estados:
//Estado activo(1), inactivo(0), pendiente o por procesar (2)
export const solicitarDarDeBajaCuenta = async(req: Request, res: Response) => {
    
    //Recibimos los parametros correspondientes para implementar el metodo
    const {id_correo} = req.params

    //Buscar el usuario que quiere hacer la solicitud
    const user = await usuario.findByPk(id_correo)

    //Validar que la contraseña que ingresa es diferente a la anterior
    if(user){
        //Procede a realizar la consulta, en este caso se actualiza el estado del usuario
        await usuario.update({usu_estado: 2},{where: {id_usuario_correo: id_correo}})
        res.status(200).json({
            msg: `Estado del usuario ${id_correo} actualizado correctamente`
        })
    }else{
        //En caso de no encontrar al usuario (Devolver 404)
            res.status(404).json({
                msg: `No se encontró un usuario con el correo ${id_correo} en la base de datos`
            })}
}

export const getUserByStatus = async(req: Request, res: Response) => {
    
    //Recibimos como parametro el estado del usuario
    const estado = +req.params.estado

    //Realizamos la consulta de los usuarios de acuerdo al estado en la DB
    const usuarios = await usuario.findAll({attributes: ['id_usuario_correo', 'usu_estado'],where: {usu_estado: estado}})

    //Validamos que la peticion devuelva un resultado
    if(usuarios.length > 0){
        res.status(200).json(
            usuarios
        )
    }else{
        //No existen usuario con ese estado
        res.status(404).json({
            msg:  `No existe un usuario con estado ${estado} en la base de datos`
        })
    }
}

//Dar de baja la cuenta de un usuario en especifico
export const gestionarEstadoUsuario = async(req: Request, res: Response) => {
    
    //Recibimos los parametros correspondientes para implementar el metodo
    const {id_correo} = req.params
    const {estado} = req.body

    //Buscar el usuario que quiere hacer la solicitud
    const user = await usuario.findByPk(id_correo)

    //Validar que la contraseña que ingresa es diferente a la anterior
    if(user){
        //Procede a realizar la consulta, en este caso se actualiza el estado del usuario
        await usuario.update({usu_estado: estado},{where: {id_usuario_correo: id_correo}})
        res.status(200).json({
            msg: `Estado del usuario ${id_correo} actualizado correctamente`
        })
    }else{
        //En caso de no encontrar al usuario (Devolver 404)
            res.status(404).json({
                msg: `No se encontró un usuario con el correo ${id_correo} en la base de datos`
            })}
}

//Función para traer los datos de un usuario(medico) en especifico
export const getUserMedicoInfoUpdate = async ( req: Request, res: Response): Promise<void> => {
    
    //Recibimos como parametro el correo del usuario que solicita sus datos
    const {id_correo} = req.params
    const user = await usuario.findByPk(id_correo)
    const userRol = user?.getDataValue("usu_rol")

    try{
        //Validar que el usuario exista y que sea de tipo medico
        if(user && userRol === 'M'){
            //Buscamos el paciente asociado al usuario para traer todos los datos
            const userMedico = await medico.findOne({ where: { fk_id_usuario_correo:id_correo }})
            //En caso de encontrar el usuario, le mostramos los datos
            res.status(200).json({
                correo: id_correo,
                nombres: userMedico?.getDataValue('me_nombres'),
                apellido_paterno: userMedico?.getDataValue('me_apellido_paterno'),
                apellido_materno: userMedico?.getDataValue('me_apellido_materno'),
                telefono: userMedico?.getDataValue('me_telefono'),
                especialidad: userMedico?.getDataValue('me_especialidad'),
                fk_id_area_tratamiento: userMedico?.getDataValue('fk_tratamiento_id_area_tratamiento'),
                userRol
            })
        }
        else{
            //En caso de no encontrar un usuario con dicho correo, devolver un error
            res.status(404).json({
                msg: `No se encontró un usuario de tipo medico con el correo ${id_correo} en la base de datos`
            })
        }}catch(error) {
        res.status(500).json({ 
            msg: 'Ups ocurrio un error',
            error
        })
    }
}

//Función para ctualizar datos del usuario medico
export const updateInfoUserMedico = async (req: Request, res: Response):Promise<void> => {
    
    const {nombres,apellido_paterno,apellido_materno, telefono, especialidad, area_tratamiento } = req.body
    const {id_correo} = req.params

    try {
        //Buscar el usuario que quiere actualizar sus datos
        const userMedico = await medico.findOne({where: {fk_id_usuario_correo: id_correo}})
        const id_medico = await userMedico?.getDataValue('id_medico')

        if(userMedico){
            //Existe el usuario al que se intenta actualizar datos.... 
            //Proceder con la consulta 

            await medico.update(
                {
                    me_nombres: nombres, 
                    me_apellido_paterno:apellido_paterno, 
                    me_apellido_materno:apellido_materno, 
                    me_especialidad:especialidad, 
                    me_telefono:telefono,
                    fk_tratamiento_id_area_tratamiento: area_tratamiento
                },
                {where: {id_medico:id_medico}})
            res.status(200).json({
                msg: 'El usuario se ha actualizado!'
            })
                    
        }else{
            //No exite el usuario que intenta actualizar sus datos
            res.status(404).json({
                msg: `No se encontró un usuario con el correo ${id_correo} en la base de datos`
            })
        }
    }catch(error) {
        res.status(500).json({ 
            msg: 'Ups ocurrio un error',
            error
        })}
}