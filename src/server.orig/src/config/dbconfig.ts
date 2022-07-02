import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://admin:admin@localhost:5432/attendance_db',
    idleTimeoutMillis: 30000
});