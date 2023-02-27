export interface citasEntry {
          id: number,
          cita_fecha: string,
          cita_hora_inicio: string,
          cita_hora_fin: string,
          fk_id_paciente: number,
          fk_id_medico: number
} 

export interface userModel {
  usu_contrasenia?: number | null
}
