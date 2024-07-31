import { makeApp } from './api';
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
    .then((dataSource) => makeApp(dataSource))
    .then((app) => {
        app.listen(3000);
    });
