import { Router } from 'express';
import { handleExpress } from '../utility/handle-express';
import { createPlanDto } from '../modules/Plan/dto/create-plan.dto';
import { loginMiddleware } from '../login-middleware';
import { createProgramDto } from '../modules/Plan/Program/dto/create-program.dto';
import { PlanService } from '../modules/Plan/plan.service';
import { UserService } from '../modules/User/user.service';
import { zodPlanId } from '../modules/Plan/model/plan-id';
import { VoteService } from '../modules/Plan/vote/vote.service';
import { zodProgramId } from '../modules/Plan/Program/model/program-id';

export const makePlanRouter = (
    planService: PlanService,
    userService: UserService,
    voteService: VoteService
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

    app.post(
        '/:id/program/:programId/vote',
        loginMiddleware(userService),
        (req, res) => {
            const programId = zodProgramId.parse(req.params.programId);
            const planId = zodPlanId.parse(req.params.id);

            handleExpress(res, () =>
                voteService.vote({ planId, programId }, req.user)
            );
        }
    );

    app.get('/:id', (req, res, next) => {
        const id = zodPlanId.parse(req.params.id);
        handleExpress(res, () => planService.getPlanById(id));
    });

    return app;
};
