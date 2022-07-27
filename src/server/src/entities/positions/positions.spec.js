import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */

const new_position_1 = {
    position_name:"Zion"
}

const new_position_1_updated = {
    position_name:"Patmos_Updated"
}
/* #endregion */

/* #region Before and after */
beforeAll(async () => {
    await request(app).delete('/positions/Zion').send();
    //await request(app).post('/positions').send(new_position_0);
});

afterAll(done => {
    connection.close();
    done();
});
/* #endregion */

/* #region Tests */
describe('POST /positions', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/positions').send(new_position_1);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicates', async () => {
        let response = await request(app).post('/positions').send(new_position_1);
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /positions', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/positions?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/positions?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});

describe('GET /positions/:position_name', () => {
    test('should get single user', async () => {
        let response = await request(app).get('/positions/Zion').send();

        expect(response.body.position_name).toBe('Zion');
    });

    test('should fail if single user does not exist', async () => {
        let response = await request(app).get('/positions/bad_test').send();

        expect(response.statusCode).toBe(404);
    });
});

describe('PATCH /positions/:position_name', () => {
    test('should update', async () => {
        await request(app).patch('/positions/Zion').send(new_position_1_updated);
        let response = await request(app).get('/positions/Patmos_Updated').send();

        expect(response.body.position_name).toBe('Patmos_Updated');
    });
});

describe('DELETE /positions/:position_name', () => {
    test('should delete position by name', async () => {
        let response = await request(app).delete('/positions/Patmos_Updated').send();

        expect(response.statusCode).toBe(204);
    });
});
/* #endregion */
