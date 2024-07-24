import request from 'supertest';
import { app } from '../src/api';
import { createPlanTest, loginAdminTest, loginRepTest } from './utility';
import { AppDataSource } from '../src/data-source';

describe('Program test suite', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    describe('Create', () => {
        it('should fail if its not login', async () => {
            const admin = await loginAdminTest();

            const title = 'Oroumie';
            const plan = await createPlanTest(title, admin, 200);
            await request(app).post(`/plan/${plan.id}/program`).expect(401);
        });

        it('should create a program', async () => {
            const user = await loginRepTest();
            const admin = await loginAdminTest();

            const title = 'Oroumie';
            const plan = await createPlanTest(title, admin, 200);

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
