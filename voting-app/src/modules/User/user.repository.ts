import { User } from './model/user';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { AppDataSource } from '../../data-source';

export interface LoginUser {
    username: string;
    password: string;
}

export class UserRepository {
    private userRepo: Repository<UserEntity>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(UserEntity);
    }

    findOne(username: string): Promise<User | null> {
        return this.userRepo.findOneBy({ username });
    }

    findById(id: string): Promise<User | null> {
        return this.userRepo.findOneBy({ id });
    }
}
