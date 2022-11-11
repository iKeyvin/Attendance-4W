import passport from 'passport';
import { Strategy as facebookStrategy } from 'passport-facebook';
import Member from '../entities/members/members.model.js';
import config from '../config/config.json' assert { type: 'json' };

let facebookConfig = {
    clientID : process.env.FACEBOOK_CLIENT_ID || '1268519197280409',
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET || '2b12ff8329fb7c1fbd87c45dc2629547',
    callbackURL : `http://${config.server.host}:${config.server.port}/members/auth`,
    profileFields : ['id', 'displayName', 'picture.type(large)', 'email']
}

passport.use(new facebookStrategy(facebookConfig, (token, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let filters = {
        member_id : id
    }
    const result = await Member.findOne({
        where : filters
    });

    return done(null, id);
});

export default passport;