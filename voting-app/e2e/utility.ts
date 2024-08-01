import request from 'supertest';
import { Plan } from '../src/modules/Plan/model/plan';
import { Program } from '../src/modules/Plan/Program/model/program';

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

// @ts-ignore
export const loginNormalTest = async (app: Express) => {
    const { body: user } = await request(app)
        .post('/login')
        .send({ username: 'normal', password: 'normal' })
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
    const afterTommorow = new Date(today.setDate(today.getDate() + 2));

    const { body: plan } = await request(app)
        .post('/plan')
        .set('Authorization', user.id)
        .send({
            id: 1,
            title,
            description: 'Oroumie is a nice place',
            deadlineProgram: tommorow,
            deadlineVote: afterTommorow,
            programs: [],
        })
        .expect(statusCode);

    return plan;
};

export const createProgramTest = async (
    // @ts-ignore
    app: Express,
    user: any,
    statusCode: number,
    plan: Plan
) => {
    const { body: planWithProgram } = await request(app)
        .post(`/plan/${plan.id}/program`)
        .set('Authorization', user.id)
        .send({
            title: 'djawkdhak',
            description: 'bah baho bah bah',
            planId: plan.id,
        })
        .expect(statusCode);

    return planWithProgram.programs[planWithProgram.programs.length - 1];
};

export const createVoteTest = async (
    // @ts-ignore
    app: Express,
    user: any,
    statusCode: number,
    plan: Plan,
    program: Program
) => {
    await request(app)
        .post(`/plan/${plan.id}/program/${program.id}/vote`)
        .set('Authorization', user.id)
        .send()
        .expect(statusCode);
};
