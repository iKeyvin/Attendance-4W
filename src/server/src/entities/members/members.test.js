import test from 'node:test';
import assert from 'node:assert';

test('should not throw', async () => {
    assert.doesNotThrow(await fetch('http://localhost:3000/members'), 'localhost:3000/members throws');
});

test('should return all members', async () => {
    const response = await fetch('http://localhost:3000/members');
    assert(response.status, 200, 'status code is not 200');
});