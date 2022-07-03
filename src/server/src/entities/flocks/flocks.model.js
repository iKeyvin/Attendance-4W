import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class Flocks extends Model{}

Flocks.init(
    {
        flock_id : {
            type: DataTypes.INTEGER,
            primaryKey : true
        },
        locale_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        flock_name : {
            type: DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize:connection,
        modelName:'flocks',
        timestamps:false
    }
);

export default Flocks;