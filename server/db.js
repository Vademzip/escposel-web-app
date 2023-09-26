const {Sequelize} = require('sequelize')
const databaseName = process.env.DB_NAME
const databaseUser = process.env.DB_USER
const databasePassword = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT


module.exports = new Sequelize(
    databaseName,
    databaseUser,
    databasePassword,
    {
        dialect: 'postgres',
        host,
        port
    }
)