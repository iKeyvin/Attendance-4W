import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class Events extends Model{}

Events.init(
    {
        event_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        locale_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        event_name : {
            type: DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize:connection,
        modelName:'events',
        timestamps:false
    }
);

export default Events;