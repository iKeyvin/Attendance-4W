import express from 'express';
import Events from './events.model.js';

const eventsRouter = express.Router();

eventsRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const filters = {
                limit: req.query.limit || 10,
                offset: ((req.query.page - 1) * 10),
                subQuery: false
            };

            const results = await Events.findAll(filters);

            res.status(200).json(results);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .post(async (req, res, next) => {
        try {
            await Events.create(req.body);

            res.sendStatus(201);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Events.destroy({
                where: {},
                force: true
            });

            let status = count > 0 ? 204 : 404;
            res.sendStatus(status);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });

eventsRouter.route('/:event_name')
    .get(async (req, res, next) => {
        try {
            const filters = {
                event_name: req.params.event_name
            };

            const result = await Events.findOne({
                where: filters
            });

            let status = result != null ? 200 : 404;
            res.status(status).json(result);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const count = await Events.update(req.body, {
                where: {
                    event_name: req.params.event_name
                }
            });

            let status = count > 0 ? 200 : 404;
            res.status(status).json({ rows_affected: count[0] });
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Events.destroy({
                where: {
                    event_name: req.params.event_name
                }
            });

            let status = count > 0 ? 204 : 404;
            res.sendStatus(status);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });


export default eventsRouter;