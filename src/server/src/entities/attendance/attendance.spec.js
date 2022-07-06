import Attendance from './attendance.model.js';

describe('GET /attendance', () => {
        test('should return the whole attendance', async () => {
            let attendance = await Attendance.findAll();
            expect(attendance.length > 0).toBe(true);
        });
    }
);