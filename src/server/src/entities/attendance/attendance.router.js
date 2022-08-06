import express from 'express';
import Attendance  from './attendance.model.js';

const attendanceRouter = express.Router();

attendanceRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const filters = {
                limit: req.query.limit || 10,
                offset: ((req.query.page - 1) * 10),
                subQuery: false,
                where: req.query.filter
            };

            const results = await Attendance.findAll(filters);

            res.status(200).json(results);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .post(async (req, res, next) => {
        try {
            await Attendance.create(req.body);
            
            res.sendStatus(201);
        }
        catch (error) {
            console.error(error);
            res.sendStatus(400);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const count = await Attendance.destroy({
                where : req.body,
            });

            let status = count > 0 ? 204 : 404;
            res.sendStatus(status);   
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });

export default attendanceRouter;