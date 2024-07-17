import { HttpError } from '../../utility/my-error';
import { plans } from '../../routes/plan.route';

export const getPlanById = (id: number) => {
    const plan = plans.find((p) => p.id === id);

    if (plan === undefined) throw new HttpError(404, 'Plan Not Found');

    return plan;
};
