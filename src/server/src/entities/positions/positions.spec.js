import Positions from './positions.model.js';

describe('GET /events', () => {
        test('should return all positions', async () => {
            let positions = await Positions.findAll();
            expect(positions.length > 0).toBe(true);
        });
    }
);