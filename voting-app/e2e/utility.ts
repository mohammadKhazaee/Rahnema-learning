import request from 'supertest';

// @ts-ignore
export const loginAdminTest = async (app: Express) => {
    const { body: user } = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'admin' })
        .expect(200);
    return user;
};

// @ts-ignore
export const loginRepTest = async (app: Express) => {
    const { body: user } = await request(app)
        .post('/login')
        .send({ username: 'rep', password: 'rep' })
        .expect(200);
    return user;
};

export const createPlanTest = async (
    // @ts-ignore
    app: Express,
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
