import { Router } from 'express';
import { handleExpress } from '../utility/handle-express';
import { loginUserDto } from '../modules/User/dto/login-user.dto';
import { UserService } from '../modules/User/user.service';

export const makeUserRouter = (userService: UserService) => {
    const app = Router();

    app.post('/login', (req, res) => {
        const dto = loginUserDto.parse(req.body);
        handleExpress(res, () => userService.login(dto));
    });

    return app;
};
