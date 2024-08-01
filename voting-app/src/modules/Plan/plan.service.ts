import {
    isAdmin,
    isRepresentative,
    User,
    UserRepresentative,
} from '../User/model/user';
import {
    ForbiddenError,
    HttpError,
    NotFoundError,
} from '../../utility/my-error';
import { CreatePlanDto } from './dto/create-plan.dto';
import { isFuturePlan, Plan } from './model/plan';
import { IPlanRepository } from './plan.repository';
import { CreateProgramDto } from './Program/dto/create-program.dto';
import { PlanId } from './model/plan-id';
import { CreateProgram } from './Program/model/create-program';
import { isFutureDate } from '../../data/future-date';

export class PlanService {
    constructor(private planRepo: IPlanRepository) {}

    async getPlanById(planId: PlanId) {
        const plan = await this.planRepo.findById(planId);

        if (!plan) throw new HttpError(404, 'Plan Not Found');

        return plan;
    }

    async createPlan(dto: CreatePlanDto, loggedUser: User) {
        if (!isFutureDate(dto.deadline))
            throw new HttpError(
                409,
                'you should not use a deadline in the past'
            );

        if (!isAdmin(loggedUser))
            throw new HttpError(403, 'not authorized to create plan');

        return this.planRepo.create({
            user: loggedUser,
            data: {
                title: dto.title,
                description: dto.description || '',
                deadline: dto.deadline,
                programs: [],
            },
        });
    }

    async createProgram(dto: CreateProgramDto, user: User): Promise<Plan> {
        const plan = await this.planRepo.findById(dto.planId);

        if (!plan) throw new NotFoundError();

        if (!isRepresentative(user)) throw new ForbiddenError();

        if (!isFuturePlan(plan))
            throw new HttpError(400, 'plan is in the past');

        const program = CreateProgram.make(
            user,
            { description: dto.description || '', title: dto.title },
            plan
        );

        if (!program)
            throw new HttpError(
                400,
                'this user have another program for the plan'
            );

        return this.planRepo.addProgram(program);
    }
}
