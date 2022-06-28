import { Application } from 'express';
import { Logger } from 'tslog';
import express from 'express';

export class App {
    private app : Application;
    private logger : Logger;

    constructor() {
        this.app = express();
        this.logger = new Logger({ name : 'app' });
    }

    setRoutes() : void {
        this.app.get('/ping', (req, res) => {
            res.send('pong');
        });
    }

    listen(port : number, host : string) : void{
        this.app.listen(port, host, () => {
            this.logger.info(`Server is running at ${host}:${port}`);
        });
    }
};