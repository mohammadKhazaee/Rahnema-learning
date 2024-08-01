import request from 'supertest';

import { makeApp } from '../src/api';
import { AppDataSource } from '../src/data-source';
import {
    createPlanTest,
    createProgramTest,
    createVoteTest,
    loginAdminTest,
    loginNormalTest,
    loginRepTest,
} from './utility';
import { PlanEntity } from '../src/modules/Plan/entity/plan.entity';

describe('Vote Routes test suite', () => {
    // @ts-ignore
    let app: Express;

    beforeAll(async () => {
        const dataSource = await AppDataSource.initialize();
        app = makeApp(dataSource);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });
    describe('add vote', () => {
        it('should create a vote and the program should have votedCount 1', async () => {
            const userAdmin = await loginAdminTest(app);
            const userRep = await loginRepTest(app);
            const userNormal = await loginNormalTest(app);

            const title = 'Oroumie';
            const plan = await createPlanTest(app, title, userAdmin, 200);
            const program = await createProgramTest(app, userRep, 200, plan);

            const now = new Date();
            await AppDataSource.getRepository(PlanEntity).update(
                { id: plan.id },
                { deadlineProgram: new Date(now.setDate(now.getDate() - 1)) }
            );

            await createVoteTest(app, userNormal, 200, plan, program);

            const { body: resultPlan } = await request(app)
                .get(`/plan/${plan.id}`)
                .expect(200);
            expect(resultPlan.programs[0].votedCount).toBe(1);
        });
    });
});
