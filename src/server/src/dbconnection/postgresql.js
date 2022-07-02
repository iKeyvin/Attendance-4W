import { Sequelize } from 'sequelize';

const user = 'admin'
const host = 'localhost'
const database = 'attendance_db'
const password = 'admin'
const port = '5432'

const connection = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
});

export default connection;
