import { ForbiddenError } from '../../utility/my-error';
import { Plan } from './model/plan';
import { CreatePlan, CreateProgram, IPlanRepository } from './plan.repository';
import { PlanService } from './plan.service';

class MockPlanRepo implements IPlanRepository {
    create(plan: CreatePlan): Promise<Plan> {
        throw new Error('Method not implemented.');
    }
    findById(id: number): Promise<Plan | null> {
        throw new Error('Method not implemented.');
    }
    addProgram(plan: Plan, program: CreateProgram): Promise<Plan> {
        throw new Error('Method not implemented.');
    }
}

describe('Create program test suite', () => {
    let planService: PlanService;

    beforeEach(() => {
        planService = new PlanService(new MockPlanRepo());
    });

    it('should fail to create program if user is not representative', () => {
        expect(() =>
            planService.canCreateProgram(
                {
                    username: 'sdfs',
                    password: 'dawdaw',
                    id: 'dawdaw',
                    role: 'Normal',
                },
                {
                    id: 1,
                    title: '',
                    description: '',
                    deadline: new Date(),
                    programs: [],
                }
            )
        ).toThrow(ForbiddenError);
    });

    it('should not create program if the user already have a program', () => {
        expect(
            planService.canCreateProgram(
                {
                    username: 'sdfs',
                    password: 'dawdaw',
                    id: '1',
                    role: 'Representative',
                },
                {
                    id: 1,
                    title: 'dwadaw',
                    description: 'wadaw',
                    deadline: new Date(),
                    programs: [
                        {
                            id: 1,
                            planId: 1,
                            title: 'dawdaw',
                            description: 'wdwada',
                            userId: '1',
                        },
                    ],
                }
            )
        ).toBe(false);
    });

    it('should not create program if plan deadline exceeded from today', () => {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));

        expect(
            planService.canCreateProgram(
                {
                    username: 'sdfs',
                    password: 'dawdaw',
                    id: '1',
                    role: 'Representative',
                },
                {
                    id: 1,
                    title: 'dwadaw',
                    description: 'wadaw',
                    deadline: yesterday,
                    programs: [],
                }
            )
        ).toBe(false);
    });

    it('should return true', () => {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() + 1));

        expect(
            planService.canCreateProgram(
                {
                    username: 'sdfs',
                    password: 'dawdaw',
                    id: '1',
                    role: 'Representative',
                },
                {
                    id: 1,
                    title: 'dwadaw',
                    description: 'wadaw',
                    deadline: yesterday,
                    programs: [],
                }
            )
        ).toBe(true);
    });
});
