import express from 'express';
import AssignedPositions  from './assigned-positions.model.js';

const assignedPositionsRouter = express.Router();

assignedPositionsRouter.route('/')
.get(async (req, res, next) => {
    const results = await AssignedPositions.findAll();

    res.json(results);
});

export default assignedPositionsRouter;