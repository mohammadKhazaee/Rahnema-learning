import { Program } from '../Program/model/program';

export interface Plan {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    programs: Program[];
}
