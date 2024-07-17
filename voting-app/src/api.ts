import express from 'express';
import { app as planRoute } from './routes/plan.route';
import { app as userRoute } from './routes/user.route';
import { app as programRoute } from './routes/program.route';

export const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//     console.log(req.method, req.url);
//     next();
// });

app.use('/plan', planRoute);
app.use('/program', programRoute);
app.use(userRoute);

app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});
