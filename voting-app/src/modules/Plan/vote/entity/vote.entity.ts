import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { VoteId } from '../model/vote-id';
import { UserId } from '../../../User/model/user-id';
import { PlanId } from '../../model/plan-id';
import { ProgramId } from '../../Program/model/program-id';
import { UserEntity } from '../../../User/entity/user.entity';
import { PlanEntity } from '../../entity/plan.entity';
import { ProgramEntity } from '../../Program/entity/program.entity';

@Entity('votes')
export class VoteEntity {
    @PrimaryGeneratedColumn()
    id!: VoteId;

    @Column()
    userId!: UserId;

    @ManyToOne(() => UserEntity)
    user!: UserEntity;

    @Column()
    planId!: PlanId;

    @ManyToOne(() => PlanEntity)
    plan?: PlanEntity;

    @Column()
    programId!: ProgramId;

    @ManyToOne(() => ProgramEntity)
    program?: ProgramEntity;

    @Column()
    date!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
