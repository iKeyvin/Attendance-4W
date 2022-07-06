import express from 'express';
import morgan from 'morgan';
import setRouters from './routers.js';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routers
setRouters(app);

export default app;
