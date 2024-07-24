import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './modules/User/entity/user.entity';
import { ProgramEntity } from './modules/Plan/Program/entity/program.entity';
import { PlanEntity } from './modules/Plan/entity/plan.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '13771377',
    database: 'porsi',
    synchronize: true,
    logging: false,
    entities: [UserEntity, ProgramEntity, PlanEntity],
    migrations: [],
    subscribers: [],
});
