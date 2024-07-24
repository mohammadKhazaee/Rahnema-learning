import { Handler } from 'express';
import { userService } from './dependency';

export const loginMiddleware: Handler = async (req, res, next) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(401).send({ message: 'not authorized' });

    const loggedUser = await userService.authenticateById(userId);

    req.user = loggedUser;
    next();
};
