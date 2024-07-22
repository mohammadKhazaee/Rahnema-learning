import { z } from 'zod';

export const loginUserDto = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
});

export type LoginUserDto = z.infer<typeof loginUserDto>;
