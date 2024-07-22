import express, { ErrorRequestHandler } from 'express';
import { app as planRoute } from './routes/plan.route';
import { app as userRoute } from './routes/user.route';
import { ZodError } from 'zod';

export const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//     console.log(req.method, req.url);
//     next();
// });

app.use('/plan', planRoute);
app.use(userRoute);

app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        res.status(400).send({ message: err.message });
        return;
    }
    res.status(500);
};

app.use(errorHandler);
