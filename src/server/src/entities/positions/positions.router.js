import express from 'express';
import Positions from './positions.model.js';

const positionsRouter = express.Router();

positionsRouter.route('/')
.get(async (req, res, next) => {
    const results = await Positions.findAll();

    res.json(results);
});

export default positionsRouter;