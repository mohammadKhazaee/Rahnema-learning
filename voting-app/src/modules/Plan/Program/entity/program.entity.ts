import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { PlanEntity } from '../../entity/plan.entity';
import { UserEntity } from '../../../User/entity/user.entity';
import { NonEmptyString } from '../../../../data/non-empty-string';
import { ProgramId } from '../model/program-id';
import { UserId } from '../../../User/model/user-id';
import { PlanId } from '../../model/plan-id';
import { WholeNumber } from '../../../../data/int';

@Entity('programs')
export class ProgramEntity {
    @PrimaryGeneratedColumn()
    id!: ProgramId;

    @Column()
    title!: NonEmptyString;

    @Column()
    description!: string;

    @Column({ default: 0 })
    votedCount!: WholeNumber;

    @Column()
    userId!: UserId;

    @ManyToOne(() => UserEntity)
    user!: UserEntity;

    @Column()
    planId!: PlanId;

    @ManyToOne(() => PlanEntity)
    plan!: PlanEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
