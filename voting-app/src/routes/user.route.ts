import { Router } from 'express';
import { v4 } from 'uuid';
import { isNonEmptyString } from '../utility/non-empty-string';
import { HttpError } from '../utility/my-error';
import { handleExpress } from '../utility/handle-express';

type UserRole = 'Admin' | 'Representative' | 'Normal';

export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
}

export const users: User[] = [
    { id: v4(), username: 'admin', password: 'admin', role: 'Admin' },
    { id: v4(), username: 'rep', password: 'rep', role: 'Representative' },
];

export const app = Router();

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!isNonEmptyString(username))
        return res
            .status(400)
            .send({ message: 'username should be string and non empty' });

    if (!isNonEmptyString(password))
        return res.status(400).send({
            message: 'password should be string and non empty',
        });

    handleExpress(res, () => login({ username, password }));
});

const login = (dto: { username: string; password: string }) => {
    const user = users.find(
        (u) => u.username === dto.username && u.password === dto.password
    );

    if (user === undefined)
        throw new HttpError(401, 'username or password is invalid');

    return user;
};
