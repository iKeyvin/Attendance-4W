const config = {
    host : '0.0.0.0',
    port : 3000 || process.env.PORT,

    db : {
        type : 'postgres',
        host : 'localhost',
        port : 5432,
        database : 'attendance_db',
        user : 'admin',
        password : 'admin'
    }
}

export default config;