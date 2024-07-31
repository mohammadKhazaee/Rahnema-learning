import { NextFunction, Request, Response } from 'express';
import { UserService } from './modules/User/user.service';

export const loginMiddleware =
    (userService: UserService) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.headers['authorization'];
        if (!userId) return res.status(401).send({ message: 'not authorized' });

        const loggedUser = await userService.authenticateById(userId);

        req.user = loggedUser;
        next();
    };
