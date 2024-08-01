import { User } from './model/user';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { seedUser } from '../../seed';
import { UserId } from './model/user-id';

export interface LoginUser {
    username: string;
    password: string;
}

export class UserRepository {
    private userRepo: Repository<UserEntity>;

    constructor(appDataSource: DataSource) {
        this.userRepo = appDataSource.getRepository(UserEntity);
        seedUser();
    }

    findOne(username: string): Promise<User | null> {
        return this.userRepo.findOneBy({ username });
    }

    findById(id: UserId): Promise<User | null> {
        return this.userRepo.findOneBy({ id });
    }
}
