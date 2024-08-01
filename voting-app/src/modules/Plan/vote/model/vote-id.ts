import { z } from 'zod';
import { Brand } from '../../../../utility/brand';

export type VoteId = Brand<number, 'VoteId'>;

export const isVoteId = (value: number): value is VoteId => {
    return Number.isInteger(value) && value > 0;
};

export const zodVoteId = z.coerce.number().refine(isVoteId);
