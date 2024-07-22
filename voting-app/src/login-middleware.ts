import { Handler } from 'express';
import { userService } from './dependency';

export const loginMiddleware: Handler = (req, res, next) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(401).send({ message: 'not authorized' });

    const loggedUser = userService.authenticateById(userId);
    if (!loggedUser) return res.status(401).send({ message: 'not authorized' });

    req.user = loggedUser;
    next();
};
