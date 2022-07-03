import express from 'express';
import morgan from 'morgan';

import membersRouter from './entities/members/members.router.js';
import areasRouter from './entities/areas/areas.router.js';
import assignedPositionsRouter from './entities/assigned-positions/assigned-positions.router.js';
import attendanceRouter from './entities/attendance/attendance.router.js';
import eventsRouter from './entities/events/events.router.js';
import flocksRouter from './entities/flocks/flocks.router.js';
import localesRouter from './entities/locales/locales.router.js';
import positionsRouter from './entities/positions/positions.router.js';
import subareasRouter from './entities/subareas/subareas.router.js';

// Initial config
const HOST = '0.0.0.0';
const PORT = 3000 || process.env.PORT;

const app = express();

// Middleware
app.use(morgan('dev'));

// Routers
app.use('/members', membersRouter);
app.use('/areas', areasRouter);
app.use('/assigned-positions', assignedPositionsRouter);
app.use('/attendance', attendanceRouter);
app.use('/events', eventsRouter);
app.use('/flocks', flocksRouter);
app.use('/locales', localesRouter);
app.use('/positions', positionsRouter);
app.use('/subareas', subareasRouter);

app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`);
});