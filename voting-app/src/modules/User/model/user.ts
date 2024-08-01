import { UserId } from './user-id';

export type UserRole = 'Admin' | 'Representative' | 'Normal';

export interface User {
    id: UserId;
    username: string;
    password: string;
    role: UserRole;
}

export interface UserRepresentative extends User {
    role: 'Representative';
}

export const isRepresentative = (u: User): u is UserRepresentative =>
    u.role === 'Representative';

export interface UserAdmin extends User {
    role: 'Admin';
}

export const isAdmin = (u: User): u is UserAdmin => u.role === 'Admin';
