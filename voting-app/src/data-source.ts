import 'reflect-metadata';
import dotenv from 'dotenv-flow';
dotenv.config();
import { DataSource } from 'typeorm';
import { UserEntity } from './modules/User/entity/user.entity';
import { ProgramEntity } from './modules/Plan/Program/entity/program.entity';
import { PlanEntity } from './modules/Plan/entity/plan.entity';
import { VoteEntity } from './modules/Plan/vote/entity/vote.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === 'test',
    logging: false,
    entities: [UserEntity, ProgramEntity, PlanEntity, VoteEntity],
    migrations: ['./src/migrations/*.ts'],
    subscribers: [],
});
