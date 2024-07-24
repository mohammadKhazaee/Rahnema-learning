import { Router } from 'express';
import { handleExpress } from '../utility/handle-express';
import { createPlanDto } from '../modules/Plan/dto/create-plan.dto';
import { z } from 'zod';
import { loginMiddleware } from '../login-middleware';
import { createProgramDto } from '../modules/Plan/Program/dto/create-program.dto';
import { planService } from '../dependency';

export const app = Router();

app.post('/', loginMiddleware, (req, res) => {
    const dto = createPlanDto.parse(req.body);
    handleExpress(res, () => planService.createPlan(dto, req.user));
});

app.post('/:id/program', loginMiddleware, (req, res) => {
    const dto = createProgramDto.parse({
        ...req.body,
        planId: req.params.id,
    });

    handleExpress(res, () => planService.createProgram(dto, req.user));
});

app.get('/:id', (req, res, next) => {
    const id = z.coerce.number().parse(req.params.id);
    handleExpress(res, () => planService.getPlanById(id));
});
