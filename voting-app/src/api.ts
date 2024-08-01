import express, { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { makePlanRouter } from './routes/plan.route';
import { PlanService } from './modules/Plan/plan.service';
import { PlanRepository } from './modules/Plan/plan.repository';
import { DataSource } from 'typeorm';
import { UserRepository } from './modules/User/user.repository';
import { UserService } from './modules/User/user.service';
import { makeUserRouter } from './routes/user.route';
import { VoteRepository } from './modules/Plan/vote/vote.repository';
import { VoteService } from './modules/Plan/vote/vote.service';

export const makeApp = (dataSource: DataSource) => {
    const app = express();

    app.use(express.json());

    // app.use((req, res, next) => {
    //     console.log(req.method, req.url);
    //     next();
    // });

    const userRepository = new UserRepository(dataSource);
    const userService = new UserService(userRepository);

    const planRepository = new PlanRepository(dataSource);
    const planService = new PlanService(planRepository);

    const voteRepository = new VoteRepository(dataSource);
    const voteService = new VoteService(voteRepository, planService);

    app.use('/plan', makePlanRouter(planService, userService, voteService));
    app.use(makeUserRouter(userService));

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

    return app;
};
