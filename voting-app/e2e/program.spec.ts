import request from 'supertest';
import { makeApp } from '../src/api';
import { createPlanTest, loginAdminTest, loginRepTest } from './utility';
import { AppDataSource } from '../src/data-source';

describe('Program test suite', () => {
    // @ts-ignore
    let app: Express;
    beforeAll(async () => {
        const dataSource = await AppDataSource.initialize();
        app = makeApp(dataSource);
        // await seedUser();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    describe('Create', () => {
        it('should fail if its not login', async () => {
            const admin = await loginAdminTest(app);

            const title = 'Oroumie';
            const plan = await createPlanTest(app, title, admin, 200);
            await request(app).post(`/plan/${plan.id}/program`).expect(401);
        });

        it('should create a program', async () => {
            const user = await loginRepTest(app);
            const admin = await loginAdminTest(app);

            const title = 'Oroumie';
            const plan = await createPlanTest(app, title, admin, 200);

            const { body: planWithProgram } = await request(app)
                .post(`/plan/${plan.id}/program`)
                .set('Authorization', user.id)
                .send({
                    title: 'djawkdhak',
                    description: 'bah baho bah bah',
                    planId: plan.id,
                })
                .expect(200);
        });
    });
});
