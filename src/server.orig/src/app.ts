import { Application, Router } from 'express';
import { Logger } from 'tslog';
import express from 'express';
import morgan from 'morgan';

export class App {
    private app : Application;
    private router : Router;
    private logger : Logger;

    constructor() {
        this.app = express();
        this.logger = new Logger({ name : 'app' });
    }

    setMiddlewares() : void{
        this.app.use(morgan('dev'));
    }

    setRoutes() : void {
        this.router = express.Router();

        this.app.use('/members')
    }

    listen(port : number, host : string) : void{
        this.app.listen(port, host, () => {
            this.logger.info(`Server is running at ${host}:${port}`);
        });
    }
};
