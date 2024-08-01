import { v4, validate } from 'uuid';
import { z } from 'zod';
import { UUID as cryptoUUID } from 'crypto';
import { Brand } from '../utility/brand';
import { UserId } from '../modules/User/model/user-id';

export type UUID = Brand<cryptoUUID, 'UUID'>;

export const isUUID = (value: string): value is UUID => validate(value);

export const zodUUID = z.string().refine(isUUID);

export const makeUserId = () => v4() as UserId;
