import request from 'supertest';
import { app } from '../src/api';
import { createPlanTest, loginAdminTest, loginRepTest } from './utility';
import { AppDataSource } from '../src/data-source';
import { seedUser } from '../src/seed';

describe('Plan test suite', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
        await seedUser();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    describe('Reading plan', () => {
        it('should read the plan', async () => {
            const user = await loginAdminTest();

            const title = 'Oroumie';
            const plan = await createPlanTest(title, user, 200);

            const { body: resultPlan } = await request(app)
                .get('/plan/' + plan.id)
                .expect(200);

            expect(resultPlan.title).toBe(title);
        });
    });

    describe('Create new plan', () => {
        it('should fail if user is not authenticated', async () => {
            return await request(app).post('/plan').expect(401);
        });

        it('should fail if user is not admin', async () => {
            const user = await loginRepTest();

            const title = 'dummy';
            await createPlanTest(title, user, 403);
        });

        it('should create a plan if user is authenticated', async () => {
            const user = await loginAdminTest();

            const title = 'Oroumie';
            const plan = await createPlanTest(title, user, 200);

            expect(plan.title).toBe(title);
        });

        it('should send bad request if title is not provided', async () => {
            const user = await loginAdminTest();

            const { body: plan } = await request(app)
                .post('/plan')
                .set('Authorization', user.id)
                .send({
                    description: 'Oroumie is a nice place',
                })
                .expect(400);
        });
    });
});
