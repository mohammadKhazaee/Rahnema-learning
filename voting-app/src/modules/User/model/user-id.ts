import { z } from 'zod';
import { Brand } from '../../../utility/brand';
import { isUUID } from '../../../data/uuid';

export type UserId = Brand<string, 'UserId'>;

export const isUserId = (value: string): value is UserId => isUUID(value);

export const zodUserId = z.string().refine(isUserId);
