import express from 'express';
import Flocks from './flocks.model.js';

const flocksRouter = express.Router();

flocksRouter.route('/')
.get(async (req, res, next) => {
    const results = await Flocks.findAll();

    res.json(results);
});

export default flocksRouter;