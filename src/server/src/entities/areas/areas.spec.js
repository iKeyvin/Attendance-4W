import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */

const new_area_1 = {
    area_name:"Zion"
}

const new_area_1_updated = {
    area_name:"Patmos_Updated"
}
/* #endregion */

/* #region Before and after */
beforeAll(async () => {
    await request(app).delete('/areas/Zion').send();
    //await request(app).post('/areas').send(new_area_0);
});

afterAll(done => {
    connection.close();
    done();
});
/* #endregion */

/* #region Tests */
describe('POST /areas', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/areas').send(new_area_1);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicates', async () => {
        let response = await request(app).post('/areas').send(new_area_1);
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /areas', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/areas?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/areas?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});

describe('GET /areas/:area_name', () => {
    test('should get single user', async () => {
        let response = await request(app).get('/areas/Zion').send();

        expect(response.body.area_name).toBe('Zion');
    });

    test('should fail if single user does not exist', async () => {
        let response = await request(app).get('/areas/bad_test').send();

        expect(response.statusCode).toBe(404);
    });
});

describe('PATCH /areas/:area_name', () => {
    test('should update', async () => {
        await request(app).patch('/areas/Zion').send(new_area_1_updated);
        let response = await request(app).get('/areas/Patmos_Updated').send();

        expect(response.body.area_name).toBe('Patmos_Updated');
    });
});

describe('DELETE /areas/:area_name', () => {
    test('should delete area by name', async () => {
        let response = await request(app).delete('/areas/Patmos_Updated').send();

        expect(response.statusCode).toBe(204);
    });
});
/* #endregion */
