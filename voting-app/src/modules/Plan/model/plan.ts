import { FutureDate, isFutureDate } from '../../../data/future-date';
import { NonEmptyString } from '../../../data/non-empty-string';
import { Program } from '../Program/model/program';
import { PlanId } from './plan-id';

export interface Plan {
    id: PlanId;
    title: NonEmptyString;
    description: string;
    deadlineProgram: Date;
    deadlineVote: Date;
    programs: Program[];
}

export interface FuturePlan extends Plan {
    deadlineProgram: FutureDate;
}

export const isFuturePlan = (x: Plan): x is FuturePlan =>
    isFutureDate(x.deadlineProgram);
