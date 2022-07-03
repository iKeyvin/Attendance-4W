import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class Positions extends Model{}

Positions.init(
    {
        position_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        position_name : {
            type: DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize:connection,
        modelName:'positions',
        timestamps:false
    }
);

export default Positions;