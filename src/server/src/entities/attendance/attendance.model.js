import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class Attendance extends Model{}

Attendance.init(
    {
        attendance_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        member_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        event_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        attendance_date : {
            type: DataTypes.STRING,
            allowNull : false
        },
        attendance_time : {
            type: DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize:connection,
        freezeTableName : true,
        modelName:'attendance',
        timestamps:false
    }
);

export default Attendance;