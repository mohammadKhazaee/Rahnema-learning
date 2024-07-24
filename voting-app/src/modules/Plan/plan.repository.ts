import { Repository } from 'typeorm';
import { Plan } from './model/plan';
import { Program } from './Program/model/program';
import { PlanEntity } from './entity/plan.entity';
import { AppDataSource } from '../../data-source';

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
    private planRepo: Repository<PlanEntity>;

    constructor() {
        this.planRepo = AppDataSource.getRepository(PlanEntity);
    }

    public create(plan: CreatePlan): Promise<Plan> {
        return this.planRepo.save(plan);
    }

    public findById(id: number): Promise<Plan | null> {
        return this.planRepo.findOne({
            where: { id },
            relations: ['programs'],
        });
    }

    public addProgram(plan: Plan, program: CreateProgram): Promise<Plan> {
        return this.planRepo.save({
            ...plan,
            programs: [...plan.programs, program],
        });
    }
}
