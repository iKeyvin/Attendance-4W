import Event from './events.model.js';

describe('GET /events', () => {
        test('should return all events', async () => {
            let events = await Event.findAll();
            expect(events.length > 0).toBe(true);
        });
    }
);