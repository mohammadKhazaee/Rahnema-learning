import { z } from 'zod';
import { zodNonEmptyString } from '../../../data/non-empty-string';

export const createPlanDto = z.object({
    title: zodNonEmptyString,
    description: z.string().optional(),
    deadlineProgram: z.coerce.date(),
    deadlineVote: z.coerce.date(),
});

export type CreatePlanDto = z.infer<typeof createPlanDto>;
