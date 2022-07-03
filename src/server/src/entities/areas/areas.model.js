import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class Areas extends Model{}

Areas.init(
    {
        area_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        area_name : {
            type: DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize:connection,
        modelName:'areas',
        timestamps:false
    }
);

export default Areas;