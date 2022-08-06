import bcrypt from 'bcryptjs';

export function hashPassword(password) {
        const salt =  bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
    
        return {
            salt: salt,
            hash: hash
        };
    }
    
export function isPasswordCorrect(savedHash, savedSalt, passwordAttempt){
    return savedHash == bcrypt.hashSync(passwordAttempt, savedSalt);
}
