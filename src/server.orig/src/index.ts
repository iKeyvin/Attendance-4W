import { App } from './app';

const HOST : string = 'localhost';
const PORT : number = 3000 || Number(process.env.PORT);

const app : App = new App();

app.setMiddlewares();
app.setRoutes();
app.listen(PORT, HOST);
