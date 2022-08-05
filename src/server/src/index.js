import app from './app.js';
import config from './config/config.json' assert { type: 'json' };

// Initial config
const HOST = config.server.host;
const PORT = process.env.port || config.server.port;

app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});
