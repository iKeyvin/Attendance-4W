import express from 'express';
import morgan from 'morgan';
import setRouters from './routers.js';
import session from  'express-session';
import passport from 'passport';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(session({ secret : 'mysecretkey', resave : false, saveUninitialized : false }));

app.use(passport.initialize());
app.use(passport.session());

// Routers
setRouters(app);

export default app;
