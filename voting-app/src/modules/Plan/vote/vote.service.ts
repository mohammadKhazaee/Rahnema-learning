import { ForbiddenError, HttpError } from '../../../utility/my-error';
import { isUserNormal, User, UserNormal } from '../../User/model/user';
import { PlanId } from '../model/plan-id';
import { PlanService } from '../plan.service';
import { ProgramId } from '../Program/model/program-id';
import { getValidForVotePlan } from './model/vote';
import { IVoteRepository } from './vote.repository';

export class VoteService {
    constructor(
        private voteRepo: IVoteRepository,
        private planService: PlanService
    ) {}

    async vote(
        { planId, programId }: { planId: PlanId; programId: ProgramId },
        user: User
    ) {
        if (!isUserNormal(user)) throw new ForbiddenError();

        const plan = await this.planService.getPlanById(planId);

        const validVotePlan = getValidForVotePlan(plan);

        if (!validVotePlan)
            throw new HttpError(400, 'you can not vote for this program');

        const noVote = await this.getNoVoteForPlan(user, planId);

        await this.voteRepo.addVote({
            user,
            plan: validVotePlan,
            programId,
            date: new Date(),
            noVote: noVote,
        });
    }

    private async getNoVoteForPlan(user: UserNormal, planId: PlanId) {
        const vote = await this.voteRepo.getVote({ user, planId });

        if (vote._tag === 'No Vote') return vote;

        return this.voteRepo.deleteVote(vote.data);
    }
}
