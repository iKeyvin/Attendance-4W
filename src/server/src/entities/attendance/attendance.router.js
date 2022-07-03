import express from 'express';
import Attendance  from './attendance.model.js';

const attendanceRouter = express.Router();

attendanceRouter.route('/')
.get(async (req, res, next) => {
    const results = await Attendance.findAll();

    res.json(results);
});

export default attendanceRouter;