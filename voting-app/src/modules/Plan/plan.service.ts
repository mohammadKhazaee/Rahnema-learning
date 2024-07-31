import { User } from '../User/model/user';
import {
    ForbiddenError,
    HttpError,
    NotFoundError,
} from '../../utility/my-error';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './model/plan';
import { IPlanRepository } from './plan.repository';
import { CreateProgramDto } from './Program/dto/create-program.dto';

export class PlanService {
    constructor(private planRepo: IPlanRepository) {}

    async getPlanById(planId: number) {
        const plan = await this.planRepo.findById(planId);

        if (!plan) throw new HttpError(404, 'Plan Not Found');

        return plan;
    }

    async createPlan(dto: CreatePlanDto, loggedUser: User) {
        if (dto.deadline.getTime() < new Date().getTime())
            throw new HttpError(
                409,
                'you should not use a deadline in the past'
            );

        if (loggedUser.role !== 'Admin')
            throw new HttpError(403, 'not authorized to create plan');

        const plan = {
            title: dto.title,
            description: dto.description || '',
            deadline: dto.deadline,
            programs: [],
        };
        return this.planRepo.create(plan);
    }

    async createProgram(dto: CreateProgramDto, user: User): Promise<Plan> {
        const plan = await this.planRepo.findById(dto.planId);

        if (!plan) throw new NotFoundError();

        if (this.canCreateProgram(user, plan)) {
            return this.planRepo.addProgram(plan, {
                description: dto.description || '',
                title: dto.title,
                userId: user.id,
            });
        }

        throw new HttpError(400, 'program is not valid');
    }

    canCreateProgram(user: User, plan: Plan): boolean {
        if (user.role !== 'Representative') throw new ForbiddenError();

        const program = plan.programs.find((z) => z.userId === user.id);
        if (program) return false;

        if (plan.deadline.getTime() < new Date().getTime()) return false;

        return true;
    }
}
