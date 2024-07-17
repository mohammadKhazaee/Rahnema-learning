import { Plan, plans } from '../../routes/plan.route';
import { User } from '../../routes/user.route';
import {
    ForbiddenError,
    HttpError,
    NotFoundError,
} from '../../utility/my-error';
import { CreateProgramDto } from './dto/create-program.dto';

export const createProgram = (dto: CreateProgramDto, user: User) => {
    const plan = plans.find((p) => p.id === dto.planId);

    if (plan === undefined) throw new NotFoundError();

    if (canCreateProgram(user, plan)) {
        plan.programs.push({
            id: plan.programs.length + 1,
            planId: dto.planId,
            title: dto.title,
            description: dto.description || '',
            userId: user.id,
        });
        return;
    }

    throw new HttpError(400, 'program is not valid');
};

export const canCreateProgram = (user: User, plan: Plan): boolean => {
    if (user.role !== 'Representative') throw new ForbiddenError();

    const program = plan.programs.find((z) => z.userId === user.id);
    if (program) return false;

    if (plan.deadline.getTime() < new Date().getTime()) return false;

    return true;
};
