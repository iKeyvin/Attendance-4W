import bcrypt from 'bcryptjs';

export function hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return {
        salt: salt,
        hash: hash
    };
}

export function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
    return savedHash == bcrypt.hashSync(passwordAttempt, savedSalt);
}

export function createSuperuser(host, port){
    let crypt = hashPassword('admin');

    const admin = {
        member_id : "superuser",
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

    fetch(`http://${host}:${port}/members`, {
        method : 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(admin)
    });
}
