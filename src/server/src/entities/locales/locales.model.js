import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class Locales extends Model{}

Locales.init(
    {
        locale_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subarea_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        locale_name : {
            type: DataTypes.STRING,
            allowNull : false
        },
        country : {
            type: DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize:connection,
        modelName:'locales',
        timestamps:false
    }
);

export default Locales;