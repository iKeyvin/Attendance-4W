import Subareas from './subareas.model.js';

describe('GET /subareas', () => {
        test('should return all subareas', async () => {
            let subareas = await Subareas.findAll();
            expect(subareas.length > 0).toBe(true);
        });
    }
);