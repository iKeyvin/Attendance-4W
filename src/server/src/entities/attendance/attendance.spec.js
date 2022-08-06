import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */
const new_att_0 = {
    "member_id": 1,
    "event_id":1,
    "attendance_date": "2022-01-17",
    "attendance_time": "04:05:06 CET"
}

const new_att_1 = {
    "member_id": 2,
    "event_id":1,
    "attendance_date": "2022-01-17",
    "attendance_time": "04:05:06 CET"
}

const new_att_2 = {
    "member_id": 1,
    "event_id":1,
    "attendance_date": "2022-02-17",
    "attendance_time": "04:05:06 CET"
}

/* #endregion */

/* #region Before and after */
beforeAll(async () => {
    await request(app).delete('/attendance').send();
});

afterAll(async done => {
    await request(app).delete('/attendance').send();
    connection.close();
    done();
});
/* #endregion */

/* #region Tests */
describe('POST /attendance', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/attendance').send(new_att_0);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicate members in same event and same date', async () => {
        let response = await request(app).post('/attendance').send(new_att_0);
        expect(response.statusCode).toBe(400);
    });

    test('should accept different memebers in same event and same date', async () => {
        let response = await request(app).post('/attendance').send(new_att_1);
        expect(response.statusCode).toBe(201);
    });

    test('should accept duplicate members in same event and different date', async () => {
        let response = await request(app).post('/attendance').send(new_att_2);
        expect(response.statusCode).toBe(201);
    });
});

describe('GET /attendance', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/attendance?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/attendance?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});
