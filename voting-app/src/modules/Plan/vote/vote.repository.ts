import { DataSource, Repository } from 'typeorm';
import { CreateVote, GetVote, Vote, NoVoteForPlan } from './model/vote';
import { VoteEntity } from './entity/vote.entity';
import { ProgramEntity } from '../Program/entity/program.entity';

export interface IVoteRepository {
    addVote: (create: CreateVote) => Promise<void>;
    getVote: (
        get: GetVote
    ) => Promise<{ data: Vote; _tag: 'Vote' } | NoVoteForPlan>;
    deleteVote: (vote: Vote) => Promise<NoVoteForPlan>;
}

export class VoteRepository implements IVoteRepository {
    private voteRepo: Repository<VoteEntity>;

    constructor(private dataSource: DataSource) {
        this.voteRepo = dataSource.getRepository(VoteEntity);
    }

    async addVote(create: CreateVote): Promise<void> {
        await this.dataSource.manager.transaction(async (manager) => {
            const voteRepo = manager.getRepository(VoteEntity);
            const programRepo = manager.getRepository(ProgramEntity);

            await voteRepo.save({
                userId: create.user.id,
                planId: create.plan.id,
                programId: create.programId,
                date: create.date,
            });

            await programRepo.update(
                { id: create.programId },
                { votedCount: () => 'votedCount + 1' }
            );
        });
    }

    async getVote({
        planId,
        user: { id },
    }: GetVote): Promise<{ data: Vote; _tag: 'Vote' } | NoVoteForPlan> {
        const vote = await this.voteRepo.findOneBy({ userId: id, planId });
        if (!vote) return { _tag: 'No Vote', planId, userId: id };
        return {
            _tag: 'Vote',
            data: {
                id: vote.id,
                userId: vote.userId,
                planId: vote.planId,
                programId: vote.programId,
                date: vote.date,
            },
        };
    }

    async deleteVote(vote: Vote): Promise<NoVoteForPlan> {
        await this.dataSource.manager.transaction(async (manager) => {
            const voteRepo = manager.getRepository(VoteEntity);
            const programRepo = manager.getRepository(ProgramEntity);

            await voteRepo.save({
                userId: vote.userId,
                planId: vote.planId,
                programId: vote.programId,
                date: vote.date,
            });
            await programRepo.update(
                { id: vote.programId },
                { votedCount: () => 'votedCount - 1' }
            );
        });
        return { _tag: 'No Vote', planId: vote.planId, userId: vote.userId };
    }
}
