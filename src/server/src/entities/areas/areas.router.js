import express from 'express';
import Areas  from './areas.model.js';

const areasRouter = express.Router();

areasRouter.route('/')
.get(async (req, res, next) => {
    const results = await Areas.findAll();

    res.json(results);
});

export default areasRouter;