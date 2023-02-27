import { DataTypes } from 'sequelize'
import sequelize from '../db/connection'

export const paciente = sequelize.define('Paciente',
    {
        id_paciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true
        },
        pa_nombres: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        pa_apellido_paterno: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        pa_apellido_materno: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        pa_telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pa_fecha_nacimiento : {
            type: DataTypes.DATE,
            allowNull: false
        },
        pa_genero: {
            type: DataTypes.CHAR,
            allowNull: false
        }
    }, {
        tableName: 'Paciente',
        timestamps: false
    }
)

export const usuario = sequelize.define('Usuario',
    {
        id_usuario_correo: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        usu_contrasenia: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        usu_rol : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        Paciente_id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'Usuario',
        timestamps: false
    }
)

//Definir la relacion entre los modelos
paciente.hasOne(usuario, {foreignKey: 'Paciente_id_paciente', sourceKey: 'id_paciente'} )
usuario.belongsTo(paciente, {foreignKey: 'Paciente_id_paciente', targetKey: 'id_paciente' })

