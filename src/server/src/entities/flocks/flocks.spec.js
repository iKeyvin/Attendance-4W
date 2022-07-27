import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */

const new_flock_1 = {
    flock_name:"flock_test",
    locale_id:1
}

const new_flock_2 = {
    flock_name:"flock_test_2",
    locale_id:1
}

const new_flock_1_updated = {
    flock_name:"flock_test_updated"
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
describe('POST /flocks', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/flocks').send(new_flock_1);
        expect(response.statusCode).toBe(201);
    });

    test('should accept new flocks in same locale', async () => {
        let response = await request(app).post('/flocks').send(new_flock_2);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicates', async () => {
        let response = await request(app).post('/flocks').send(new_flock_2);
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /flocks', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/flocks?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/flocks?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});

describe('GET /flocks/:flock_name', () => {
    test('should get single user', async () => {
        let response = await request(app).get('/flocks/flock_test').send();

        expect(response.body.flock_name).toBe('flock_test');
    });

    test('should fail if single user does not exist', async () => {
        let response = await request(app).get('/flocks/bad_test').send();

        expect(response.statusCode).toBe(404);
    });
});

describe('PATCH /flocks/:flock_name', () => {
    test('should update', async () => {
        await request(app).patch('/flocks/flock_test').send(new_flock_1_updated);
        let response = await request(app).get('/flocks/flock_test_updated').send();

        expect(response.body.flock_name).toBe('flock_test_updated');
    });
});

describe('DELETE /flocks/:flock_name', () => {
    test('should delete flock by name', async () => {
        await request(app).delete('/flocks/flock_test_2').send();
        let response = await request(app).delete('/flocks/flock_test_updated').send();

        expect(response.statusCode).toBe(204);
    });
});
/* #endregion */
