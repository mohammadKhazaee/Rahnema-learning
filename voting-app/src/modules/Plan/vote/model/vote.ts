import { FutureDate, isFutureDate } from '../../../../data/future-date';
import { isPastDate, PastDate } from '../../../../data/past-date';
import { UserNormal } from '../../../User/model/user';
import { UserId } from '../../../User/model/user-id';
import { Plan } from '../../model/plan';
import { PlanId } from '../../model/plan-id';
import { ProgramId } from '../../Program/model/program-id';
import { VoteId } from './vote-id';

export interface Vote {
    id: VoteId;
    userId: UserId;
    programId: ProgramId;
    planId: PlanId;
    date: Date;
}

export interface ValidForVotePlan extends Plan {
    deadlineVote: FutureDate;
    deadlineProgram: PastDate;
}

export const getValidForVotePlan = (plan: Plan) =>
    isPastDate(plan.deadlineProgram) && isFutureDate(plan.deadlineVote)
        ? {
              ...plan,
              deadlineProgram: plan.deadlineProgram,
              deadlineVote: plan.deadlineVote,
          }
        : undefined;

export interface CreateVote {
    user: UserNormal;
    plan: ValidForVotePlan;
    programId: ProgramId;
    date: Date;
    noVote: NoVoteForPlan;
}

export interface GetVote {
    user: UserNormal;
    planId: PlanId;
}

export interface NoVoteForPlan {
    _tag: 'No Vote';
    planId: PlanId;
    userId: UserId;
}
