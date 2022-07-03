import express from 'express';
import Locales from './locales.model.js';

const localesRouter = express.Router();

localesRouter.route('/')
.get(async (req, res, next) => {
    const results = await Locales.findAll();

    res.json(results);
});

export default localesRouter;