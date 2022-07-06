import Locale from './locales.model.js';

describe('GET /events', () => {
        test('should return all flocks', async () => {
            let locales = await Locale.findAll();
            expect(locales.length > 0).toBe(true);
        });
    }
);