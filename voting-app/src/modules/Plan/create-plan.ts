import { User } from '../../routes/user.route';
import { HttpError } from '../../utility/my-error';
import { Plan, plans } from '../../routes/plan.route';

export const createPlan = (
    dto: {
        title: string;
        description?: string;
        deadline: Date;
    },
    loggedUser: User
) => {
    if (dto.deadline.getTime() < new Date().getTime())
        throw new HttpError(409, 'you should not use a deadline in the past');

    if (loggedUser.role !== 'Admin')
        throw new HttpError(403, 'not authorized to create plan');

    const plan: Plan = {
        id: plans.length + 1,
        title: dto.title,
        description: dto.description || '',
        deadline: dto.deadline,
        programs: [],
    };

    plans.push(plan);

    return plan;
};
