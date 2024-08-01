import { Brand } from '../utility/brand';

export type FutureDate = Brand<Date, 'Future'>;

export const isFutureDate = (x: Date): x is FutureDate =>
    x.getTime() > new Date().getTime();
