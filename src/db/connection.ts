import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('pi_db', 'root', 'jaimeandres03', {
    host: 'localhost',
    dialect: 'mysql',
})

export default sequelize