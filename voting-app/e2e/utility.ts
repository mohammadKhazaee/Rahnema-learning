import request from 'supertest';
import { app } from '../src/api';

export const loginAdminTest = async () => {
    const { body: user } = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'admin' })
        .expect(200);
    return user;
};

export const loginRepTest = async () => {
    const { body: user } = await request(app)
        .post('/login')
        .send({ username: 'rep', password: 'rep' })
        .expect(200);
    return user;
};

export const createPlanTest = async (
    title: string,
    user: any,
    statusCode: number
) => {
    const today = new Date();
    const tommorow = new Date(today.setDate(today.getDate() + 1));

    const { body: plan } = await request(app)
        .post('/plan')
        .set('Authorization', user.id)
        .send({
            id: 1,
            title,
            description: 'Oroumie is a nice place',
            deadline: tommorow,
            programs: [],
        })
        .expect(statusCode);

    return plan;
};
