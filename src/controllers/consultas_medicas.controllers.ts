import { Request, Response } from 'express'
import { historia_medica, notas_consulta } from '../models/consultas_medicas'
import { paciente, usuario } from '../models/user'

//Agregar historia clinica
export const agregarHistoriaMedica = async(req: Request, res:Response) => {
    
  //Primeramente recibimos los parametros para la creacion de la historia clinica
  const {alergias, enfermades, lesiones, cirugias, fk_id_paciente} = req.body
  //Buscar si existe historia medica ya creada al usuario correspondiiente    
  const historiaMedicaExistente = await historia_medica.findByPk(fk_id_paciente)
  
  //Validar la existencia de la historia medica
  if(!historiaMedicaExistente){
      
  try{
      const historiaMedica = await historia_medica.create({
          id_historia_medica: fk_id_paciente,
          hist_alergias: alergias,
          hist_enfermedades_cronicas: enfermades,
          hist_lesiones_previas: lesiones,
          hist_cirugias_previas: cirugias,
          fk_id_paciente: fk_id_paciente
      })
      res.status(200).json(
          historiaMedica
      )
  
  }catch(error){
      res.status(500).json({
          msg: 'Upps! Ha ocurrido un error al momento de crear la cita',
          error
      })
  }
  }else{
      res.status(400).json({
          msg: `Ya existe una historia medica creada para el usuario identificado con id: ${fk_id_paciente}`
      })
  }   
}

//Consular historia medica del paciente
export const getInfoHistoriaMedica = async (req: Request, res: Response) => {
  //Recibir el id de la historia medica a consultar, en este caso el id del paciente
  const id_paciente = +req.params.id_paciente

  //Consulta de la historia medica
  const historiaMedicaExistente = await historia_medica.findByPk(id_paciente)

  //Valida que exista una historia medica asociada a ese usuario
  if(historiaMedicaExistente){
      res.status(200).json(
          historiaMedicaExistente
      )
      //En caso de que no se encuentre una historia medica con el id del paciente
  }else{
      res.status(404).json({
          msg: `No existe una historia medica para el paciente identificado con id: ${id_paciente}`
      })
  }
}

//Actualizar historia medica
export const updateHistoriaMedica = async (req: Request, res: Response) => {
  //Recibir el id de la historia medica a consultar, en este caso el id del paciente
  const id_paciente = +req.params.id_paciente
//Primeramente recibimos los parametros para la creacion de la historia clinica
const {alergias, enfermades, lesiones, cirugias} = req.body
//Buscar si existe historia medica ya creada al usuario correspondiiente    
const historiaMedicaExistente = await historia_medica.findByPk(id_paciente)

//Validar la existencia de la historia medica
if(historiaMedicaExistente){
  try{
      //Realizar la consulta de actualizacion de la historia medica
     await historia_medica.update({
          hist_alergias: alergias,
          hist_enfermedades_cronicas: enfermades,
          hist_lesiones_previas: lesiones,
          hist_cirugias_previas: cirugias,
      }, {where: {id_historia_medica: id_paciente}})
      //Consulta realizada exitosamente
      res.status(200).json({
          msg: `Historia medica del paciente ${id_paciente} actualizada con exito`
  })
  //En caso de no realizarse la consulta exitosamente devolver error 500
  }catch(error){
      res.status(500).json({
          msg: 'Upps! Ha ocurrido un error al momento de actualizar la historia medica',
          error
      })
  }}

else{
  //En caso de que la historia medica no exista para el id ingresado
  res.status(404).json({
      msg: `No se ha encontrado una historia medica correspondiente al id de usuario: ${id_paciente}`
  })
}}

//Crear notas de consulta
export const createNotasConsulta = async(req: Request, res:Response) => {
  //Recibimos los parametros para la creacion de las notas de consulta
  const {sintomas_consulta, evaluacion_fisica, plan_tratamiento, fecha, fk_id_medico, fk_id_historia_medica} = req.body

  //Intentamos realizar la consulta para crear las notas de consulta
  try{
    const nota_consulta = await notas_consulta.create({
      not_sintomas_consulta: sintomas_consulta,
      not_evaluacion_física: evaluacion_fisica,
      not_plan_tratamiento: plan_tratamiento,
      not_fecha: fecha,
      fk_id_medico: fk_id_medico,
      fk_id_historia_medica: fk_id_historia_medica
    }) 
      res.status(200).json({
        msg: 'Nota de consulta creada exitosamente',
        nota_consulta
      })
      //En caso de que no se haya podido realizar la consulta, se devuleve un error 500 con informacion
  }catch(error){
      res.status(500).json({
          msg: 'Upps! Ha ocurrido un error al momento de crear la nota de consulta',
          error
      })
  }}


//Metodo para consultar las notas de consulta asociadas a un usuario en espefico
export const getNotasConsultasById = async(req: Request, res: Response) => {
   //Recibimos como parametro el correo del usuario
   const id_correo = req.params.id_correo
   const user = await usuario.findByPk(id_correo)
   const rolUser = user?.getDataValue('usu_rol')

   try{

      //Buscamos el paciente asociado al usuario para consultar las notas asociadas
      const userPaciente  = await paciente.findOne({ where: { fk_id_usuario_correo: id_correo}})
      const id_paciente = userPaciente?.getDataValue('id_paciente')
      console.log(id_correo)
      console.log(id_paciente)

      if(user && rolUser == 'P'){
       //En caso de encontrar el usuario, consultamos las nostas de consulta que tiene asociado
       const notas_consulta_usuario = await notas_consulta.findAll({where: {fk_id_historia_medica: id_paciente}})
       res.status(200).json(notas_consulta_usuario)
}else{
  res.status(404).json({
    msg: `No se han encontrado notas de consulta asociadas a la historia clinica del paciente: ${id_correo}`
  })
}
}
//En caso de que la consulta no se realice exitosamente
catch(error){
  res.status(500).json({
      msg: 'Upps! Ha ocurrido un error al momento de actualizar la historia medica',
      error
  })
}}

