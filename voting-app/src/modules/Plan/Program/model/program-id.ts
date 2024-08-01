import { z } from 'zod';
import { Brand } from '../../../../utility/brand';

export type ProgramId = Brand<number, 'ProgramId'>;

export const isProgramId = (value: number): value is ProgramId => {
    return Number.isInteger(value) && value > 0;
};

export const zodProgramId = z.coerce.number().refine(isProgramId);
