import express from 'express';
import morgan from 'morgan';
import membersRouter from './entities/members/members.router.js';

// Initial config
const HOST = '0.0.0.0';
const PORT = 3000 || process.env.PORT;

const app = express();

// Middleware
app.use(morgan('dev'));

// Routers
app.use('/members', membersRouter);


app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});