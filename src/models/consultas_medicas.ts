import { DataTypes } from 'sequelize'
import sequelize from '../db/connection'
import { medico } from './user'

export const historia_medica = sequelize.define('historia_medica',
    {
        id_historia_medica: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        hist_alergias : {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        hist_enfermedades_cronicas : {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        hist_lesiones_previas : {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        hist_cirugias_previas: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        fk_id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    }, {
        tableName: 'historia_medica',
        timestamps: false
    }
)

export const notas_consulta = sequelize.define('notas_consulta',
    {
        id_notas_consulta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        not_sintomas_consulta : {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        not_evaluacion_física : {
            type: DataTypes.STRING(55),
            allowNull: false
        },
        not_plan_tratamiento : {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        not_fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fk_id_medico: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fk_id_historia_medica: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    }, {
        tableName: 'notas_consulta',
        timestamps: false
    }
)

//Definir relaciones entre modelos
medico.hasMany(notas_consulta, {foreignKey: 'fk_id_medico', sourceKey: 'id_medico'} )
notas_consulta.belongsTo(medico, {foreignKey: 'fk_id_medico', targetKey: 'id_medico' })

historia_medica.hasMany(notas_consulta, {foreignKey: 'fk_id_historia_medica', sourceKey: 'id_historia_medica'} )
notas_consulta.belongsTo(historia_medica, {foreignKey: 'fk_id_historia_medica', targetKey: 'id_historia_medica' })
