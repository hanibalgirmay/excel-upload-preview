import { Dialect, Sequelize } from 'sequelize';

const databaseName = process.env.DB_NAME as string;
const databaseUser = process.env.DB_USER as string;
const databasePassword = process.env.DB_PASSWORD;
const databaseHost = process.env.DB_HOST;
const databaseDriver = process.env.DB_DRIVER as Dialect;

const sequelizeConnection = new Sequelize(databaseName, databaseUser, databasePassword, {
    host: databaseHost,
    dialect: databaseDriver
})


export default sequelizeConnection;