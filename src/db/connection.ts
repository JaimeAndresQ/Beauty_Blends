import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('proyecto_integrador_db', 'root', 'jaimeandres03', {
    host: 'localhost',
    dialect: 'mysql',
})

export default sequelize