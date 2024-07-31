import { HttpError } from '../../utility/my-error';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from './user.repository';

export class UserService {
    constructor(private userRepo: UserRepository) {}

    async login({ password, username }: LoginUserDto) {
        const user = await this.userRepo.findOne(username);

        if (!user || (user && user.password !== password))
            throw new HttpError(401, 'username or password is invalid');

        return user;
    }

    async authenticateById(id: string) {
        const user = await this.userRepo.findById(id);
        if (!user) throw new HttpError(401, 'not authorized');

        return user;
    }
}
