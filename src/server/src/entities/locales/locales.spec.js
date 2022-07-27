import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */

const new_locale_1 = {
    locale_name:"locale_test",
    country:"utopia",
    subarea_id:1
}

const new_locale_2 = {
    locale_name:"locale_test_2",
    country:"utopia",
    subarea_id:1
}

const new_locale_3 = {
    locale_name:"locale_test_2",
    country:"utopia_2",
    subarea_id:2
}

const new_locale_4 = {
    locale_name:"locale_test_2",
    country:"utopia_2",
    subarea_id:1
}

const new_locale_1_updated = {
    locale_name:"locale_test_updated"
}
/* #endregion */

/* #region Before and after */
beforeAll(async () => {
    //await request(app).delete('/locales/locale_test').send();
    //await request(app).post('/locales').send(new_locale_0);
});

afterAll(done => {
    connection.close();
    done();
});
/* #endregion */

/* #region Tests */
describe('POST /locales', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/locales').send(new_locale_1);
        expect(response.statusCode).toBe(201);
    });

    test('should accept new locales in same subarea', async () => {
        let response = await request(app).post('/locales').send(new_locale_2);
        expect(response.statusCode).toBe(201);
    });

    test('should accept same locale name in different areas', async () => {
        let response = await request(app).post('/locales').send(new_locale_3);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicates', async () => {
        let response = await request(app).post('/locales').send(new_locale_2);
        expect(response.statusCode).toBe(400);
    });

    test('should not accept duplicates in same country', async () => {
        let response = await request(app).post('/locales').send(new_locale_4);
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /locales', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/locales?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/locales?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});

describe('GET /locales/:locale_name', () => {
    test('should get single user', async () => {
        let response = await request(app).get('/locales/locale_test').send();

        expect(response.body.locale_name).toBe('locale_test');
    });

    test('should fail if single user does not exist', async () => {
        let response = await request(app).get('/locales/bad_test').send();

        expect(response.statusCode).toBe(404);
    });
});

describe('PATCH /locales/:locale_name', () => {
    test('should update', async () => {
        await request(app).patch('/locales/locale_test').send(new_locale_1_updated);
        let response = await request(app).get('/locales/locale_test_updated').send();

        expect(response.body.locale_name).toBe('locale_test_updated');
    });
});

describe('DELETE /locales/:locale_name', () => {
    test('should delete locale by name', async () => {
        await request(app).delete('/locales/locale_test_2').send();
        let response = await request(app).delete('/locales/locale_test_updated').send();

        expect(response.statusCode).toBe(204);
    });
});
/* #endregion */
