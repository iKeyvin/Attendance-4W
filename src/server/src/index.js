import express from 'express';
import morgan from 'morgan';
import setRouters from './routers.js';
import config from './config/config.js';

const app = express();

// Initial config
const HOST = config.host;
const PORT = config.port;

// Middleware
app.use(morgan('dev'));

// Routers
setRouters(app);

app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});