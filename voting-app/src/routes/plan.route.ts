import { Router } from 'express';
import { users } from './user.route';
import { isNonEmptyString } from '../utility/non-empty-string';
import { handleExpress } from '../utility/handle-express';
import { createPlan } from '../modules/Plan/create-plan';
import { getPlanById } from '../modules/Plan/get-plan-by-id';
import { createPlanDto } from '../modules/Plan/dto/create-plan.dto';
import { z, ZodError } from 'zod';
import { Program } from './program.route';

export interface Plan {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    programs: Program[];
}

export const plans: Plan[] = [];

export const app = Router();

app.post('/', (req, res) => {
    const userId = req.headers['authorization'];
    const loggedUser = users.find((u) => u.id === userId);
    if (!loggedUser) return res.status(401).send({ message: 'not authorized' });

    try {
        const dto = createPlanDto.parse(req.body);

        handleExpress(res, () => createPlan(dto, loggedUser));
    } catch (error) {
        if (error instanceof ZodError)
            res.status(400).send({ message: error.errors });
    }
});

app.get('/:id', (req, res, next) => {
    try {
        const id = z.coerce.number().parse(req.params.id);
        handleExpress(res, () => getPlanById(id));
    } catch (error) {
        if (error instanceof ZodError)
            res.status(400).send({ message: error.errors });
    }
});
