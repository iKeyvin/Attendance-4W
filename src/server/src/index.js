import app from './app.js';
import config from './config/config.js';

// Initial config
const HOST = config.host;
const PORT = config.port;

app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});