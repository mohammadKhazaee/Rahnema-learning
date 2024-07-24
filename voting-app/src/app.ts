import { app } from './api';
import { AppDataSource } from './data-source';
import { User } from './modules/User/model/user';
import { seedUser } from './seed';

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

AppDataSource.initialize()
    .then(() => seedUser())
    .then(() => {
        app.listen(3000);
    });
