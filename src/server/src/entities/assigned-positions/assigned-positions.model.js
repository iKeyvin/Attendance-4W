import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class AssignedPositions extends Model{}

AssignedPositions.init(
    {
        positions_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        position_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        }
    },
    {
        sequelize:connection,
        modelName:'assigned_positions',
        timestamps:false
    }
);

export default AssignedPositions;