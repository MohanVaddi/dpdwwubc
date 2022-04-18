import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';
import connect from './utils/db_connect';
import UserRoute from './routes/User.route';

const app = express();
const port = process.env['PORT'] || 4000;

app.param(
    'userId',
    (_req: Request, _res: Response, next: NextFunction, userId) => {
        console.log('userId', userId);
        next();
    }
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// User regestration route
app.use('/user', UserRoute);

app.get('/', (_req: Request, res: Response) => {
    res.send('working');
});

app.listen(port, () => {
    console.log(`App started listening on port ${port}`);
    connect();
});
