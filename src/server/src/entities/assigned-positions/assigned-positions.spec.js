import AssignedPositions from './assigned-positions.model.js';

describe('GET /assigned-positions', () => {
        test('should return all assigned positions', async () => {
            let assignedPositions = await AssignedPositions.findAll();
            expect(assignedPositions.length > 0).toBe(true);
        });
    }
);