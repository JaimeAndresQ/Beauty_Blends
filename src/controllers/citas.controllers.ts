import { Request, Response } from 'express'
import { citas } from '../models/citas'
import { Op } from 'sequelize'
import { area_tratamiento, medico, paciente } from '../models/user'

//Estado de las citas
//Disponible: 1
//No Disponible: 0

export const getHorarioCitasDisponibles = async (req: Request, res: Response) => {

    //A partir de la especialidad que requiera un paciente para asignar su cita.
    //Se trae la información de las citas disponibles asociadas a respectivos medicos
    const { especialidad } = req.params

    //Consulta que trae todas las citas que se encuentran disponibles con respecto a un área de tratamiento
    
    /*
    SELECT  cita_fecha, cita_hora_inicio, cita_hora_fin, me_nombres, me_apellido_materno, me_apellido_paterno 
    FROM cita 
    JOIN medico ON medico.id_medico = cita.fk_id_medico 
    JOIN area_tratamiento ON medico.fk_tratamiento_id_area_tratamiento = area_tratamiento.id_area_tratamiento
    WHERE nombre_area_tratamiento = 'Fisioterapia';
    */

    const citasEspecialidad = await citas.findAll({
        attributes: ['id_cita','cita_fecha','cita_hora_inicio', 'cita_hora_fin'],
        where: {
            cita_estado: 1
        },
        include: [{ 
            model: medico,
            attributes: ['me_nombres', 'me_apellido_materno', 'me_apellido_paterno'],
            include: [{ 
                model: area_tratamiento,
                attributes: ['nombre_area_tratamiento'],
                where: {
                    nombre_area_tratamiento: especialidad, 
                }
            }], required: true
        }]
    })

    //Si se encontraron registros en la base de datos: Mostrarlos, en caso contrario, enviar un mensaje de error
    if(citasEspecialidad.length > 0){
        res.status(200).json({
            citasEspecialidad
        })
    }else{
        res.status(404).json({
            msg: `No hay citas disponibles para el área de tratamiento: ${especialidad}`
        })
    }
}


export const registrarDisponibilidadCitas = async (req: Request, res: Response) => {

    //Primeramente recibo las datos para registrar el horario de la cita correspondiente
    const {cita_fecha, cita_hora_inicio, cita_hora_fin, fk_id_medico } = req.body

    //Verifico si existe conflicto en los horarios de las citas
    //Teniendo en cuenta el médico asociado (En caso de conflicto, no proceder con la consulta)
    const disponibilidadHorario = await citas.findAll({where: {cita_fecha: cita_fecha, fk_id_medico: fk_id_medico, [Op.or]:[{ cita_hora_inicio:{ [Op.between]: [cita_hora_inicio, cita_hora_fin] }}, {cita_hora_fin: { [Op.between]: [cita_hora_inicio, cita_hora_fin]}}]}} )
    
    //En el caso de que la consulta nos devuelva al menos un elemento, significa que existe un horario dentro del intervalo de tiempo ingresado.
    //Se devolverá un mensaje con el error y no se procederá a realizar la consulta
    if(disponibilidadHorario.length > 0){
        res.status(400).json({
            msg: `El horario que quiere agregar correspondiente al médico con id ${fk_id_medico} ya se encuentra ocupado`
        })
    }
    //En caso contrario (la consulta no nos devulve un elemento), significa que no hay conflicto en con los horarios registrados 
    //Se procederá a realizar la consulta
    else{
        //Registrar el horario al médico asociado
        try{
            const cita = await citas.create({
                cita_fecha: cita_fecha,
                cita_hora_inicio: cita_hora_inicio,
                cita_hora_fin: cita_hora_fin,
                cita_estado: 1,
                fk_id_medico: fk_id_medico
            })
            res.status(200).json(
                cita
            )
        
        }catch(error){
            res.status(500).json({
                msg: 'Upps! Ha ocurrido un error al momento de crear la cita',
                error
            })
        }
    }
}

export const agendarCita = async (req: Request, res: Response) => {
    
    //Primeramente recibo el parametro que asociará la cita que será asignada (id_cita)
    const id_cita = +req.params.id_cita
    //También recibo el correo del usuario que quiere agendar la cita
    const {id_correo} = req.body

    //Verifica que la cita se encuentre en la base de datos
    const citaDisponible = await citas.findByPk(id_cita)

    //Buscar el paciente asociado a ese correo
    const usuarioPaciente = await paciente.findOne({where: {fk_id_usuario_correo: id_correo}})
    const id_paciente = usuarioPaciente?.getDataValue('id_paciente')

    try{
        //En caso de que se encuentra la cita en la base de datos
        if(citaDisponible){
            //Se valida que la cita tenga estado 1 (representa disponibilidad)
            if(citaDisponible?.getDataValue('cita_estado') === 1){
                //En caso de que la cita está disponible, se asocia el usuario a esta cita y se le cambia el estado a 0(representa no disponibilidad)
                await citas.update({fk_id_paciente: id_paciente, cita_estado: 0}, {where: {id_cita: id_cita}})
                res.status(200).json({
                    msg: `Cita asignada a: ${id_paciente} con éxito`
                })
            }else{
                //La cita no se encuentra disponible (tiene estado: 0)
                res.status(400).json({
                    msg: `La cita identificada con id: ${id_cita} no se encuentra disponible`
                })
            }}else{
            res.status(404).json({
                msg: `La cita identificada con id: ${id_cita} no existe en la base de datos`
            })
        }}catch(error){
        res.status(500).json(
            error
        )
    }
}

export const consultarCitasAsignadas = async(req:Request, res: Response) => {

    //Primeramente se recibe el parametro correspondiente al correo del usuario (Paciente)
    //El cual quiere consultar sus citas programadas
    const {id_correo} = req.params

    //Se valida que exita un Paciente asociado a ese usuario
    const usuarioPaciente = await paciente.findOne({where: {fk_id_usuario_correo: id_correo}})
    const id_paciente = usuarioPaciente?.getDataValue('id_paciente')

    //Se realiza la consulta, la cual trae todas las citas (con sus respectivos atributos) que tenga el usuario programadas
    const citasAsignadas = await citas.findAll({
        attributes: ['cita_fecha', 'cita_hora_inicio', 'cita_hora_fin'],
        where: {fk_id_paciente: id_paciente},
        include: [{ 
            model: medico,
            attributes: ['me_nombres', 'me_apellido_materno', 'me_apellido_paterno'],
            include: [{ 
                model: area_tratamiento,
                attributes: ['nombre_area_tratamiento'],
            }], required: true
        }]
    })

    //En caso de no encontrar citas
    if(!citasAsignadas){
        res.status(404).json({
            msg: `El paciente con número de intentificación ${id_paciente} no tiene asignadas citas`
        })
    }else{
        //En caso de encontrarlas
        res.status(200).json({
            citasAsignadas
        })
    }
}