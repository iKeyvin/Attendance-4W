import express from 'express';
import Member from './members.model.js';

const membersRouter = express.Router();

membersRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const filters = {
                limit: req.query.limit ? req.query.limit : 10,
                offset: ((req.query.page - 1) * 10),
                subQuery: false
            };

            const results = await Member.findAll(filters);

            res.status(200).json(results);
        }
        catch (error) {
            res.sendStatus(400);
        }
    })
    .post(async (req, res, next) => {
        try {
            await Member.create(req.body);
            
            res.sendStatus(201);
        }
        catch (error) {
            res.sendStatus(400);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Member.destroy({
                where : {},
            });

            let status = count > 0 ? 204 : 404;
            res.sendStatus(status);   
        }
        catch (error) {
            res.sendStatus(500);
        }
    });

membersRouter.route('/:username')
    .get(async (req, res, next) => {
        try {
            const filters = {
                username : req.params.username
            };

            const result = await Member.findOne({
                where : filters
            });

            let status = result != null ? 200 : 404;
            res.status(status).json(result);
        }
        catch (error) {
            res.sendStatus(500);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const count = await Member.update(req.body, {
                where: { 
                    username: req.params.username 
                }
            });
            
            let status = count > 0 ? 200 : 404;

            res.status(status).json({rows_affected : count[0]});;
        }
        catch (error) {
            res.sendStatus(500);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Member.destroy({
                where: {
                    username: req.body.username
                }
            });

            let status = count > 0 ? 204 : 404;
            res.sendStatus(status);   
        }
        catch (error) {
            res.sendStatus(500);
        }
    });

export default membersRouter;
