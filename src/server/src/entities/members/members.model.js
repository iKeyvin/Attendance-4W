import { Model, DataTypes } from 'sequelize';
import connection from '../../dbconnection/postgresql.js';

class Member extends Model{}

Member.init(
    {
        member_id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        flock_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        positions_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        username : {
            type: DataTypes.STRING,
            allowNull : false
        },
        passwd : {
            type: DataTypes.STRING,
            allowNull : false
        },
        privilege_level : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        first_name : {
            type: DataTypes.STRING,
            allowNull : false
        },
        surname : {
            type: DataTypes.STRING,
            allowNull : false
        },
        middlename : {
            type: DataTypes.STRING,
            allowNull : true
        },
        phone : {
            type: DataTypes.STRING,
            allowNull : true
        },
        home_address:{
            type: DataTypes.STRING,
            allowNull : true
        },
        is_registered : {
            type: DataTypes.BOOLEAN,
            allowNull : false
        },
        registration_date : {
            type: DataTypes.DATE,
            allowNull : false
        },
    },
    {
        sequelize:connection,
        modelName:'member',
        timestamps:false
    }
);

export default Member;