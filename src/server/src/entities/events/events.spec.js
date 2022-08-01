import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */

const new_event_1 = {
    event_name:"event_test",
    locale_id:1
}

const new_event_2 = {
    event_name:"event_test_2",
    locale_id:1
}

const new_event_1_updated = {
    event_name:"event_test_updated"
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
describe('POST /events', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/events').send(new_event_1);
        expect(response.statusCode).toBe(201);
    });

    test('should accept new events in same locale', async () => {
        let response = await request(app).post('/events').send(new_event_2);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicates', async () => {
        let response = await request(app).post('/events').send(new_event_2);
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /events', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/events?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/events?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});

describe('GET /events/:event_name', () => {
    test('should get single user', async () => {
        let response = await request(app).get('/events/event_test').send();

        expect(response.body.event_name).toBe('event_test');
    });

    test('should fail if single user does not exist', async () => {
        let response = await request(app).get('/events/bad_test').send();

        expect(response.statusCode).toBe(404);
    });
});

describe('PATCH /events/:event_name', () => {
    test('should update', async () => {
        await request(app).patch('/events/event_test').send(new_event_1_updated);
        let response = await request(app).get('/events/event_test_updated').send();

        expect(response.body.event_name).toBe('event_test_updated');
    });
});

describe('DELETE /events/:event_name', () => {
    test('should delete event by name', async () => {
        await request(app).delete('/events/event_test_2').send();
        let response = await request(app).delete('/events/event_test_updated').send();

        expect(response.statusCode).toBe(204);
    });
});
/* #endregion */
