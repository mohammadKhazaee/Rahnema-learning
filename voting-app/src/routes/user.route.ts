import { Router } from 'express';
import { handleExpress } from '../utility/handle-express';
import { loginUserDto } from '../modules/User/dto/login-user.dto';
import { userService } from '../dependency';

export const app = Router();

app.post('/login', (req, res) => {
    const dto = loginUserDto.parse(req.body);
    handleExpress(res, () => userService.login(dto));
});
