import Flock from './flocks.model.js';

describe('GET /events', () => {
        test('should return all flocks', async () => {
            let flocks = await Flock.findAll();
            expect(flocks.length > 0).toBe(true);
        });
    }
);