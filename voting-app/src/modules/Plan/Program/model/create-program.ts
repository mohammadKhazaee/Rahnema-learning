import { NonEmptyString } from '../../../../data/non-empty-string';
import { UserRepresentative } from '../../../User/model/user';
import { FuturePlan } from '../../model/plan';

export class CreateProgram {
    private constructor(
        public user: UserRepresentative,
        public program: { title: NonEmptyString; description: string },
        public plan: FuturePlan
    ) {}

    static make(
        user: UserRepresentative,
        program: { title: NonEmptyString; description: string },
        plan: FuturePlan
    ) {
        const fourndProg = plan.programs.find((z) => z.userId === user.id);
        if (fourndProg) return;

        return new CreateProgram(user, program, plan);
    }

    public getPlanWithProgram() {
        return {
            ...this.plan,
            programs: [
                ...this.plan.programs,
                { ...this.program, userId: this.user.id },
            ],
        };
    }
}
