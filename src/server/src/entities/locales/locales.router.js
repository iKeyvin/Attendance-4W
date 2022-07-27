import express from 'express';
import Locales from './locales.model.js';

const localesRouter = express.Router();

localesRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const filters = {
                limit: req.query.limit || 10,
                offset: ((req.query.page - 1) * 10),
                subQuery: false
            };

            const results = await Locales.findAll(filters);

            res.status(200).json(results);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .post(async (req, res, next) => {
        try {
            await Locales.create(req.body);

            res.sendStatus(201);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Locales.destroy({
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

localesRouter.route('/:locale_name')
    .get(async (req, res, next) => {
        try {
            const filters = {
                locale_name: req.params.locale_name
            };

            const result = await Locales.findOne({
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
            const count = await Locales.update(req.body, {
                where: {
                    locale_name: req.params.locale_name
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
            const count = await Locales.destroy({
                where: {
                    locale_name: req.params.locale_name
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


export default localesRouter;