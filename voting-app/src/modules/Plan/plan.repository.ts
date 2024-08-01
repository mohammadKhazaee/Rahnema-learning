import { DataSource, Repository } from 'typeorm';
import { Plan } from './model/plan';
import { Program } from './Program/model/program';
import { PlanEntity } from './entity/plan.entity';
import { NonEmptyString } from '../../data/non-empty-string';
import { PlanId } from './model/plan-id';
import { CreateProgram } from './Program/model/create-program';
import { UserAdmin } from '../User/model/user';
import { FutureDate } from '../../data/future-date';

export interface IPlanRepository {
    create(plan: CreatePlan): Promise<Plan>;
    findById(id: PlanId): Promise<Plan | null>;
    addProgram(createProgram: CreateProgram): Promise<Plan>;
}

export interface CreatePlan {
    user: UserAdmin;
    data: {
        title: NonEmptyString;
        description: string;
        deadlineProgram: FutureDate;
        deadlineVote: FutureDate;
        programs: Program[];
    };
}

export class PlanRepository implements IPlanRepository {
    private planRepo: Repository<PlanEntity>;

    constructor(appDataSource: DataSource) {
        this.planRepo = appDataSource.getRepository(PlanEntity);
    }

    public create(plan: CreatePlan): Promise<Plan> {
        return this.planRepo.save(plan.data);
    }

    public findById(id: PlanId): Promise<Plan | null> {
        return this.planRepo.findOne({
            where: { id },
            relations: ['programs'],
        });
    }

    public addProgram(createProgram: CreateProgram): Promise<Plan> {
        return this.planRepo.save(createProgram.getPlanWithProgram());
    }
}
