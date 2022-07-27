import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class Subareas extends Model{}

Subareas.init(
    {
        subarea_id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        area_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        subarea_name : {
            type: DataTypes.STRING,
            allowNull : false,
        }
    },
    {
        sequelize:connection,
        modelName:'subareas',
        timestamps:false
    }
);

export default Subareas;