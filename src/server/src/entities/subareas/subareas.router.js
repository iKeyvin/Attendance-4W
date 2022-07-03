import express from 'express';
import Subareas from './subareas.model.js';

const subareasRouter = express.Router();

subareasRouter.route('/')
.get(async (req, res, next) => {
    const results = await Subareas.findAll();

    res.json(results);
});

export default subareasRouter;