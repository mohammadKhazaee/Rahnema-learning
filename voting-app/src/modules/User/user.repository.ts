import { v4 } from 'uuid';
import { User } from './model/user';

export interface LoginUser {
    username: string;
    password: string;
}

export class UserRepository {
    private users: User[];

    constructor() {
        this.users = [
            { id: v4(), username: 'admin', password: 'admin', role: 'Admin' },
            {
                id: v4(),
                username: 'rep',
                password: 'rep',
                role: 'Representative',
            },
        ];
    }

    findOne(user: LoginUser) {
        return this.users.find(
            (u) => u.username === user.username && u.password === user.password
        );
    }

    findById(id: string) {
        return this.users.find((u) => u.id === id);
    }
}
