import { DataTypes } from 'sequelize'
import sequelize from '../db/connection'

export const citas = sequelize.define('Cita',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(30),
        },
        fecha : {
            type: DataTypes.DATE
        },
        hora_inicio : {
            type: DataTypes.TIME
        },
        hora_fin: {
            type: DataTypes.TIME
        }
    }, {
        tableName: 'Citas_Test',
    }
)