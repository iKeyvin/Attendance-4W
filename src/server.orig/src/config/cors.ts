import express from 'express';
import cors from 'cors';
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://localhost:3001'];

let corsOptionsDelegate : any = (req : any, callback : any) =>{
    let corsOptions;

    if(whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin : true };
    }
    else{
        corsOptions = { origin : false };
    }

    callback(null, corsOptions);
};

export default{ cors(), cors(corsOptionsDelegate : any)};
