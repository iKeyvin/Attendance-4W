import express from 'express';
import Areas from './areas.model.js';

const areasRouter = express.Router();

areasRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const filters = {
                limit: req.query.limit || 10,
                offset: ((req.query.page - 1) * 10),
                subQuery: false
            };

            const results = await Areas.findAll(filters);

            res.status(200).json(results);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .post(async (req, res, next) => {
        try {
            await Areas.create(req.body);

            res.sendStatus(201);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Areas.destroy({
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

areasRouter.route('/:area_name')
    .get(async (req, res, next) => {
        try {
            const filters = {
                area_name: req.params.area_name
            };

            const result = await Areas.findOne({
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
            const count = await Areas.update(req.body, {
                where: {
                    area_name: req.params.area_name
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
            const count = await Areas.destroy({
                where: {
                    area_name: req.params.area_name
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


export default areasRouter;