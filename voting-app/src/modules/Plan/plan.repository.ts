import { Plan } from './model/plan';
import { Program } from './Program/model/program';

export interface CreatePlan {
    title: string;
    description: string;
    deadline: Date;
    programs: Program[];
}

export interface CreateProgram {
    title: string;
    description: string;
    userId: string;
}

export class PlanRepository {
    private plans: Plan[] = [];

    public getNextId() {
        return this.plans.length + 1;
    }

    public create(plan: CreatePlan) {
        const createdPlan = { ...plan, id: this.getNextId() };
        this.plans.push(createdPlan);
        return createdPlan;
    }

    public findById(id: number) {
        return this.plans.find((p) => p.id === id);
    }

    public addProgram(plan: Plan, program: CreateProgram) {
        const savedProgram = {
            id: plan.programs.length + 1,
            planId: plan.id,
            title: program.title,
            description: program.description,
            userId: program.userId,
        };
        plan.programs.push(savedProgram);
        return savedProgram;
    }
}
