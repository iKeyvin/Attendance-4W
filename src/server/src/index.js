import app from './app.js';
import config from './config/config.json' assert { type: 'json' };
import { hashPassword } from './helpers/password-helper.js';

// Initial config
const HOST = config.server.host;
const PORT = process.env.port || config.server.port;

app.listen(PORT, HOST, () => {
    createSuperuser();
    console.log(`Listening on ${HOST}:${PORT}`);
});

function createSuperuser(){
    let crypt = hashPassword('admin');

    const admin = {
        flock_id: 1,
        username: "admin",
        passwd: crypt.hash,
        salt: crypt.salt,
        privilege_level: 4,
        first_name: "Admin",
        surname: "Admin",
        middlename: "Admin",
        is_registered: true,
        registration_date: new Date(Date.now()).toISOString()
    }

    fetch(`http://${HOST}:${PORT}/members`, {
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(admin)
    });
}
