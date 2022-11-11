import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */

const new_assigned_position_1 = {
    member_id:1,
    position_id:3
}

const new_assigned_position_2 = {
    member_id:1,
    position_id:2
}

const position_to_delete = {
    position_id:2
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
describe('POST /assigned-positions', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/assigned-positions').send(new_assigned_position_1);
        expect(response.statusCode).toBe(201);
    });

    test('should accept new positions for same member', async () => {
        let response = await request(app).post('/assigned-positions').send(new_assigned_position_2);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicates', async () => {
        let response = await request(app).post('/assigned-positions').send(new_assigned_position_2);
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /assigned-positions', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/assigned-positions?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/assigned-positions?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});

describe('GET /assigned-positions/:member_id', () => {
    test('should get single user', async () => {
        let response = await request(app).get('/assigned-positions/1').send();

        expect(response.body.member_id).toBe('1');
    });

    test('should fail if single user does not exist', async () => {
        let response = await request(app).get('/assigned-positions/9999').send();

        expect(response.statusCode).toBe(404);
    });
});

describe('DELETE /assigned-positions/:member_id', () => {
    test('should delete all assigned positions by name', async () => {
        await request(app).delete('/assigned-positions/1').send({position_id:3});

        let response = await request(app).delete('/assigned-positions/1').send(position_to_delete);

        expect(response.statusCode).toBe(204);
    });
});
/* #endregion */
