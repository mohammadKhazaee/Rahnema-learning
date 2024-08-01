import { Brand } from '../utility/brand';

export type PastDate = Brand<Date, 'Past'>;

export const isPastDate = (x: Date): x is PastDate =>
    x.getTime() < new Date().getTime();
