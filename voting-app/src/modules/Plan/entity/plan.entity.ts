import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { ProgramEntity } from '../Program/entity/program.entity';

@Entity('plans')
export class PlanEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    deadline!: Date;

    @OneToMany(() => ProgramEntity, (program) => program.plan, {
        cascade: ['insert'],
    })
    programs!: ProgramEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
