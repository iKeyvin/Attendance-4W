import express from 'express';
import Subareas from './subareas.model.js';

const subareasRouter = express.Router();

subareasRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const filters = {
                limit: req.query.limit || 10,
                offset: ((req.query.page - 1) * 10),
                subQuery: false
            };

            const results = await Subareas.findAll(filters);

            res.status(200).json(results);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .post(async (req, res, next) => {
        try {
            await Subareas.create(req.body);

            res.sendStatus(201);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Subareas.destroy({
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

subareasRouter.route('/:subarea_name')
    .get(async (req, res, next) => {
        try {
            const filters = {
                subarea_name: req.params.subarea_name
            };

            const result = await Subareas.findOne({
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
            const count = await Subareas.update(req.body, {
                where: {
                    subarea_name: req.params.subarea_name
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
            const count = await Subareas.destroy({
                where: {
                    subarea_name: req.params.subarea_name
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


export default subareasRouter;