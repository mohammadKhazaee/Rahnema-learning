import { FutureDate, isFutureDate } from '../../../data/future-date';
import { NonEmptyString } from '../../../data/non-empty-string';
import { PastDate } from '../../../data/past-date';
import { Program } from '../Program/model/program';
import { PlanId } from './plan-id';

export interface Plan {
    id: PlanId;
    title: NonEmptyString;
    description: string;
    deadline: Date;
    programs: Program[];
}

export interface FuturePlan extends Plan {
    deadline: FutureDate;
}

export const isFuturePlan = (x: Plan): x is FuturePlan =>
    isFutureDate(x.deadline);
