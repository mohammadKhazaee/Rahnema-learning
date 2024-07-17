import request from 'supertest';
import { app } from '../src/api';
import { createPlanTest, loginAdminTest, loginRepTest } from './utility';

describe('Program test suite', () => {
    describe('Create', () => {
        it('should fail if its not login', async () => {
            await request(app).post('/program').expect(401);
        });

        it('should create a program', async () => {
            const user = await loginRepTest();
            const admin = await loginAdminTest();

            const title = 'Oroumie';
            const plan = await createPlanTest(title, admin, 200);

            const { body: program } = await request(app)
                .post('/program')
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
