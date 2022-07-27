import request from 'supertest';
import app from '../../app.js';
import connection from '../../dbconnection/postgresql.js';

/* #region Sample inputs */
const admin = {
    flock_id: 1,
    positions_id: 1,
    username: "richard",
    passwd: "test",
    salt:"salt",
    privilege_level: 4,
    first_name: "Richard",
    surname: "Correa",
    middlename: "Mercado",
    phone: "662461018",
    home_address: "San Bernardino 13",
    is_registered: true,
    registration_date: "2022-07-02T17:50:00.000Z"
}

const new_member_1 = {
    flock_id: 1,
    positions_id: 2,
    username: "test_1",
    privilege_level: 0,
    passwd: "test",
    salt:"salt",
    first_name: "test 1",
    middlename: "test 1",
    surname: "test 1",
    phone: "123456789",
    home_address: "address",
    is_registered: false,
    registration_date: "2022-07-02T17:50:00.000Z"
}

const new_member_invalid_positions_id = {
    flock_id: 1,
    positions_id: 2,
    username: "test_positions_id",
    privilege_level: 0,
    passwd: "test",
    salt:"salt",
    first_name: "test 1",
    middlename: "test 1",
    surname: "test 1",
    phone: "123456789",
    home_address: "address",
    is_registered: false,
    registration_date: "2022-07-02T17:50:00.000Z"
}

const new_member_2 = {
    flock_id: 1,
    positions_id: 3,
    privilege_level: 0,
    username: "test_2",
    passwd: "test",
    salt:"salt",
    first_name: "test 2",
    surname: "test 2",
    is_registered: false,
    registration_date: "2022-07-02T17:50:00.000Z"
}

const new_member_2_updated = {
    flock_id: 1,
    positions_id: 3,
    privilege_level: 0,
    username: "test_2",
    passwd: "test",
    salt:"salt",
    first_name: "test 2 updated",
    surname: "test 2 updated",
    is_registered: false,
    registration_date: "2022-07-02T17:50:00.000Z"
}

const new_member_3_invalid_privilage = {
    flock_id: 1,
    positions_id: 4,
    privilege_level: 7,
    username: "test_3",
    passwd: "test",
    salt:"salt",
    first_name: "test 3",
    surname: "test 2",
    is_registered: false,
    registration_date: "2022-07-02T17:50:00.000Z"
}
/* #endregion */

/* #region Before and after */
beforeAll(async () => {
    await request(app).delete('/members').send();
    await request(app).post('/members').send(admin);
});

afterAll(done => {
    connection.close();
    done();
});
/* #endregion */

/* #region Tests */
describe('POST /members', () => {
    test('should insert correctly', async () => {
        let response = await request(app).post('/members').send(new_member_1);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicates', async () => {
        let response = await request(app).post('/members').send(new_member_1);
        expect(response.statusCode).toBe(400);
    });

    test('should accept empty non mandatory fields', async () => {
        let response = await request(app).post('/members').send(new_member_2);
        expect(response.statusCode).toBe(201);
    });

    test('should not accept duplicate positions id', async () => {
        let response = await request(app).post('/members').send(new_member_invalid_positions_id);
        expect(response.statusCode).toBe(400);
    });

    test('should not accept invalid privilage level', async () => {
        let response = await request(app).post('/members').send(new_member_3_invalid_privilage);
        expect(response.statusCode).toBe(400);
    });

});

describe('GET /members', () => {
    test('should be OK', async () => {
        let response = await request(app).get('/members?page=1').send();

        expect(response.statusCode).toBe(200);
    });

    test('should limit results', async () => {
        let limit = 1;
        let response = await request(app).get('/members?page=1&limit=' + limit).send();

        expect(response.body.length).toBeLessThanOrEqual(limit);
    });
});

describe('GET /members/:username', () => {
    test('should get single user', async () => {
        let response = await request(app).get('/members/test_1').send();

        expect(response.body.username).toBe('test_1');
    });

    test('should fail if single user does not exist', async () => {
        let response = await request(app).get('/members/bad_test').send();

        expect(response.statusCode).toBe(404);
    });
});

describe('PATCH /members/:username', () => {
    test('should update', async () => {
        await request(app).patch('/members/test_2').send(new_member_2_updated);
        let member = await request(app).get('/members/test_2').send();

        expect(member.body.first_name).toBe('test 2 updated');
    });

    test('should fail if user does not exist', async () => {
        let response = await request(app).patch('/members/not_exist').send(
            {
                first_name: "not exists"
            });

        expect(response.body.rows_affected).toBe(0);
    });
});

describe('DELETE /members/:username', () => {
    test('should delete user by username', async () => {
        await request(app).delete('/members/test_positions_id').send();
        await request(app).delete('/members/test_3').send();

        let response = await request(app).delete('/members/test_1').send();

        expect(response.statusCode).toBe(204);
    });

    test('should fail if not exists', async () => {
        await request(app).delete('/members/test_2').send();
        let response = await request(app).delete('/members/test_2').send();

        expect(response.statusCode).toBe(404);
    });
});
/* #endregion */
