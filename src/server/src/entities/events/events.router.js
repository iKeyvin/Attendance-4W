import express from 'express';
import Events  from './events.model.js';

const eventsRouter = express.Router();

eventsRouter.route('/')
.get(async (req, res, next) => {
    const results = await Events.findAll();

    res.json(results);
});

export default eventsRouter;