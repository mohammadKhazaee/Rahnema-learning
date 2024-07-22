import { HttpError } from '../../utility/my-error';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from './user.repository';

export class UserService {
    private userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    login(dto: LoginUserDto) {
        const user = this.userRepo.findOne(dto);

        if (user === undefined)
            throw new HttpError(401, 'username or password is invalid');

        return user;
    }

    authenticateById(id: string) {
        const user = this.userRepo.findById(id);

        if (user === undefined) throw new HttpError(401, 'not authorized');

        return user;
    }
}
