import { WholeNumber } from '../../../../data/int';
import { NonEmptyString } from '../../../../data/non-empty-string';
import { UserId } from '../../../User/model/user-id';
import { PlanId } from '../../model/plan-id';
import { ProgramId } from './program-id';
export interface Program {
    id: ProgramId;
    planId: PlanId;
    title: NonEmptyString;
    description: string;
    userId: UserId;
    votedCount: WholeNumber;
}
