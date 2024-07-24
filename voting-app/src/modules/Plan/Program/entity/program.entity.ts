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

@Entity('programs')
export class ProgramEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    userId!: string;

    @ManyToOne(() => UserEntity)
    user!: UserEntity;

    @Column()
    planId!: number;

    @ManyToOne(() => PlanEntity)
    plan!: PlanEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
