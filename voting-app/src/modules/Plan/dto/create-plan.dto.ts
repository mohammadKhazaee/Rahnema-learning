import { z } from 'zod';

export const createPlanDto = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    deadline: z.coerce.date(),
});

export type CreatePlanDto = z.infer<typeof createPlanDto>;
