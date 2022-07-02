import express from 'express';
import Member  from './members.model.js';

const membersRouter = express.Router();

membersRouter.route('/')
.get(async (req, res, next) => {
    const results = await Member.findAll();

    res.json(results);
});

export default membersRouter;