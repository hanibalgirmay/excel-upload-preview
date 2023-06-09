import { Dialect, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
const databaseName = process.env.DB_NAME as string;
const databaseUser = process.env.DB_USER as string;
const databasePassword = process.env.DB_PASSWORD;
const databaseHost = process.env.DB_HOST;
const databaseDriver = process.env.DB_DRIVER as Dialect;

const sequelizeConnection = new Sequelize(databaseName, databaseUser, databasePassword, {
    host: databaseHost,
    port: 3307,
    dialect: databaseDriver,
    dialectOptions: {
        connectTimeout: 60000, // Increase the timeout to 60 seconds
    },
    logging: console.log
})

// Test the database connection
async function testConnection() {
    try {
        await sequelizeConnection.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

export default sequelizeConnection;