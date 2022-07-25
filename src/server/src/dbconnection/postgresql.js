import { Sequelize } from 'sequelize';
import config from '../config/config.json';
//import config from '../config/config.json' assert { type: 'json' };

const database = config.db.database;
const host = config.db.host;
const port = config.db.port;
const user = config.db.user;
const password = config.db.password;

const connection = new Sequelize(database, user, password, {
    host,
    port,
    dialect: config.db.type,
    logging: false,

    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    }
});

export default connection;
