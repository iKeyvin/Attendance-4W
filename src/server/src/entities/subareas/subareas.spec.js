import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */

const new_subarea_1 = {
    subarea_name:"subarea_test",
    area_id:1
}

const new_subarea_2 = {
    subarea_name:"subarea_test_2",
    area_id:1
}

const new_subarea_1_updated = {
    subarea_name:"subarea_test_updated"
}
/* #endregion */

/* #region Before and after */
beforeAll(async () => {

});

afterAll(done => {
    connection.close();
    done();
});
/* #endregion */

/* #region Tests */
describe('POST /subareas', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/subareas').send(new_subarea_1);
        expect(response.statusCode).toBe(201);
    });

    test('should accept new subareas in same area', async () => {
        let response = await request(app).post('/subareas').send(new_subarea_2);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicates', async () => {
        let response = await request(app).post('/subareas').send(new_subarea_2);
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /subareas', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/subareas?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/subareas?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});

describe('GET /subareas/:subarea_name', () => {
    test('should get single user', async () => {
        let response = await request(app).get('/subareas/subarea_test').send();

        expect(response.body.subarea_name).toBe('subarea_test');
    });

    test('should fail if single user does not exist', async () => {
        let response = await request(app).get('/subareas/bad_test').send();

        expect(response.statusCode).toBe(404);
    });
});

describe('PATCH /subareas/:subarea_name', () => {
    test('should update', async () => {
        await request(app).patch('/subareas/subarea_test').send(new_subarea_1_updated);
        let response = await request(app).get('/subareas/subarea_test_updated').send();

        expect(response.body.subarea_name).toBe('subarea_test_updated');
    });
});

describe('DELETE /subareas/:subarea_name', () => {
    test('should delete subarea by name', async () => {
        await request(app).delete('/subareas/subarea_test_2').send();
        let response = await request(app).delete('/subareas/subarea_test_updated').send();

        expect(response.statusCode).toBe(204);
    });
});
/* #endregion */
