import Area from './areas.model.js';

describe('GET /areas', () => {
        test('should return all areas', async () => {
            let areas = await Area.findAll();
            expect(areas.length > 0).toBe(true);
        });
    }
);