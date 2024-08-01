import { Router } from 'express';
import { handleExpress } from '../utility/handle-express';
import { createPlanDto } from '../modules/Plan/dto/create-plan.dto';
import { loginMiddleware } from '../login-middleware';
import { createProgramDto } from '../modules/Plan/Program/dto/create-program.dto';
import { PlanService } from '../modules/Plan/plan.service';
import { UserService } from '../modules/User/user.service';
import { zodPlanId } from '../modules/Plan/model/plan-id';

export const makePlanRouter = (
    planService: PlanService,
    userService: UserService
) => {
    const app = Router();

    app.post('/', loginMiddleware(userService), (req, res) => {
        const dto = createPlanDto.parse(req.body);
        handleExpress(res, () => planService.createPlan(dto, req.user));
    });

    app.post('/:id/program', loginMiddleware(userService), (req, res) => {
        const dto = createProgramDto.parse({
            ...req.body,
            planId: req.params.id,
        });

        handleExpress(res, () => planService.createProgram(dto, req.user));
    });

    app.get('/:id', (req, res, next) => {
        const id = zodPlanId.parse(req.params.id);
        handleExpress(res, () => planService.getPlanById(id));
    });

    return app;
};
