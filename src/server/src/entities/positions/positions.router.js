import express from 'express';
import Positions from './positions.model.js';

const positionsRouter = express.Router();

positionsRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const filters = {
                limit: req.query.limit || 10,
                offset: ((req.query.page - 1) * 10),
                subQuery: false
            };

            const results = await Positions.findAll(filters);

            res.status(200).json(results);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .post(async (req, res, next) => {
        try {
            await Positions.create(req.body);

            res.sendStatus(201);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Positions.destroy({
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

positionsRouter.route('/:position_name')
    .get(async (req, res, next) => {
        try {
            const filters = {
                position_name: req.params.position_name
            };

            const result = await Positions.findOne({
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
            const count = await Positions.update(req.body, {
                where: {
                    position_name: req.params.position_name
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
            const count = await Positions.destroy({
                where: {
                    position_name: req.params.position_name
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


export default positionsRouter;