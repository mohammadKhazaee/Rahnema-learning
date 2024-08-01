import { NextFunction, Request, Response } from 'express';
import { UserService } from './modules/User/user.service';
import { zodUserId } from './modules/User/model/user-id';

export const loginMiddleware =
    (userService: UserService) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.headers['authorization'];
        if (!userId) return res.status(401).send({ message: 'not authorized' });

        const loggedUser = await userService.authenticateById(
            zodUserId.parse(userId)
        );

        req.user = loggedUser;
        next();
    };
