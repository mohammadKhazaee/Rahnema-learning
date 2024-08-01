import { z } from 'zod';
import { Brand } from '../../../utility/brand';

export type PlanId = Brand<number, 'PlanId'>;

export const isPlanId = (value: number): value is PlanId => {
    return Number.isInteger(value) && value > 0;
};

export const zodPlanId = z.coerce.number().refine(isPlanId);
