import { DataTypes } from 'sequelize'
import sequelize from '../db/connection'
import { medico } from './user'

export const citas = sequelize.define('Cita',
    {
        id_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cita_fecha : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        cita_hora_inicio : {
            type: DataTypes.TIME,
            allowNull: false
        },
        cita_hora_fin: {
            type: DataTypes.TIME,
            allowNull: false
        },
        cita_estado: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        fk_id_medico: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fk_id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
        
    }, {
        tableName: 'cita',
        timestamps: false
    }
)

//Definir la relacion entre los modelos(paciente)
medico.hasOne(citas, {foreignKey: 'fk_id_medico', sourceKey: 'id_medico'} )
citas.belongsTo(medico, {foreignKey: 'fk_id_medico', targetKey: 'id_medico' })
