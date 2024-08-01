import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { ProgramEntity } from '../Program/entity/program.entity';
import { PlanId } from '../model/plan-id';
import { NonEmptyString } from '../../../data/non-empty-string';

@Entity('plans')
export class PlanEntity {
    @PrimaryGeneratedColumn()
    id!: PlanId;

    @Column()
    title!: NonEmptyString;

    @Column()
    description!: string;

    @Column()
    deadlineProgram!: Date;

    @Column()
    deadlineVote!: Date;

    @OneToMany(() => ProgramEntity, (program) => program.plan, {
        cascade: ['insert'],
    })
    programs!: ProgramEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
