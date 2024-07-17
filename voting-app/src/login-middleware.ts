import { Handler } from 'express';
import { users } from './routes/user.route';

export const loginMiddleware: Handler = (req, res, next) => {
    const userId = req.headers['authorization'];
    const loggedUser = users.find((u) => u.id === userId);
    if (!loggedUser) return res.status(401).send({ message: 'not authorized' });
    req.user = loggedUser;

    next();
};
