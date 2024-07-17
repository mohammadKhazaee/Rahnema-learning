import { Router } from 'express';
import { users } from './user.route';
import { isNonEmptyString } from '../utility/non-empty-string';
import { createProgramDto } from '../modules/Program/dto/create-program.dto';
import { handleExpress } from '../utility/handle-express';
import { createProgram } from '../modules/Program/create-program';
import { ZodError } from 'zod';
import { loginMiddleware } from '../login-middleware';

export interface Program {
    id: number;
    planId: number;
    title: string;
    description: string;
    userId: string;
}

export const app = Router();

app.post('/', loginMiddleware, (req, res) => {
    try {
        const dto = createProgramDto.parse(req.body);
        handleExpress(res, () => {
            createProgram(dto, req.user);
        });
    } catch (error) {
        if (error instanceof ZodError) res.status(400).send(error.errors);
    }
});
