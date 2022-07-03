import test from 'node:test';
import assert from 'node:assert';

const ENDPOINT = 'http://127.0.0.1:3000/members';

test('should return all members', async () => {
    const response = await fetch(ENDPOINT);
    assert(response.status == 200, '/members does not return 200');
});