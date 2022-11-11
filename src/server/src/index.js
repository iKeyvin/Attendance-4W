import app from './app.js';
import config from './config/config.json' assert { type: 'json' };
import { createSuperuser } from './helpers/password-helper.js';

// Initial config
export const HOST = config.server.host;
export const PORT = config.server.port;

app.listen(PORT, HOST, () => {
    createSuperuser(HOST, PORT);
    console.log(`Listening on ${HOST}:${PORT}`);
});
